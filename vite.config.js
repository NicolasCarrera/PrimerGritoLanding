import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src',
  build: {
    target: 'esnext',
    polyfillModulePreload: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      }
    }
  }
});