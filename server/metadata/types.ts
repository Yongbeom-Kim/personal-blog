
export type MetaTag = {
    name: string;
    content: string;
} | {
    property: string;
    content: string;
}

export type PageMetadata = {
    title: string;
    canonicalUrl: string;
    metaTags: MetaTag[];
    googleJsonLd?: {
        "@context": "https://schema.org";
        "@type": "BlogPosting";
        headline: string;
        image: string;
        author: { "@type": "Person"; name: string; };
        publisher: { "@type": "Organization"; name: string; };
        datePublished: string;
        description: string;
    };
}