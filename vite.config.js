import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/ittool/dist/',
  root: './',
  build: {
    outDir: 'dist'
  }
}) 