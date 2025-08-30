import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
// import PostsPage from './pages/PostsPage'
// import PostDetailPage from './pages/PostDetailPage'
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:slug" element={<PostDetailPage />} /> */}
      </Routes>
    </div>
  )
}

export default App
