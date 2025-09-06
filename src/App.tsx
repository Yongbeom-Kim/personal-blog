import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/post/PostPage";
import { ThemeToggleSwitch, ThemeProvider } from "./theme";

function App() {
  return (
    <ThemeProvider>
      <div className="relative max-w-3xl mx-auto px-5 leading-[1.7] text-md dark:text-4xl">
        <ThemeToggleSwitch />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:slug" element={<PostPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
