#!/bin/bash
set -e

if [[ "$1" == *"prod"* ]]; then
    printf "\033[33;1mDeploying to prod\033[0m\n"
    TERRAFORM_DIR="infra/envs/prod"
else
    printf "\033[33;1mDeploying to staging\033[0m\n"
    TERRAFORM_DIR="infra/envs/staging"
fi

aws() {
    AWS_PAGER="" command aws "$@"
}

tofu() {
    command tofu -chdir=$TERRAFORM_DIR "$@"
}


printf "\033[1;37mAuthenticating with ECR...\033[0m\n"
ecr_repository_url=$(tofu output -raw ecr_repository_url)
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin ${ecr_repository_url}

printf "\033[1;37mBuilding Docker image...\033[0m\n"
docker build -t personal-blog-server .  
docker tag personal-blog-server:latest ${ecr_repository_url}:latest
docker push ${ecr_repository_url}:latest

image_digest=$(aws ecr describe-images --repository-name personal-blog-server-staging --image-ids '[{"imageTag":"latest"}]' --query 'imageDetails[0].imageDigest' --output text)
printf "\033[1;37mImage digest: \033[0m\033[33;1m${image_digest}\033[0m\n"

tofu apply -var="lambda_image_uri=${ecr_repository_url}@${image_digest}" -auto-approve

cloudfront_dist_id=$(tofu output -raw cloudfront_distribution_id)
printf "\033[1;37mCloudFront distribution ID: \033[0m\033[33;1m${cloudfront_dist_id}\033[0m\n"
printf "\033[1;37mInvalidating CloudFront cache...\033[0m\n"
aws cloudfront create-invalidation --distribution-id ${cloudfront_dist_id} --paths "/*" 

printf "\033[32;1mDeployment completed successfully!\033[0m\n"