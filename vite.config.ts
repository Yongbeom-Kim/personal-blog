import { defineConfig, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import {compileSync} from '@mdx-js/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import {matter} from 'vfile-matter'
import { VFile } from 'vfile'
import fs from 'node:fs'
import path from 'node:path'


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

const POSTS_DIRECTORY = path.join(__dirname, 'src/pages/posts')

// https://vite.dev/config/
export default defineConfig({
  define: {
    ALL_POST_PATHS: fs.readdirSync(POSTS_DIRECTORY).filter((file) => file.endsWith('.mdx')).map(filename => path.join(POSTS_DIRECTORY, filename))
  },
  plugins: [
    // {enforce: 'pre', ...mdx({})},
    mdxPlugin,
    react({include: /\.(jsx|js|mdx|md|tsx|ts)$/})
  ]
})