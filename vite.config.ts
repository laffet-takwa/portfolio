import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Served from https://laffet-takwa.github.io/portfolio/ — the repository
  // name becomes the path, so every built asset URL must carry the prefix.
  base: '/portfolio/',
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    host: true,
  },
  build: {
    target: 'es2020',
    cssTarget: 'chrome90',
  },
});