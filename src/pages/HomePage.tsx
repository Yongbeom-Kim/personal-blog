import { Link } from 'react-router-dom';
import { importAllPosts, type Post, type PostFrontmatter } from './posts/utils';
import { useEffect, useState } from 'react';

type PostSummaryProps = {
  frontmatter: PostFrontmatter;
}
function PostSummary({frontmatter}: PostSummaryProps) {
  return (
    <div className="post-preview">
      <h3>
        <Link to={`/posts/${frontmatter.slug}`}>{frontmatter.title}</Link>
      </h3>
      <p>{frontmatter.excerpt}</p>
    </div>
  )
}

function HomePage() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([])
  useEffect(() => {
    importAllPosts().then((posts) => {
      setRecentPosts(posts)
    })
  }, [])
  
  
  return (
    <div className="homepage">
      <h1>Welcome to My Blog</h1>
      <p>Latest blog posts and updates</p>

      
      
      <div className="recent-posts">
        <h2>Recent Posts</h2>
        {recentPosts.slice(0, 3).map((post) => (
          <PostSummary frontmatter={post.frontmatter} />
        ))}
      </div>

      <Link to="/posts" className="view-all-posts">
        View All Posts →
      </Link>
    </div>
  );
}

export default HomePage;