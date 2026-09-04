import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// `base` is read from BASE_PATH so the same build works on a custom domain ("/")
// and on a GitHub Pages project site ("/<repo-name>/").
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three', '@react-three/fiber'],
          motion: ['framer-motion', 'gsap'],
        },
      },
    },
  },
});
