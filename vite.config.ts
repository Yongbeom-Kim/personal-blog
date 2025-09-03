import { defineConfig, type PluginOption } from "vite";
import { compile } from "@mdx-js/mdx";
import { VFile } from "vfile";
import { matter } from "vfile-matter";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import remarkFrontmatter from "remark-frontmatter";
import rehypeMdxImportMedia from 'rehype-mdx-import-media'
import rehypeStarryNight from 'rehype-starry-night'


const mdxPlugin: PluginOption = {
  name: "mdx-plugin",
  enforce: "pre",
  async transform(src, id) {
    if (!id.endsWith(".mdx")) {
      return {
        code: src,
        map: null,
      };
    }
    const compiledCode = await compile(src, {
      remarkPlugins: [remarkFrontmatter],
      rehypePlugins: [rehypeStarryNight, rehypeMdxImportMedia]
    });
    const vfile = new VFile({ path: id, value: src });
    matter(vfile);
    const frontMatter = vfile.data.matter as Record<string, any>;

    let code: string =
      compiledCode.value instanceof Uint8Array
        ? compiledCode.value.toString()
        : compiledCode.value;
    code = code.replace(
      "export default function MDXContent",
      "export function Content"
    );
    code += "\n" + "export const frontmatter = " + JSON.stringify(frontMatter);
    return {
      code,
      map: null,
    };
  },
};

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    mdxPlugin,
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
});
