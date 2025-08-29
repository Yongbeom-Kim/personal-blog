import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="homepage">
      <h1>Welcome to My Blog</h1>
      <p>Latest blog posts and updates</p>
      
      <div className="recent-posts">
        <h2>Recent Posts</h2>
        <div className="post-preview">
          <h3>
            <Link to="/posts/getting-started-with-react">Getting Started with React</Link>
          </h3>
          <p>Learn the basics of React development...</p>
        </div>
        <div className="post-preview">
          <h3>
            <Link to="/posts/building-modern-web-apps">Building Modern Web Apps</Link>
          </h3>
          <p>Explore modern web development techniques...</p>
        </div>
      </div>
      
      <Link to="/posts" className="view-all-posts">
        View All Posts →
      </Link>
    </div>
  );
}

export default HomePage;