import { Link } from 'react-router-dom';
import { getSlug, type PostFrontmatter } from '../../posts/utils';

type PostSummaryItemProps = {
  frontmatter: PostFrontmatter;
}

function PostSummaryItem({ frontmatter }: PostSummaryItemProps) {
  return (
    <article className="mb-16 pb-10 md:mb-12 md:pb-8 border-b border-border last:border-b-0 last:mb-0 last:pb-0">
      <time className="block text-sm text-secondary mb-2 font-normal tracking-wider uppercase">
        {frontmatter.date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>
      <h2 className="text-3xl md:text-2xl sm:text-xl font-extrabold m-0 leading-tight tracking-tight">
        <Link 
          to={`/posts/${getSlug(frontmatter)}`}
          className="text-text font-extrabold no-underline transition-colors duration-200 hover:text-primary"
        >
          {frontmatter.title}
        </Link>
      </h2>
      <p className="text-lg md:text-base leading-relaxed text-text m-0 opacity-80">{frontmatter.subtitle}</p>
    </article>
  )
}

export default PostSummaryItem;