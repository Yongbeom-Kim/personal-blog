#!/bin/bash

set -a && . ./.env && set +a

if [[ "$1" == *"prod"* ]]; then
    printf "\033[33;1mLoading prod environment variables\033[0m\n"
    TERRAFORM_DIR="infra/envs/prod"
		ENV=prod
else
    printf "\033[33;1mLoading staging environment variables\033[0m\n"
    TERRAFORM_DIR="infra/envs/staging"
		ENV=staging
fi

tofu() {
    command tofu -chdir=$TERRAFORM_DIR "$@"
}

export TF_VAR_env_var_VITE_PUBLIC_POSTHOG_KEY="${VITE_PUBLIC_POSTHOG_KEY}"
export TF_VAR_env_var_VITE_PUBLIC_POSTHOG_HOST="${VITE_PUBLIC_POSTHOG_HOST}"