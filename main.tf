terraform {
  // https://97505001405 8-yrjt6j6z.us-east-1.console.aws.amazon.com/s3/buckets/personal-blog-terraform-backend?region=us-east-1&bucketType=general&tab=objects
  backend "s3" {
    bucket = "personal-blog-terraform-backend"
    key = "terraform.tfstate"
    region = "us-east-1"
  }
}

module "main" {
    source = "./terraform"
    website_s3_bucket = "blog.yongbeom.com-bucket"
    cloudfront_cache_policy_name = "yongbeom-com-personal-blog-cache-policy"
    base_domain = "yongbeom.com"
    full_domain = "blog.yongbeom.com"
}

output "s3_bucket_name"{
    value = module.main.s3_bucket_name
}

output "cloudfront_distribution_id"{
    value = module.main.cloudfront_distribution_id
}