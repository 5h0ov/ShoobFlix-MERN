import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",  // IMPORTANT: this is the port where the backend is running and for the cookie to work this is needed to be declared here
      }
    }
  }
})
