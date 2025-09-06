#!/bin/bash
set -e

aws() {
    AWS_PAGER="" command aws "$@"
}

if [[ $1 == "*prod*" ]]; then
    printf "\033[33;1mDeploying to prod\033[0m\n"
    s3_name=$(tofu output -raw s3_bucket_name)
    cloudfront_dist_id=$(tofu output -raw cloudfront_distribution_id)
else
    printf "\033[33;1mDeploying to staging\033[0m\n"
    s3_name=$(tofu output -raw staging_s3_bucket_name)
    cloudfront_dist_id=$(tofu output -raw staging_cloudfront_distribution_id)
fi

printf "\033[1;37mBuilding...\033[0m\n"
pnpm build

printf "\033[1;37mSyncing to S3 bucket ${s3_name}...\033[0m\n"
aws s3 sync ./dist s3://${s3_name} --delete
printf "\033[1;37mInvalidating CloudFront cache distribution ${cloudfront_dist_id}...\033[0m\n"
aws cloudfront create-invalidation --distribution-id ${cloudfront_dist_id} --paths "/*" 
