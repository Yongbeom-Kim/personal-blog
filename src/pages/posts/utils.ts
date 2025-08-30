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

export const importAllPosts = async () => {
  const posts = await Promise.all(
    ALL_POST_PATHS.map(importPost)
  )
  posts.sort((a, b) => b.frontmatter.date.getTime() - a.frontmatter.date.getTime())
  return posts
}