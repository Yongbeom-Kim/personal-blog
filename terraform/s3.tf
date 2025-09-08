variable "website_s3_bucket" {
  type = string
  description = "Prefix for the website bucket containing the website frontend. This is used to create a unique bucket name"
}

resource "aws_s3_bucket" "frontend" {
  bucket = var.website_s3_bucket
}

resource "aws_s3_bucket_public_access_block" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

resource "aws_s3_bucket_policy" "frontend" {
  bucket = aws_s3_bucket.frontend.id

  policy = data.aws_iam_policy_document.cloudfront_only_access.json
}

data "aws_iam_policy_document" "cloudfront_only_access" {
  statement {
    effect = "Allow"
    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }
    actions   = ["s3:GetObject"]
    resources = [aws_s3_bucket.frontend.arn, "${aws_s3_bucket.frontend.arn}/*"]
    condition {
      test = "StringEquals"
      values = [aws_cloudfront_distribution.frontend.arn]
      variable = "AWS:SourceArn"
    }
  }
}

output "s3_bucket_name" {
  value = aws_s3_bucket.frontend.bucket
}
output "s3_bucket_domain" {
  value = aws_s3_bucket.frontend.bucket_domain_name
}