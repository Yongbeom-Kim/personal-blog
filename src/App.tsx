import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostsPage from "./pages/PostsPage";
import PostDetailPage from "./pages/PostDetailPage";
import { ThemeToggleSwitch, ThemeProvider } from "./theme";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <ThemeToggleSwitch />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:slug" element={<PostDetailPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
