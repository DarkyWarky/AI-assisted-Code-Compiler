import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Ensure that the environment variable prefix is correct
  envPrefix: 'VITE_',

  // Optionally, add a define property to check if the variables are passed correctly
  define: {
    'process.env': process.env
  }
})
