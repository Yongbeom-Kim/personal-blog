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
      className="fixed bottom-5 left-5 bg-transparent border-none cursor-pointer p-3 rounded-full transition-all duration-300 z-[100] aspect-square grid place-content-center h-12 w-12 hover:scale-110 md:top-4 md:right-4 md:bottom-auto md:left-auto md:h-10 md:w-10 md:p-2"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div 
        aria-hidden="true" 
        className={`relative transition-all duration-300 ${
          theme === "light" 
            ? "w-6 h-6 bg-[#2c2520] rounded-full before:content-[''] before:absolute before:top-0 before:left-2 before:w-6 before:h-6 before:bg-[#f5f0e8] before:rounded-full before:shadow-none" 
            : "w-6 h-6 bg-[#f5f0e8] rounded-full"
        }`}
      >
      </div>
    </button>
  );
}
