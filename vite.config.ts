import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import { plugin as markdown } from 'vite-plugin-markdown';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    nodePolyfills(),
    markdown()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['gray-matter']
  },
  build: {
    rollupOptions: {
      external: ['gray-matter'],
      output: {
        globals: {
          'gray-matter': 'matter'
        }
      }
    }
  }
});
