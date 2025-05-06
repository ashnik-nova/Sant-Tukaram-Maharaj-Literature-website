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
          // React core
          'react-core': ['react', 'react-dom'],
          
          // Routing
          'router': ['react-router-dom'],
          
          // UI frameworks
          'chakra': ['@chakra-ui/react', '@emotion/react', '@emotion/styled'],
          'bootstrap': ['bootstrap', 'react-bootstrap'],
          
          // Icons and animations
          'icons': ['react-icons', 'react-bootstrap-icons', 'lucide-react', '@fortawesome/react-fontawesome'],
          'animations': ['framer-motion'],
          
          // Utilities
          'utils': ['axios', 'js-cookie', 'react-toastify']
        }
      }
    }
  },
});