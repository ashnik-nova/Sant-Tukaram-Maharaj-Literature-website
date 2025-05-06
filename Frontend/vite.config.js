// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: '.', // Set root to the current directory
  build: {
    outDir: 'dist',
    chunkSizeWarningLimit: 1000, // Increase the warning threshold
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Split React into a separate chunk
          ui: ['react-icons', 'tailwindcss'], // UI libraries (adjust based on what you use)
        }
      }
    }
  },
});