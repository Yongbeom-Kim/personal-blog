declare module '*.mdx' {
    import { ComponentType } from "react";
    export const Content: ComponentType
    export const frontmatter: Record<string, unknown>
}