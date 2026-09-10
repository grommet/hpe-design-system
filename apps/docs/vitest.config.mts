// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { defineConfig } from 'vitest/config';
import { transformWithOxc } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    // Vite's built-in esbuild plugin excludes .js files by default, so JSX
    // in legacy .js source files won't be transformed. This
    // plugin runs first and transforms .js files with the 'jsx' loader so
    // that JSX syntax is handled before the SSR parse step.
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.includes('node_modules') && id.endsWith('.js')) {
          return transformWithOxc(code, id, {
            lang: 'jsx',
            jsx: { runtime: 'automatic', importSource: 'react' },
          });
        }
        return undefined;
      },
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    react({ include: [/\.[jt]sx?$/] }) as any,
  ],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  resolve: {
    alias: {
      '@shared/aries-core': path.resolve(
        dirname,
        '../../shared/aries-core/src/js',
      ),
    },
  },
});
