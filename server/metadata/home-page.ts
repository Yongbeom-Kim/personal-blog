const HOMEPAGE_TITLE = "Yongbeom's Dev Blog";
const HOMEPAGE_SITE_NAME = "Yongbeom's Dev Blog";
const HOMEPAGE_DESCRIPTION =
  "I write about everything tech (that interests me).";
const HOMEPAGE_CANONICAL_URL = "https://blog.yongbeom.com";
const HOMEPAGE_IMAGE_URL =
  "https://blog.yongbeom.com/corgi_circle_compressed.png";
const HOMEPAGE_AUTHOR = "Kim Yongbeom";

export const getHomepageMetadata = () => {
  return {
    title: HOMEPAGE_TITLE,
    canonicalUrl: HOMEPAGE_CANONICAL_URL,
    metaTags: [
      { name: "author", content: HOMEPAGE_AUTHOR },
      {
        name: "description",
        content: HOMEPAGE_DESCRIPTION,
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
        content: HOMEPAGE_TITLE,
      },
      {
        property: "og:description",
        content: HOMEPAGE_DESCRIPTION,
      },
      {
        property: "og:url",
        content: HOMEPAGE_CANONICAL_URL,
      },
      {
        property: "og:image",
        content: HOMEPAGE_IMAGE_URL,
      },
      {
        property: "og:site_name",
        content: HOMEPAGE_SITE_NAME,
      },
      {
        name: "twitter:title",
        content: HOMEPAGE_TITLE,
      },
      {
        name: "twitter:description",
        content: HOMEPAGE_DESCRIPTION,
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
      headline: HOMEPAGE_TITLE,
      image: HOMEPAGE_IMAGE_URL,
      author: { "@type": "Person" as const, name: HOMEPAGE_AUTHOR },
      publisher: { "@type": "Organization" as const, name: HOMEPAGE_SITE_NAME },
      datePublished: new Date().toISOString(),
      description: HOMEPAGE_DESCRIPTION,
    },
  };
};
