import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@shared/aries-core': path.resolve(
        __dirname,
        '../../shared/aries-core/src',
      ),
    },
  },
});
