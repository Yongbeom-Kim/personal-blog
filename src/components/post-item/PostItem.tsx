import { Link } from 'react-router-dom';
import { type PostFrontmatter } from '../../pages/posts/utils';
import './PostItem.css';

type PostItemProps = {
  frontmatter: PostFrontmatter;
}

function PostItem({ frontmatter }: PostItemProps) {
  return (
    <article className="post-item">
      <time className="post-date">
        {frontmatter.date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>
      <h2 className="post-item-title">
        <Link to={`/posts/${frontmatter.slug}`}>{frontmatter.title}</Link>
      </h2>
      <p className="post-excerpt">{frontmatter.excerpt}</p>
    </article>
  )
}

export default PostItem;