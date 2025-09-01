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

  return (
    <button
      onClick={() => setTheme(theme => theme === "light" ? "dark" : "light")}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
      aria-pressed={theme === "dark"}
      className="theme-toggle"
    >
      <span aria-hidden="true">
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
