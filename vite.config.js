import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible'

//npm install vite-plugin-env-compatible
export default defineConfig({
  plugins: [react(),envCompatible()],
  envPrefix: "REACT_APP_",
  build: {
    outDir: 'dist',
  }
})