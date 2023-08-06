import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import test from 'vitest'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom'
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    }
  }
})
