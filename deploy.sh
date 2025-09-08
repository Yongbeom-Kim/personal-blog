#!/bin/bash
set -e

aws() {
    AWS_PAGER="" command aws "$@"
}

if [[ "$1" == *"prod"* ]]; then
    printf "\033[33;1mDeploying to prod\033[0m\n"
    s3_name=$(tofu output -raw s3_bucket_name)
    s3_domain=$(tofu output -raw s3_bucket_domain)
    cloudfront_dist_id=$(tofu output -raw cloudfront_distribution_id)
    ecr_repo_url=$(tofu output -raw ecr_repository_url)
    lambda_function_name=$(tofu output -raw lambda_function_name)
else
    printf "\033[33;1mDeploying to staging\033[0m\n"
    s3_name=$(tofu output -raw staging_s3_bucket_name)
    s3_domain=$(tofu output -raw staging_s3_bucket_domain)
    cloudfront_dist_id=$(tofu output -raw staging_cloudfront_distribution_id)
    ecr_repo_url=$(tofu output -raw staging_ecr_repository_url)
    lambda_function_name=$(tofu output -raw staging_lambda_function_name)
fi

printf "\033[1;37mBuilding static assets...\033[0m\n"
rm -rf ./dist
pnpm build

printf "\033[1;37mSyncing to S3 bucket ${s3_name}...\033[0m\n"
aws s3 sync ./dist s3://${s3_name} --delete

# Cloudfront invalidation
printf "\033[1;37mInvalidating CloudFront cache distribution ${cloudfront_dist_id}...\033[0m\n"
aws cloudfront create-invalidation --distribution-id ${cloudfront_dist_id} --paths "/*" 

# Docker build and Lambda deployment
printf "\033[1;37mBuilding Docker image...\033[0m\n"
pnpm build:docker

# Get ECR login token and authenticate Docker
printf "\033[1;37mAuthenticating with ECR...\033[0m\n"
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ecr_repo_url}

# Tag and push image to ECR
printf "\033[1;37mTagging and pushing image to ECR ${ecr_repo_url}...\033[0m\n"
docker tag personal-blog-server:latest ${ecr_repo_url}:latest
docker push ${ecr_repo_url}:latest

# Update Lambda function with new image
printf "\033[1;37mUpdating Lambda function ${lambda_function_name}...\033[0m\n"
aws lambda update-function-code \
    --function-name ${lambda_function_name} \
    --image-uri ${ecr_repo_url}:latest

printf "\033[32;1mDeployment completed successfully!\033[0m\n"