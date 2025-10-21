import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Change this to '/repo-name/' if deploying to GitHub Pages username.github.io/repo-name/
  server: {
    host: true, // expose on local network
    port: 5174, // preferred port
    strictPort: false, // allow fallback if busy
  },
})
