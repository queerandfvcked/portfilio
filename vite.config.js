import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    copyPublicDir: true  // Добавь эту строку!
  },
  server: {
    port: 5173,  // Явно укажи порт
    open: true    // Автооткрытие браузера
  }
})