import type { MetaTag } from "./types";
import type { PageMetadata } from "./types";


const injectTitle = (html: string, title: string) => {
    return html.replace('</head>', `<title>${title}</title>\n</head>`);
}

const injectCanonicalUrl = (html: string, canonicalUrl: string) => {
    return html.replace('</head>', `<link rel="canonical" href="${canonicalUrl}">\n</head>`);
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

const injectGoogleJsonLd = (html: string, googleJsonLd: any) => {
    return html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(googleJsonLd)}</script>\n</head>`);
}


export const insertMetadata = (html: string, metadata: PageMetadata) => {
    html = injectTitle(html, metadata.title);
    html = injectCanonicalUrl(html, metadata.canonicalUrl);
    html = injectMetaTags(html, metadata.metaTags);
    html = injectGoogleJsonLd(html, metadata.googleJsonLd);
    return html;
}