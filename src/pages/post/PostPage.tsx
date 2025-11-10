import { Image } from "./mdx-components/Image";
import { P } from "./mdx-components/P";
import { Pre } from "./mdx-components/Pre";
import './styles/rehype-pretty-code.css';

import { fetchPostContent } from "../../utils/fetch";
import { runMdx } from "../../mdx";
import { useSsrFetch } from "../../ssr/hooks/ssr-fetch";
import { SSR_POST_CONTENT_KEY } from "../../ssr/utils/constants";
import { A } from "./mdx-components/A";
import { usePostSlug } from "./hooks/use-slug";

function PostPage() {
  const slug = usePostSlug();

  const { data: postContent, loading, error } = useSsrFetch({
    key: SSR_POST_CONTENT_KEY,
    fetchFn: () => fetchPostContent(slug),
    select: (postContent) => (postContent ? {
      frontmatter: postContent.frontmatter,
      component: runMdx(postContent.code).default,
    } : {}),
  });

  const { frontmatter, component: PostComponent } = postContent || {};

  if (loading) {
    return (
      <div className="mx-auto pt-10 px-5 pb-20 md:pt-10 md:px-5 md:pb-15">
        <div>Loading post...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto pt-10 px-5 pb-20 md:pt-5 md:px-4 md:pb-15">
        <a
          href="/"
          className="inline-block mb-10 no-underline text-base font-medium text-primary hover:underline"
        >
          ← Back
        </a>
        <h1>Post not found</h1>
        <p>{error || "The requested post could not be found."}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto pt-10 px-5 pb-20 md:pt-5 md:px-4 md:pb-15">
      <a
        href="/"
        className="inline-block mb-10 no-underline text-base font-medium text-primary hover:underline"
      >
        ← Back
      </a>

      <article>
        <header className="mb-8 text-left">
          <time className="mb-0 text-sm text-secondary">
            {frontmatter && new Date(frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <h1 className="text-5xl mb-0 md:text-[32px] max-[480px]:text-[28px] text-text font-bold">
            {frontmatter?.title}
          </h1>
          <div className="text-lg md:text-base leading-relaxed m-0 opacity-80">{frontmatter?.subtitle}</div>
        </header>

        <div className="text-md leading-[1.7] text-text md:text-base [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:font-bold [&_h1]:text-3xl [&_h1]:text-text [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-bold [&_h2]:text-2xl [&_h2]:text-text [&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:font-bold [&_h3]:text-xl [&_h3]:text-text [&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:font-bold [&_h4]:text-lg [&_h4]:text-text [&_p]:mb-6 [&_a]:text-primary [&_a]:underline [&_a]:decoration-1 [&_a]:underline-offset-2 [&_a:hover]:decoration-2[&_blockquote]:border-l-[3px] [&_blockquote]:border-primary [&_blockquote]:pl-5 [&_blockquote]:my-6 [&_blockquote]:italic [&_blockquote]:text-secondary [&_ul]:mb-6 [&_ul]:pl-6 [&_ol]:mb-6 [&_ol]:pl-6 [&_li]:mb-2 md:[&_h1]:text-[28px] md:[&_h2]:text-2xl md:[&_h3]:text-lg md:[&_h4]:text-base">
          {PostComponent && <PostComponent
            components={{ img: Image, p: P, pre: Pre, a: A }}
          />}
        </div>
      </article>
    </div>
  );
}

export default PostPage;
