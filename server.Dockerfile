# AWS Lambda adapter for Express server
FROM public.ecr.aws/docker/library/node:20-slim

# Copy AWS Lambda adapter
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter

# Set Lambda adapter port
ENV PORT=3000

# Set working directory for Lambda
WORKDIR "/var/task"

# Copy package files
COPY package.json pnpm-lock.yaml /var/task/

# Install pnpm and dependencies
RUN npm install -g pnpm && \
    pnpm install --frozen-lockfile --prod

# Install tsx for running TypeScript files
RUN pnpm add tsx

# Copy the server code and required files
COPY server/ /var/task/server/
COPY index.html /var/task/
COPY dist/ /var/task/dist/

# Start the server with tsx
CMD ["pnpm", "exec", "tsx", "server/index.ts"]