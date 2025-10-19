import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
  define: {
    __SSR__: false,
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, '../index-ssr.html'),
    },
    outDir: 'dist/ssr-client',
  },
});
