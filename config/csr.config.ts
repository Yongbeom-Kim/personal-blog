import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: { include: ['@mdx-js/mdx', '@mdx-js/react', 'unist-util-visit'] },

  plugins: [
    tailwindcss(),
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
  define: {
    __SSR__: false,
  },
  server: {
    open: "index-csr.html",
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        configure(proxy) {
          proxy.on('proxyReq', (_proxyReq, req) => {
            console.log('[proxy] forwarding:', req.url);
          });
          proxy.on('error', err => console.error('[proxy error]', err));
        },
      },
      '/assets': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        configure(proxy) {
          proxy.on('proxyReq', (_proxyReq, req) => {
            console.log('[proxy] forwarding:', req.url);
          });
          proxy.on('error', err => console.error('[proxy error]', err));
        },
      },
    }
  },
  build: {
    rollupOptions: {
      input: resolve(__dirname, '../index-csr.html'),
    },
    outDir: 'dist/csr',
  },
});
