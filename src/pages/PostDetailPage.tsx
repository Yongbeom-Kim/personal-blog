import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { importAllPosts, type Post } from './posts/utils';

function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [postData, setPostData] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('No post slug provided');
      setLoading(false);
      return;
    }

    const loadPostData = async () => {
      try {
        setLoading(true);
        const postsMap = await importAllPosts();
        const post = postsMap.get(slug);
        
        if (post) {
          setPostData(post);
          setError(null);
        } else {
          setError(`Post "${slug}" not found`);
        }
      } catch (err) {
        console.error(`Failed to load post: ${slug}`, err);
        setError(`Post "${slug}" not found`);
      } finally {
        setLoading(false);
      }
    };

    loadPostData();
  }, [slug]);

  if (loading) {
    return (
      <div className="post-detail">
        <div>Loading post...</div>
      </div>
    );
  }

  if (error || !postData) {
    return (
      <div className="post-detail">
        <Link to="/" className="back-link">← Back</Link>
        <h1>Post not found</h1>
        <p>{error || 'The requested post could not be found.'}</p>
      </div>
    );
  }

  return (
    <div className="post-detail">
      <Link to="/" className="back-link">← Back</Link>
      
      <article>
        <header className="post-header">
          <time className="post-date">
            {postData.frontmatter.date.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </time>
          <h1 className="post-detail-title">{postData.frontmatter.title}</h1>
        </header>
        
        <div className="post-content">
          <postData.Content />
        </div>
      </article>
    </div>
  );
}

export default PostDetailPage;