export type PostFrontmatter = {
    slug: string;
    title: string;
    date: Date;
    excerpt: string;
}

export type Post = {
    frontmatter: PostFrontmatter;
    Content: React.ComponentType;
}

// TODO: build-time validation of post frontmatter
export const importPost = async (path: string): Promise<Post> => {
  const { frontmatter, Content } = await import(path)

  frontmatter.date = new Date(frontmatter.date)
  return { frontmatter, Content }
}

export const importAllPosts = async (): Promise<Map<string, Post>> => {
  // Use Vite's import.meta.glob for dynamic post loading with HMR support
  const postModules = import.meta.glob('/src/posts/**/*.mdx', { eager: true }) as Record<string, { frontmatter: PostFrontmatter; Content: React.ComponentType }>
  
  const postsMap = new Map<string, Post>()
  
  Object.values(postModules).forEach(module => {
    const post: Post = {
      frontmatter: {
        ...module.frontmatter,
        date: new Date(module.frontmatter.date)
      },
      Content: module.Content
    }
    postsMap.set(post.frontmatter.slug, post)
  })
  
  return postsMap
}

export const importAllPostsSorted = async (): Promise<Post[]> => {
  const postsMap = await importAllPosts()
  const posts = Array.from(postsMap.values())
  posts.sort((a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime())
  return posts
}