
import path from "node:path";
import { readFileSync } from "node:fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { SSR_STATE_ELEMENT_ID } from "../src/ssr/utils/constants";
import type { SsrStateData } from "../src/ssr/utils/types";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const html_path = path.join(__dirname, "..", "dist/ssr-client/index-ssr.html");

export const readHtml = (path: string = html_path) => readFileSync(path).toString();

export const injectSsrEntry = (html: string, ssrEntry: string) => html.replace("<!-- SSR ENTRY -->", ssrEntry);

export type MetaTag = {
    name: string;
    content: string;
} | {
    property: string;
    content: string;
}

export const injectMetaTags = (html: string, metaTags: MetaTag[]) => {
    const metaTagsHtml = metaTags.map(tag => {
        if ('name' in tag) {
            return `<meta name="${tag.name}" content="${tag.content}">`;
        } else {
            return `<meta property="${tag.property}" content="${tag.content}">`;
        }
    }).join('\n');
    
    return html.replace('</head>', `${metaTagsHtml}\n</head>`);
}

export const injectSsrState = (html: string, state: SsrStateData): string => {
    const div = `<script type="application/json" id=${SSR_STATE_ELEMENT_ID}>${JSON.stringify(state)}</script>`
    return html.replace('</head>', `${div}</head>`)
}