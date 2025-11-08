module "base" {
    source = "../../modules/base"
    environment = "staging"
    full_domain = "staging.blog.yongbeom.com"
    base_domain = "yongbeom.com"
    ecr_repository_name = "personal-blog-server-staging"
}

output "ecr_repository_name" {
  value = "personal-blog-server-staging"
  description = "The name of the ECR repository."
}

output "ecr_repository_url" {
  value = module.base.ecr_repository_url
  description = "The URL of the ECR repository."
}

variable "lambda_image_uri" {
  type = string
  description = "The URI of the Lambda function image."
}

variable "env_var_VITE_PUBLIC_POSTHOG_KEY" {
  type        = string
  description = "Value for the VITE_PUBLIC_POSTHOG_KEY environment variable in the Lambda function."
}

variable "env_var_VITE_PUBLIC_POSTHOG_HOST" {
  type        = string
  description = "Value for the VITE_PUBLIC_POSTHOG_HOST environment variable in the Lambda function."
}


module "service" {
    source = "../../modules/service"
    environment = "staging"
    base_domain = "yongbeom.com"
    full_domain = "staging.blog.yongbeom.com"
    lambda_function_name = "personal-blog-server-staging"
    lambda_image_uri = var.lambda_image_uri
    cloudfront_cache_policy_name = "yongbeom-com-personal-blog-cache-policy-staging"
    env_var_VITE_PUBLIC_POSTHOG_KEY = var.env_var_VITE_PUBLIC_POSTHOG_KEY
    env_var_VITE_PUBLIC_POSTHOG_HOST = var.env_var_VITE_PUBLIC_POSTHOG_HOST
}

output "lambda_function_url" {
  value = module.service.lambda_function_url
  description = "The URL of the Lambda function."
}

output "cloudfront_distribution_id" {
  value = module.service.cloudfront_distribution_id
  description = "The ID of the CloudFront distribution."
}