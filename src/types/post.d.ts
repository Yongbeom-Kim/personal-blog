export type FrontMatter = {
    date: string;
    slug: string;
    'slug-suffix': string;
    title: string;
    subtitle: string;
}

export type CompiledPost = {
    frontmatter: FrontMatter;
    code: string;
}

export type Post = {
    frontmatter: FrontMatter;
    content: React.ComponentType;
}