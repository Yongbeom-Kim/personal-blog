export type FrontMatter = {
    date: string;
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    unlisted: boolean;
    "og:image"?: string;
}

export type CompiledPost = {
    frontmatter: FrontMatter;
    code: string;
}

export type Post = {
    frontmatter: FrontMatter;
    content: React.ComponentType;
}