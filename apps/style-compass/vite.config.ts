import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      // Allow the dev server to serve files from outside the app root
      // so that cross-app relative imports (docs, design-tokens-manager) resolve
      allow: ['../..'],
    },
  },
});
