import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/ittool/docs/',
  build: {
    outDir: 'docs'
  }
}) 