import { getSlug, importAllPostsSorted, type Post } from '../posts/utils';
import { useEffect, useState } from 'react';
import PostSummaryItem from '../components/post-summary-item/PostSummaryItem';
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
    <div className='mx-2'>
      <Header />
      
      <main className="mb-20">
        {posts.filter((post) => post.frontmatter.date <= new Date()).map((post) => (
          <PostSummaryItem key={getSlug(post.frontmatter)} frontmatter={post.frontmatter} />
        ))}
      </main>
    </div>
  );
}

export default HomePage;