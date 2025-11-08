# AWS Lambda adapter for Express server
FROM public.ecr.aws/docker/library/node:20-slim

# Copy AWS Lambda adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter

# Set Lambda adapter port
ENV PORT=3000

# Set working directory for Lambda
WORKDIR "/var/task"

# Install pnpm
RUN npm install -g pnpm

# Copy all source files
COPY . .

# Accept build arguments for Vite environment variables
ARG VITE_PUBLIC_POSTHOG_KEY
ARG VITE_PUBLIC_POSTHOG_HOST

# Set environment variables for build time
ENV VITE_PUBLIC_POSTHOG_KEY=${VITE_PUBLIC_POSTHOG_KEY}
ENV VITE_PUBLIC_POSTHOG_HOST=${VITE_PUBLIC_POSTHOG_HOST}

# Install dependencies
RUN pnpm install --frozen-lockfile

# Build the app
RUN pnpm build

# Start the server with tsx
CMD ["pnpm", "run", "server"]
