import { readdirSync, statSync } from "fs";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { compileMdx } from "../src/mdx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const POSTS_DIR = path.join(__dirname, "../posts");

export const getPostAssetPath = (post_slug: string, asset: string) => {
  return path.join(POSTS_DIR, post_slug, asset);
}

const getPostPath = (slug: string) => {
  const dirPath = path.join(POSTS_DIR, slug);
  try {
    const files = readdirSync(dirPath)
      .filter((filePath) => filePath.endsWith(".mdx"))
      .map((filePath) => path.join(dirPath, filePath));
    if (files.length === 0) throw new Error(`No MDX found for slug: ${slug}`);
    if (files.length > 1)
      throw new Error(`Multiple MDX files found for slug: ${slug}`);

    return files[0];
  } catch (error: unknown) {
    throw new Error(`Error globbing files for slug: ${slug}, error: ${error}`);
  }
};

export const getPost = async (slug: string) => {
  const postPath = getPostPath(slug);
  return await compileMdx(readFileSync(postPath, "utf-8"), postPath);
};

const getSlug = (filePath: string) => {
  return path.basename(path.dirname(filePath));
}

export const getPostsSummary = async () => {
    const postsDir = POSTS_DIR;
    const mdxFiles = readdirSync(postsDir)
        .map(dirName => path.join(postsDir, dirName))
        .filter(dirPath => statSync(dirPath).isDirectory())
        .flatMap(dirPath => readdirSync(dirPath)
            .map(fileName => path.join(dirPath, fileName))
            .filter(filePath => filePath.endsWith(".mdx")))
    
    const frontmatters = await Promise.all(mdxFiles.map(async (filePath) => {
        const content = readFileSync(filePath, "utf-8");
        const { frontmatter } = await compileMdx(content, filePath);
        frontmatter.slug = getSlug(filePath);
        return {
            ...frontmatter
        }
    }))
    
    return frontmatters.sort((a, b) => {
        const aDate = new Date(a.date as string);
        const bDate = new Date(b.date as string);
        return bDate.getTime() - aDate.getTime();
    })
}