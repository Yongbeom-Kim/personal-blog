import { Route, Routes } from "react-router-dom";
import { PostHogProvider } from 'posthog-js/react';
import { ThemeProvider, ThemeToggleSwitch } from "./theme";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/post/PostPage";
import "./index.css";
import { IsomorphicRouter } from "./ssr/components/isomorphic-router";
import { ClientOnlyContext } from "./ssr/context/client-only-context";

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2025-05-24" as const,
};

function App({ location }: { location: string }) {
  return (
    <ClientOnlyContext contexts={[
      [PostHogProvider, {
        apiKey: import.meta.env.VITE_PUBLIC_POSTHOG_KEY,
        options: options,
      }],
      // It is OK to put ThemeProvider here because light/dark mode is handled with 
      // the data-theme attr + a blocking script in <head>.
      [ThemeProvider]
    ]}>
        <IsomorphicRouter location={location}>
            <div className="relative max-w-3xl mx-auto px-5 leading-[1.7] text-md">
              <ThemeToggleSwitch />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/posts/:slug" element={<PostPage />} />
              </Routes>
            </div>
        </IsomorphicRouter>
    </ClientOnlyContext>
  );
}

export default App;
