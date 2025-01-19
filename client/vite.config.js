import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
   // Determine the backend URL based on the environment
   const isProduction = mode === "production";
   const backendUrl = isProduction
     ? "https://saveidea.onrender.com/api/v1" // Replace with your Render backend URL
    : "http://localhost:7000"; // Local development backend URL
  
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      global: {},
    },
    server: {
      proxy: {
        "/api/": {
          target: backendUrl, // Dynamically set the backend URL
          changeOrigin: true,
          secure: false,
        },
      },
    },
  }
})
