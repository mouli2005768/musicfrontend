import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/frontapp1/',   // 👈 must match your Tomcat context path
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
