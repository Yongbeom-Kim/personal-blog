import type { CompiledPost } from "../../src/types/post";

const HOMEPAGE_SITE_NAME = "Yongbeom's Dev Blog";
const HOMEPAGE_CANONICAL_URL = "https://blog.yongbeom.com";
const HOMEPAGE_IMAGE_URL =
  "https://blog.yongbeom.com/corgi_circle_compressed.png";
const HOMEPAGE_AUTHOR = "Kim Yongbeom";

export const getPostPageMetadata = (slug: string, postData: CompiledPost) => {
  const { frontmatter } = postData;
  const { title: postTitle, date, description } = frontmatter;
  const canonicalUrl = `${HOMEPAGE_CANONICAL_URL}/posts/${slug}`;

  const title = `${postTitle} | Yongbeom's Dev Blog`;

  const og_image_url = postData.frontmatter["og:image"]
    ? `${HOMEPAGE_CANONICAL_URL}/assets/${slug}/${postData.frontmatter["og:image"]}`
    : HOMEPAGE_IMAGE_URL;

  return {
    title,
    canonicalUrl,
    metaTags: [
      { name: "author", content: HOMEPAGE_AUTHOR },
      {
        name: "description",
        property: "og:description",
        content: description,
      },
      {
        name: "robots",
        content: "index, follow",
      },
      {
        property: "article:author",
        content: HOMEPAGE_AUTHOR,
      },
      {
        property: "og:type",
        content: "article",
      },
      {
        property: "og:title",
        content: title,
      },
      {
        property: "og:url",
        content: canonicalUrl,
      },
      {
        name: "image",
        property: "og:image",
        content: og_image_url,
      },
      {
        property: "og:site_name",
        content: HOMEPAGE_SITE_NAME,
      },
      {
        name: "twitter:title",
        content: title,
      },
      {
        name: "twitter:description",
        content: description,
      },
      {
        name: "twitter:image",
        content: HOMEPAGE_IMAGE_URL,
      },
      // I have no twitter
      // {
      //     name: "twitter:site",
      //     content: "@yongbeomkim"
      // }
    ],
    googleJsonLd: {
      "@context": "https://schema.org" as const,
      "@type": "BlogPosting" as const,
      headline: title,
      image: HOMEPAGE_IMAGE_URL,
      author: { "@type": "Person" as const, name: HOMEPAGE_AUTHOR },
      publisher: { "@type": "Organization" as const, name: HOMEPAGE_SITE_NAME },
      datePublished: new Date(date).toISOString(),
      description,
    },
  };
};
