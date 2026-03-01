import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.test.ts',
        '**/*.spec.ts',
        '**/test/**',
      ],
    },
    include: [
      'src/**/__tests__/**/*.{test,spec}.ts',
      'src/**/*.{test,spec}.ts',
    ],
    exclude: ['node_modules', 'dist', 'build', 'coverage'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
