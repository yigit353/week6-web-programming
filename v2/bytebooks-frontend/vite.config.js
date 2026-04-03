import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to the FastAPI backend to avoid CORS issues
      '/books': 'http://localhost:8000',
      '/authors': 'http://localhost:8000',
    },
  },
})
