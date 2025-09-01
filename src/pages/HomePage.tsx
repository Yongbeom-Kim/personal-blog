import { importAllPostsSorted, type Post } from './posts/utils';
import { useEffect, useState } from 'react';
import PostItem from '../components/post-item/PostItem';

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    importAllPostsSorted().then((posts) => {
      setPosts(posts)
      setLoading(false)
    })
  }, [])
  
  if (loading) {
    return (
      <div className="homepage">
        <div className="loading">Loading...</div>
      </div>
    )
  }
  
  return (
    <div className="homepage">
      <header className="blog-header">
        <h1 className="blog-title">Yongbeom's Dev Blog</h1>
        <p className="blog-subtitle">Welcome to my personal blog!</p>
      </header>
      
      <main className="posts-list">
        {posts.map((post) => (
          <PostItem key={post.frontmatter.slug} frontmatter={post.frontmatter} />
        ))}
      </main>
    </div>
  );
}

export default HomePage;