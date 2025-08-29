import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

// Define the post interface
interface PostProps {
  title: string;
  date: string;
  content: React.ReactNode;
}

interface PostSummary {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

function PostsPage() {
  const [posts, setPosts] = useState<PostSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        
        // List of available post slugs - in a real app, this could be dynamic
        const postSlugs = [
          'getting-started-with-react',
          'building-modern-web-apps', 
          'typescript-for-beginners'
        ];
        
        const postPromises = postSlugs.map(async (slug) => {
          try {
            const postModule = await import(`./posts/${slug}.tsx`);
            const postFunction = postModule.default;
            const postData: PostProps = postFunction();
            
            // Extract excerpt from content (first paragraph)
            const contentString = typeof postData.content === 'string' 
              ? postData.content 
              : 'Click to read more...';
            
            return {
              slug,
              title: postData.title,
              date: postData.date,
              excerpt: contentString.length > 150 
                ? contentString.substring(0, 150) + '...' 
                : contentString
            };
          } catch (error) {
            console.error(`Failed to load post: ${slug}`, error);
            return null;
          }
        });
        
        const loadedPosts = (await Promise.all(postPromises))
          .filter((post): post is PostSummary => post !== null)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        
        setPosts(loadedPosts);
      } catch (error) {
        console.error('Failed to load posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="posts-page">
        <div>Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="posts-page">
      <header>
        <h1>Blog Posts</h1>
        <p>Welcome to my blog! Here you'll find articles about web development, programming, and technology.</p>
      </header>
      
      <div className="posts-grid">
        {posts.map((post) => (
          <article key={post.slug} className="post-card">
            <h2>
              <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-meta">
              <time>{post.date}</time>
              <Link to={`/posts/${post.slug}`} className="read-more">
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="no-posts">
          <p>No posts available at the moment.</p>
        </div>
      )}
      
      <nav className="page-navigation">
        <Link to="/">← Back to Home</Link>
      </nav>
    </div>
  );
}

export default PostsPage;