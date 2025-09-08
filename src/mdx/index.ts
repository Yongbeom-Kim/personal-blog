import { compile as mdxCompile, runSync as mdxRunSync } from "@mdx-js/mdx";
import { useMDXComponents } from '@mdx-js/react';
import runtime from 'react/jsx-runtime';

import { VFile } from "vfile";
import { matter } from "vfile-matter";
import type { FrontMatter, CompiledPost } from '../types/post';

import remarkFrontmatter from "remark-frontmatter";
import rehypePrettyCode from "rehype-pretty-code";
import { transformerNotationDiff } from "@shikijs/transformers";
import type { MDXModule } from "mdx/types";
// import rehypeMdxImportMedia from "rehype-mdx-import-media";
// import rehypeStarryNight from 'rehype-starry-night'

export const compileMdx = async (src: string, id: string): Promise<CompiledPost> => {
    const compiledCode = await mdxCompile(src, {
        outputFormat: 'function-body',
        providerImportSource: '@mdx-js/react',
        remarkPlugins: [remarkFrontmatter],
        rehypePlugins: [
            [
                rehypePrettyCode,
                {
                    theme: "github-dark",
                    transformers: [
                        transformerNotationDiff({
                            classLineAdd: "diff-add",
                            classLineRemove: "diff-remove",
                        }),
                    ],
                    grid: false,
                },
            ],
        ],
    });

    const vfile = new VFile({ path: id, value: src });
    matter(vfile);
    const frontmatter = vfile.data.matter as FrontMatter;

    const code: string =
        compiledCode.value instanceof Uint8Array
            ? compiledCode.value.toString()
            : compiledCode.value;

    return {
        code,
        frontmatter,
    };
};

export const runMdx = (code: string): MDXModule => mdxRunSync(code, {
    ...runtime,
    useMDXComponents,
    baseUrl: import.meta.url,
});