import { useEffect, useLayoutEffect, useState } from "react";

export function ThemeToggleSwitch() {
  const [theme, setTheme] = useState("");

  useLayoutEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    if (prefersDarkScheme.media === "not all") {
      setTheme("light");
    } else {
      setTheme(prefersDarkScheme.matches ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme => theme === "light" ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      aria-pressed={theme === "dark"}
      className="fixed top-5 right-5 bg-transparent border-none text-lg cursor-pointer p-2 rounded-full transition-colors duration-200 z-[100] aspect-square grid place-content-center h-10 w-10 hover:bg-border md:top-4 md:right-4 md:text-md"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <span aria-hidden="true" className="bg-transparent">
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
