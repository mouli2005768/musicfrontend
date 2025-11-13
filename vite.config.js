import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
    // 👈 This makes all assets load from /frontapp2/
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
