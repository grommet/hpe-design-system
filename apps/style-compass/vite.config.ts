import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Allow clean imports of shared assets from other apps in the monorepo
      '@docs': path.resolve(__dirname, '../docs/src'),
      '@design-tokens-manager': path.resolve(
        __dirname,
        '../design-tokens-manager/src',
      ),
    },
  },
  server: {
    fs: {
      // Allow the dev server to serve files from outside the app root
      // so that cross-app relative imports (docs, design-tokens-manager) resolve
      allow: ['../..'],
    },
  },
});
