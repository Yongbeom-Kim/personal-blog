import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Define the post interface
interface PostProps {
  title: string;
  date: string;
  content: React.ReactNode;
}

function PostDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [postData, setPostData] = useState<PostProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setError('No post slug provided');
      setLoading(false);
      return;
    }

    const loadPost = async () => {
      try {
        setLoading(true);
        const postModule = await import(`./posts/${slug}.tsx`);
        const postFunction = postModule.default;
        const data = postFunction();
        setPostData(data);
        setError(null);
      } catch (err) {
        console.error(`Failed to load post: ${slug}`, err);
        setError(`Post "${slug}" not found`);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
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
        <h1>Post not found</h1>
        <p>{error || 'The requested post could not be found.'}</p>
        <Link to="/posts">← Back to Posts</Link>
      </div>
    );
  }

  return (
    <div className="post-detail">
      <nav className="breadcrumb">
        <Link to="/">Home</Link> &gt; <Link to="/posts">Posts</Link> &gt; {postData.title}
      </nav>
      
      <article>
        <header>
          <h1>{postData.title}</h1>
          <time>{postData.date}</time>
        </header>
        
        <div className="post-content">
          {postData.content}
        </div>
      </article>
      
      <nav className="post-navigation">
        <Link to="/posts" className="back-link">← Back to Posts</Link>
        <Link to="/" className="home-link">Home</Link>
      </nav>
    </div>
  );
}

export default PostDetailPage;