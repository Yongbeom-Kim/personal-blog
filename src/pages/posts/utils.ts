import type { Post } from './types';

/**
 * Utility function to lazy load a post by its slug
 * @param slug - The post slug to load
 * @returns Promise that resolves to the Post data
 */
export async function loadPost(slug: string): Promise<Post> {
  try {
    const postModule = await import(`./${slug}.tsx`);
    const postFunction = postModule.default;
    const postData = postFunction();
    
    return {
      slug,
      title: postData.title,
      date: postData.date,
      excerpt: postData.excerpt || '',
      content: postData.content
    };
  } catch {
    throw new Error(`Failed to load post: ${slug}`);
  }
}

/**
 * Utility function to lazy load multiple posts
 * @param slugs - Array of post slugs to load
 * @returns Promise that resolves to array of Post data
 */
export async function loadPosts(slugs: string[]): Promise<Post[]> {
  const postPromises = slugs.map(slug => loadPost(slug));
  const posts = await Promise.allSettled(postPromises);
  
  return posts
    .filter((result): result is PromiseFulfilledResult<Post> => result.status === 'fulfilled')
    .map(result => result.value)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}