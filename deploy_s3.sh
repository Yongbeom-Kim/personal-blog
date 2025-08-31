#!/bin/bash

s3_name=$(tofu output -raw s3_bucket_name)

cloudfront_dist_id=$(tofu output -raw cloudfront_distribution_id)

# Sync the dist directory to S3 bucket
aws s3 sync ./dist s3://${s3_name} --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id ${cloudfront_dist_id} --paths "/*"
