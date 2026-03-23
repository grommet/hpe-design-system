import { defineConfig } from 'vitest/config';
import { transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    // Vite's built-in esbuild plugin excludes .js files by default, so JSX
    // in .js source files (e.g. structure.js) won't be transformed. This
    // plugin runs first and transforms .js files with the 'jsx' loader so
    // that JSX syntax is handled before the SSR parse step.
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.includes('node_modules') && id.endsWith('.js')) {
          return transformWithEsbuild(code, id, {
            loader: 'jsx',
            jsx: 'automatic',
            jsxImportSource: 'react',
          });
        }
      },
    },
    react({
      include: [/\.[jt]sx?$/],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@shared/aries-core': path.resolve(
        __dirname,
        '../../shared/aries-core/src/js',
      ),
    },
  },
});
