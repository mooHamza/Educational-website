import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Default output directory, change this if needed (e.g., 'build')
  },
  server: {
    port: 3000, // Specify the port for the development server
  },
})
