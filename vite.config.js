import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Comentar para desarrollo local, descomentar para GitHub Pages
  // base: '/sebitasmnt.github.io/'
})

