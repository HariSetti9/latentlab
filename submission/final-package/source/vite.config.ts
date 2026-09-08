import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    exclude: ['node_modules/**', 'dist/**', 'submission/**'],
  },
  build: {
    sourcemap: true,
  },
});
