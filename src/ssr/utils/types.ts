import type { CompiledPost, FrontMatter } from "../../types/post";
import { SSR_POST_CONTENT_KEY, SSR_POSTS_SUMMARY_KEY } from "./constants";

export type SsrStateData = {
    [SSR_POSTS_SUMMARY_KEY]?: FrontMatter[];
    [SSR_POST_CONTENT_KEY]?: CompiledPost;
}