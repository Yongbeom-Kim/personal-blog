
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

export const injectSsrState = (html: string, state: SsrStateData): string => {
    const safeJson = JSON.stringify(state).replace(/</g, "\\u003c");
    const div = `<script type="application/json" id=${SSR_STATE_ELEMENT_ID}>${safeJson}</script>`
    return html.replace('</head>', `${div}</head>`)
}