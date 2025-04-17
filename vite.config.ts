import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    nodePolyfills({
      // To support gray-matter which uses Node.js modules
      include: ['path', 'fs', 'buffer']
    }),
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
