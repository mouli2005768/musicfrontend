import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  base: '/frontapp2/',   // 👈 important: matches your WAR context path

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
