import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './strat/solutionengineering'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        'ipe-playbook': './strat/solutionengineering/ipe-playbook.html'
      }
    }
  }
})

