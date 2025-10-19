import type { FrontMatter, FrontmatterRaw } from "../types/post";

export const processFrontmatter = (frontmatter: FrontmatterRaw): FrontMatter => {
  return {
    ...frontmatter,
    date: new Date(frontmatter.date),
  }
}