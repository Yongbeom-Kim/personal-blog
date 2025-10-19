import PostSummaryItem from '../components/post-summary-item/PostSummaryItem';
import Header from '../components/header/Header';
import { fetchPostsSummary } from '../utils/fetch';
import { useSsrFetch } from '../ssr/hooks/ssr-fetch';

function HomePage() {
  const { data: posts, loading, error } = useSsrFetch({
    key: 'postsSummary',
    fetchFn: fetchPostsSummary,
    select: (postsSummary) => postsSummary || []
  });
  
  if (loading) {
    return (
      <div>
        <div className="text-center py-15 text-base text-secondary">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <div className="text-center py-15 text-base text-red-500">Error: {error}</div>
      </div>
    )
  }

  if (!posts) {
    return (
      <div>
        <div className="text-center py-15 text-base text-secondary">No posts found</div>
      </div>
    )
  }
  
  return (
    <div className='mx-2'>
      <Header />
      
      <main className="mb-20">
        {posts.filter((post) => import.meta.env.DEV || new Date(post.date) <= new Date()).map((post) => (
          <PostSummaryItem key={post.slug} frontmatter={post} />
        ))}
      </main>
    </div>
  );
}

export default HomePage;