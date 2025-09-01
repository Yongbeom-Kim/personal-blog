import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostDetailPage from "./pages/PostDetailPage";
import { ThemeToggleSwitch, ThemeProvider } from "./theme";

function App() {
  return (
    <ThemeProvider>
      <div className="relative max-w-[680px] mx-auto px-5 leading-[1.7] text-md h-fit min-h-screen overflow-auto">
        <ThemeToggleSwitch />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts/:slug" element={<PostDetailPage />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
