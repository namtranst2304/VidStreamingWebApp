// Vite configuration optimized for performance and code splitting
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Code splitting configuration
    rollupOptions: {
      output: {        manualChunks: {
          // Vendor chunks only - no file path references
          'react-vendor': ['react', 'react-dom'],
          'motion-vendor': ['framer-motion'],
          'charts-vendor': ['recharts'],
          'player-vendor': ['react-player']
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000
  },
  // Performance optimizations
  optimizeDeps: {
    include: ['react', 'react-dom', 'framer-motion', 'zustand', 'lucide-react']
  },
  // Development server optimization
  server: {
    hmr: {
      overlay: false
    },
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    }
  }
})
