import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import {compileSync} from '@mdx-js/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import {matter} from 'vfile-matter'
import { VFile } from 'vfile'
import tailwindcss from "@tailwindcss/vite"

const mdxPlugin: PluginOption = {
  name: 'mdx-plugin',
  enforce: 'pre',
  transform(src, id) {
    if (!id.endsWith('.mdx')) {
      return {
        code: src,
        map: null,
      }
    }
    const compiledCode = compileSync(src, {
      remarkPlugins: [remarkFrontmatter],
    })
    const vfile = new VFile({path: id, value: src})
    matter(vfile)
    const frontMatter = vfile.data.matter

    let code: string = compiledCode.value instanceof Uint8Array ? compiledCode.value.toString() : compiledCode.value
    code = code.replace('export default function MDXContent', 'export function Content')
    code += "\n" + "export const frontmatter = " + JSON.stringify(frontMatter)
    return {
      code,
      map: null,
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    mdxPlugin,
    react({include: /\.(jsx|js|mdx|md|tsx|ts)$/})
  ]
})