import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Static files from public/ only belong in the client build. The SSR
    // bundle is used by scripts/prerender.mjs, which only needs entry-server.
    // The SSR build is run with `--mode ssr` (see package.json).
    copyPublicDir: mode !== 'ssr'
  },
  server: {
    port: 5173,
    open: true
  }
}))
