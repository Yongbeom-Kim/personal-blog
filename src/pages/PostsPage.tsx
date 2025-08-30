// import { Link } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import { loadPostSummaries } from './posts/utils';
// import type { PostSummary } from './posts/types';

// function PostsPage() {
//   const [posts, setPosts] = useState<PostSummary[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadPosts = async () => {
//       try {
//         setLoading(true);
        
//         // List of available post slugs - in a real app, this could be dynamic
//         const postSlugs = [
//           'getting-started-with-react',
//           'building-modern-web-apps', 
//           'typescript-for-beginners'
//         ];
        
//         const loadedPosts = await loadPostSummaries(postSlugs);
//         setPosts(loadedPosts);
//       } catch (error) {
//         console.error('Failed to load posts:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadPosts();
//   }, []);

//   if (loading) {
//     return (
//       <div className="posts-page">
//         <div>Loading posts...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="posts-page">
//       <header>
//         <h1>Blog Posts</h1>
//         <p>Welcome to my blog! Here you'll find articles about web development, programming, and technology.</p>
//       </header>
      
//       <div className="posts-grid">
//         {posts.map((post) => (
//           <article key={post.slug} className="post-card">
//             <h2>
//               <Link to={`/posts/${post.slug}`}>{post.title}</Link>
//             </h2>
//             <p className="post-excerpt">{post.excerpt}</p>
//             <div className="post-meta">
//               <time>{post.date}</time>
//               <Link to={`/posts/${post.slug}`} className="read-more">
//                 Read more →
//               </Link>
//             </div>
//           </article>
//         ))}
//       </div>
      
//       {posts.length === 0 && (
//         <div className="no-posts">
//           <p>No posts available at the moment.</p>
//         </div>
//       )}
      
//       <nav className="page-navigation">
//         <Link to="/">← Back to Home</Link>
//       </nav>
//     </div>
//   );
// }

// export default PostsPage;