import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'remove-crossorigin',
      transformIndexHtml(html) {
        return html
          .replace(/\s*crossorigin/g, '')
          .replace(/<script([^>]*)>/g, (match, attrs) => `<script${attrs}>`)
          .replace(/<link([^>]*crossorigin[^>]*)>/g, (match, attrs) => {
            const cleaned = attrs.replace(/\s*crossorigin/g, '');
            return `<link${cleaned}>`;
          });
      },
    },
  ],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome90',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});