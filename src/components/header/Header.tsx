import './Header.css';

function Header() {
  return (
    <header className="blog-header">
      <div className="header-content">
        <img src="/corgi_circle_compressed.png" alt="Corgi" className="header-icon" />
        <div className="header-text">
          <h1 className="blog-title">Yongbeom's Dev Blog</h1>
          <p className="blog-subtitle">I write about everything tech (that interests me).</p>
        </div>
      </div>
    </header>
  );
}

export default Header;