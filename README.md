# Personal Blog

A modern personal blog built with React, TypeScript, and Vite, featuring MDX content support and AWS deployment.

## Features

- **Modern Tech Stack**: React 19.1.1 with TypeScript and Vite
- **MDX Content**: Write blog posts in MDX format with YAML frontmatter
- **Dynamic Routing**: Clean URLs with React Router DOM 7.8.2
- **Performance Optimized**: Code splitting and on-demand post loading
- **SEO Friendly**: Semantic HTML structure and meta tags
- **AWS Deployment**: Automated deployment to S3 with CloudFront CDN
- **Infrastructure as Code**: Terraform configuration for AWS resources

## Tech Stack

- **Frontend**: React 19.1.1, TypeScript, Vite
- **Routing**: React Router DOM 7.8.2
- **Content**: MDX with YAML frontmatter
- **Package Manager**: pnpm
- **Deployment**: AWS S3 + CloudFront
- **Infrastructure**: Terraform

## Project Structure

```
src/
├── pages/
│   ├── HomePage.tsx          # Landing page
│   ├── PostsPage.tsx         # Blog posts listing
│   ├── PostPage.tsx          # Individual post view
│   └── posts/                # MDX blog posts
│       ├── post1.mdx
│       └── post2.mdx
├── types/
│   └── mdx.d.ts             # MDX type definitions
└── App.tsx                  # Main app component
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

2. Start development server:
   ```bash
   pnpm dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Adding Blog Posts

1. Create a new `.mdx` file in `src/pages/posts/`
2. Add YAML frontmatter with metadata:
   ```yaml
   ---
   slug: "my-new-post"
   title: "My New Post"
   date: "2024-01-15"
   excerpt: "A brief description of the post"
   ---
   ```
3. Write your content in Markdown below the frontmatter
4. The post will be automatically discovered and added to the blog

## Deployment

### AWS Infrastructure

The blog is deployed to AWS using:
- **S3**: Static website hosting
- **CloudFront**: CDN for global distribution
- **Route53**: DNS management (optional)

### Deploy to AWS

1. Configure AWS credentials
2. Set up OpenTofu:
   ```bash
   tofu init
   tofu plan
   tofu apply
   ```
3. Deploy the site:
   ```bash
   ./deploy_s3.sh
   ```

### Build for Production

```bash
pnpm build
```

The built files will be in the `dist/` directory.

## Architecture

- **Dynamic Imports**: Posts are loaded on-demand using `import.meta.glob`
- **Type Safety**: Full TypeScript support with proper MDX typing
- **Hot Module Replacement**: Instant updates during development
- **Code Splitting**: Automatic chunking for optimal loading
- **SEO Optimization**: Server-side rendering ready structure

## License

MIT
