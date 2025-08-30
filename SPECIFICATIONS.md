# Personal Blog - Technical Specifications

## Project Overview

A modern personal blog built with React, TypeScript, and Vite, featuring a clean architecture for content management and SEO-friendly routing.

## Technology Stack

### Core Technologies
- **React 19.1.1** - Frontend framework for building user interfaces
- **TypeScript** - Type safety and enhanced developer experience
- **Vite** - Fast build tool and development server
- **React Router DOM 7.8.2** - Client-side routing
- **pnpm** - Package manager for efficient dependency management

### Rationale
- **React 19.1.1**: Latest stable version with improved performance and developer experience
- **TypeScript**: Provides static typing, better IDE support, and catches errors at compile time
- **Vite**: Faster development server and build times compared to traditional bundlers
- **React Router DOM**: Industry standard for React routing with excellent TypeScript support
- **pnpm**: More efficient disk usage and faster installs compared to npm

## Architecture Overview

### Project Structure
```
src/
├── App.tsx              # Main application component with routing
├── App.css              # Global application styles
├── main.tsx             # Application entry point with BrowserRouter
├── pages/
│   ├── HomePage.tsx     # Landing page component
│   ├── PostsPage.tsx    # Blog posts listing page
│   ├── PostDetailPage.tsx # Individual post display page
│   └── posts/           # Individual post files
│       ├── getting-started-with-react.mdx
│       ├── building-modern-web-apps.mdx
│       ├── typescript-for-beginners.mdx
│       ├── types.ts     # TypeScript interfaces
│       └── utils.ts     # Utility functions
└── assets/              # Static assets
```

### Routing Structure

| Route | Component | Purpose |
|-------|-----------|----------|
| `/` | HomePage | Landing page with welcome message and recent posts |
| `/posts` | PostsPage | List of all blog posts with excerpts |
| `/posts/:slug` | PostDetailPage | Individual post content |

**Rationale**: Simple, SEO-friendly URL structure that's easy to understand and navigate.

## Content Management Architecture

### MDX-Based Post Files Approach

**Decision**: Each blog post is a separate `.mdx` file in `src/pages/posts/` with YAML frontmatter

**Structure**:
```mdx
---
slug: post-slug
title: Post Title
date: 2024-01-15
excerpt: Brief description of the post content for listings and SEO.
---

# Post Content

Markdown content with support for React components when needed.

## Code Examples

```javascript
const example = "syntax highlighted code";
```

Regular markdown formatting with **bold**, *italic*, and [links](https://example.com).
```

**Rationale**:
- **Content-First**: MDX separates content from code, making it easier for content authoring
- **Frontmatter Metadata**: YAML frontmatter provides structured metadata (slug, title, date, excerpt)
- **Rich Content**: MDX supports React components when needed while maintaining markdown simplicity
- **Better Authoring**: Standard markdown syntax with syntax highlighting for code blocks
- **SEO-Friendly**: Structured metadata in frontmatter improves SEO and content management
- **Portability**: MDX files can be easily migrated to other static site generators
- **Performance**: Smaller file sizes and faster parsing compared to TSX components

### Dynamic Loading System

**PostDetailPage Implementation**:
- Uses dynamic imports: `import(\`./posts/${slug}.mdx\`)`
- Async loading with proper error handling
- Loading states and fallbacks for better UX
- Parses frontmatter metadata for post information

**PostsPage Implementation**:
- Loads metadata from MDX frontmatter
- Uses excerpts from frontmatter for post summaries
- Sorts posts by date (newest first)
- Efficient metadata extraction without loading full content

**Rationale**: MDX provides better separation of metadata and content, improving performance and maintainability.

## Styling Architecture

### CSS Approach
- **Global CSS** in `App.css` for layout and common styles
- **Component-specific** classes with semantic naming
- **Responsive design** with mobile-first approach

**Rationale**: Simple CSS approach suitable for a personal blog, avoiding complexity of CSS-in-JS for this scale.

## Development Workflow

### Hot Module Replacement (HMR)
- Vite provides instant updates during development
- Changes to post files are reflected immediately
- TypeScript compilation happens in real-time

### Type Safety
- Strict TypeScript configuration
- Interface definitions for all data structures
- Compile-time error checking

## Performance Considerations

### Code Splitting
- Each post is a separate chunk, loaded on-demand
- React Router handles route-based code splitting
- Reduces initial bundle size

### SEO Optimization
- Clean, semantic URLs (`/posts/post-slug`)
- Proper HTML structure with semantic elements
- Meta tags can be easily added per post

## Future Considerations

### Potential Enhancements
1. **Categories/Tags**: Add taxonomy fields to frontmatter for content organization
2. **Search Functionality**: Implement client-side search across posts and metadata
3. **RSS Feed**: Generate RSS feed from MDX frontmatter metadata
4. **Static Generation**: Consider Next.js for SSG if SEO becomes critical
5. **CMS Integration**: Headless CMS integration for non-technical content editing
6. **MDX Plugins**: Add remark/rehype plugins for enhanced markdown processing

### Scalability Notes
- Current architecture supports up to ~100 posts efficiently
- For larger scale, consider:
  - Build-time post indexing
  - Server-side rendering
  - Database-backed content management

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Adding New Posts

1. Create new `.mdx` file in `src/pages/posts/`
2. Add YAML frontmatter with required fields: `slug`, `title`, `date`, `excerpt`
3. Write content in Markdown format with optional React components
4. File naming convention: `kebab-case.mdx`
5. Frontmatter example:
   ```yaml
   ---
   slug: my-new-post
   title: My New Post Title
   date: 2024-01-15
   excerpt: Brief description for the post listing.
   ---
   ```

---

*Last updated: January 2024*
*Version: 1.0.0*