terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "6.11.0"
    }
    docker = {
      source  = "docker/docker"
      version = "~> 0.2"
    }
  }
}

provider "aws" {
  # Configuration options
  region = "us-east-1"
}