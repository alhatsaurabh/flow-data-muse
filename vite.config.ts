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
    react({
      // Use classic runtime for React 17
      jsxRuntime: 'classic'
    }),
    nodePolyfills(),
    markdown()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['gray-matter', 'react-dom/client'],
    force: true // Force dependency optimization
  },
  build: {
    rollupOptions: {
      external: ['gray-matter', 'react-dom/client', 'react', 'react-dom'],
      output: {
        globals: {
          'gray-matter': 'matter',
          'react': 'React',
          'react-dom': 'ReactDOM',
          'react-dom/client': 'ReactDOMClient'
        }
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
