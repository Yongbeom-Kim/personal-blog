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

tofu apply -target=module.base -var="lambda_image_uri=placeholder" -auto-approve