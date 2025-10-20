# Personal Blog

A modern personal blog built with React, TypeScript, and Vite, featuring server-side rendering (SSR), MDX content support, and AWS Lambda deployment.

## Tech Stack

- **Frontend**: React 19.1.1, TypeScript, Vite
- **Backend**: Express.js with server-side rendering
- **Routing**: React Router DOM 7.8.2
- **Content**: MDX with YAML frontmatter
- **Package Manager**: pnpm
- **Containerization**: Docker with AWS Lambda adapter
- **Deployment**: AWS Lambda + ECR + CloudFront
- **Infrastructure**: Terraform with modular structure

## Project Structure

```
src/
├── pages/
│   ├── HomePage.tsx          # Landing page
│   ├── post/
│   │   ├── PostPage.tsx      # Individual post view
│   │   └── mdx-components/   # Custom MDX components
│   └── posts/                # MDX blog posts
│       ├── 2025-09-03-hello-world/
│       └── 2025-09-08-dark-theme-ssr/
├── server/
│   ├── index.ts             # Express server entry point
│   ├── html.ts              # HTML template utilities
│   └── post.ts              # Post processing utilities
├── ssr/                     # Server-side rendering utilities
│   ├── components/          # SSR-specific components
│   ├── context/             # SSR state management
│   ├── hooks/               # SSR hooks
│   └── utils/               # SSR utilities
├── components/              # React components
├── theme/                   # Theme management
└── types/                   # TypeScript definitions
```

## Development

### Prerequisites

- Node.js 18+
- pnpm

### Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Start development server (CSR mode):
   ```bash
   pnpm dev # on one terminal
   pnpm dev:server # on another terminal
   ```

3. Start development server with SSR:
   ```bash
   pnpm dev:ssr
   ```

### Adding Blog Posts

1. Create a new directory in `posts/` with the format `YYYY-MM-DD-post-slug/`
2. Add a `post.mdx` file with YAML frontmatter:
   ```yaml
   ---
   slug: "my-new-post"
   title: "My New Post"
   date: "2024-01-15"
   subtitle: "A brief description of the post"
   description: "160-character, SEO-optimized description of the post"
   ---
   ```
3. Write your content in Markdown below the frontmatter
4. Add any images or assets to the same directory
5. The post will be automatically discovered and added to the blog

## Deployment

### AWS Infrastructure

The blog is deployed to AWS using:
- **AWS Lambda**: Serverless function hosting with Express.js
- **ECR**: Container registry for Docker images
- **CloudFront**: CDN for global distribution
- **Route53**: DNS management
- **Multi-Environment**: Separate staging and production environments

### Deploy to AWS

1. Configure AWS credentials
2. Set up infrastructure (first time only):
   ```bash
   # For staging
   ./pre-deploy.sh staging
   
   # For production
   ./pre-deploy.sh prod
   ```
3. Deploy the application:
   ```bash
   # Deploy to staging
   ./deploy.sh staging
   
   # Deploy to production
   ./deploy.sh prod
   ```

### Build for Production

```bash
# Build SSR application
pnpm build

# Build Docker image
pnpm docker:build
```

The built files will be in the `dist/` directory and Docker image will be tagged for deployment.

## Architecture

- **Server-Side Rendering**: Express.js server with React SSR for optimal SEO
- **Dynamic Imports**: Posts are loaded on-demand using `import.meta.glob`
- **Type Safety**: Full TypeScript support with proper MDX typing
- **Hot Module Replacement**: Instant updates during development
- **Code Splitting**: Automatic chunking for optimal loading
- **Containerization**: Docker-based deployment with AWS Lambda adapter
- **Multi-Environment**: Separate staging and production deployments
- **Modular Infrastructure**: Terraform modules for base and service resources