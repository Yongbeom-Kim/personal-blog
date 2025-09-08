# Variables for Lambda and ECR
variable "backend_lambda_ecr_name" {
  type        = string
  description = "The name of the ECR repository for the backend lambda container."
}

variable "lambda_function_name" {
  type        = string
  description = "The name of the Lambda function."
}

# ECR Repository
resource "aws_ecr_repository" "backend_lambda" {
  name = var.backend_lambda_ecr_name

  image_tag_mutability = "MUTABLE"
  force_delete         = true
  image_scanning_configuration {
    scan_on_push = true
  }
}

# IAM Role for Lambda
resource "aws_iam_role" "lambda_execution_role" {
  name = "${var.lambda_function_name}-execution-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })
}

# IAM Policy Attachment for Lambda Basic Execution
resource "aws_iam_role_policy_attachment" "lambda_basic_execution" {
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
  role       = aws_iam_role.lambda_execution_role.name
}

# ECR Authorization Token
data "aws_ecr_authorization_token" "token" {}

# Docker Provider Configuration
provider "docker" {
  host  = data.aws_ecr_authorization_token.token.proxy_endpoint
  username = data.aws_ecr_authorization_token.token.user_name
  password = data.aws_ecr_authorization_token.token.password
}

# Lambda Function with dummy container initially
resource "aws_lambda_function" "backend" {
  function_name = var.lambda_function_name
  role         = aws_iam_role.lambda_execution_role.arn
  
  # Use a dummy public ECR image initially
  package_type = "Image"
  image_uri    = "nginx:stable-alpine"
  
  timeout = 30
  memory_size = 512

  environment {
    variables = {
      NODE_ENV = "production"
    }
  }

  lifecycle {
    ignore_changes = [image_uri]
  }
}

# Lambda Function URL (optional - for direct HTTP access)
resource "aws_lambda_function_url" "backend_url" {
  function_name      = aws_lambda_function.backend.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = false
    allow_origins     = ["*"]
    allow_methods     = ["*"]
    allow_headers     = ["date", "keep-alive"]
    expose_headers    = ["date", "keep-alive"]
    max_age          = 86400
  }
}

# Outputs
output "ecr_repository_url" {
  value = aws_ecr_repository.backend_lambda.repository_url
}

output "lambda_function_name" {
  value = aws_lambda_function.backend.function_name
}

output "lambda_function_url" {
  value = aws_lambda_function_url.backend_url.function_url
}