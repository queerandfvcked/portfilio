import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  server: {
    historyApiFallback: true,
    headers: {
      'Content-Type': 'image/svg+xml'
    }
  },
  preview: {
    headers: {
      'Content-Type': 'image/svg+xml'
    }
  }
})
