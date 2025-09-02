import { importAllPostsSorted, type Post } from '../posts/utils';
import { useEffect, useState } from 'react';
import PostItem from '../components/post-item/PostItem';
import Header from '../components/header/Header';

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
      <div>
        <div className="text-center py-15 text-base text-secondary">Loading...</div>
      </div>
    )
  }
  
  return (
    <div>
      <Header />
      
      <main className="mb-20">
        {posts.map((post) => (
          <PostItem key={post.frontmatter.slug} frontmatter={post.frontmatter} />
        ))}
      </main>
    </div>
  );
}

export default HomePage;