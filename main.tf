terraform {
  // https://97505001405 8-yrjt6j6z.us-east-1.console.aws.amazon.com/s3/buckets/personal-blog-terraform-backend?region=us-east-1&bucketType=general&tab=objects
  backend "s3" {
    bucket = "personal-blog-terraform-backend"
    key = "terraform.tfstate"
    region = "us-east-1"
  }
}

module "prod" {
    source = "./terraform"
    website_s3_bucket = "blog.yongbeom.com-bucket"
    cloudfront_cache_policy_name = "yongbeom-com-personal-blog-cache-policy"
    base_domain = "yongbeom.com"
    full_domain = "blog.yongbeom.com"
}

module "staging" {
    source = "./terraform"
    website_s3_bucket = "blog.yongbeom.com-bucket-staging"
    cloudfront_cache_policy_name = "yongbeom-com-personal-blog-cache-policy-staging"
    base_domain = "yongbeom.com"
    full_domain = "staging.blog.yongbeom.com"
}

output "s3_bucket_name"{
    value = module.prod.s3_bucket_name
}

output "cloudfront_distribution_id"{
    value = module.prod.cloudfront_distribution_id
}


output "staging_s3_bucket_name"{
    value = module.staging.s3_bucket_name
}

output "staging_cloudfront_distribution_id"{
    value = module.staging.cloudfront_distribution_id
}