import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import mdx from '@mdx-js/rollup';
import remarkGfm from 'remark-gfm';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "::",
    port: 8080,
    strictPort: true,
    hmr: {
      port: 8080
    }
  },
  preview: {
    port: 8080,
    strictPort: true
  },
  plugins: [
    react(),
    nodePolyfills(),
    mdx({
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [remarkGfm],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },
  optimizeDeps: {
    include: ['gray-matter', 'react-dom/client'],
    force: true // Force dependency optimization
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    // Explicitly copy posts directory to the build output
    copyPublicDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')
      },
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'markdown': ['react-markdown', 'remark-gfm']
        }
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
});
