import { useCallback, useEffect, useRef } from 'react';
import type { FrontMatter } from '../../types/post';
import { prefetch } from '../../ssr/utils/prefetch';

type PostSummaryItemProps = {
  frontmatter: FrontMatter;
}

function PostSummaryItem({ frontmatter }: PostSummaryItemProps) {
  const articleRef = useRef<HTMLAnchorElement>(null);
  const hasPrefetchedRef = useRef(false);

  const prefetchPost = useCallback(() => {
    //@ts-expect-error - navigator.connection is not typed
    if (navigator.connection?.saveData) return;
    if (hasPrefetchedRef.current) return;
    prefetch(`/posts/${frontmatter.slug}`);
    hasPrefetchedRef.current = true;
  }, [frontmatter.slug]);

  useEffect(() => {
    const ref = articleRef.current;
    if (!ref) return; 

    const observer = new window.IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasPrefetchedRef.current) {
            prefetchPost();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(ref);

    ref.addEventListener('mouseenter', prefetchPost);

    return () => {
      observer.disconnect();
      ref.removeEventListener('mouseenter', prefetchPost);
    };
  }, [frontmatter.slug]);

  return (
    <>
      <article ref={articleRef} className="mb-16 pb-10 md:mb-12 md:pb-8 border-b border-border last:border-b-0 last:mb-0 last:pb-0">
        <time className="block text-sm text-secondary mb-2 font-normal tracking-wider uppercase">
          {new Date(frontmatter.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
        <h2 className="text-3xl md:text-2xl sm:text-xl font-extrabold m-0 leading-tight tracking-tight">
          <a 
            href={`/posts/${frontmatter.slug}`}
            className="text-text font-extrabold no-underline transition-colors duration-200 hover:text-primary"
          >
            {frontmatter.title}
          </a>
        </h2>
        <p className="text-lg md:text-base leading-relaxed text-text m-0 opacity-80">{frontmatter.subtitle}</p>
      </article>
    </>
  )
}

export default PostSummaryItem;