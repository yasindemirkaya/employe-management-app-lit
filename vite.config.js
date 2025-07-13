// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    setupFiles: './test/setup.js',
    environment: 'jsdom',
    globals: true,
  },
});
