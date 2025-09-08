import type { CompiledPost, FrontMatter } from "../types/post";

export const fetchPostsSummary = async (): Promise<FrontMatter[]> => {
  const res = await fetch('/api/posts-summary');
  return ((await res.json()) as unknown as Array<FrontMatter>)
}

export const fetchPostContent = async (slug: string): Promise<CompiledPost> => {
  const res = await fetch(`/api/post/${slug}/content`);
  return await res.json() as CompiledPost;
}