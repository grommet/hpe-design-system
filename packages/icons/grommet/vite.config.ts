import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        'hpe-icons': resolve(__dirname, 'src/js/index.ts'),
      },
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    rollupOptions: {
      // Externalize deps that shouldn't be bundled
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'styled-components': 'styled',
          'react/jsx-runtime': 'jsxRuntime',
        },
        // Preserve module structure for better tree-shaking
        preserveModules: false,
        interop: 'auto',
        // Ensure proper exports
        exports: 'named',
      },
    },
    // Generate source maps for better debugging
    sourcemap: true,
    // Don't minify to preserve styled-components template literals
    minify: false,
  },
});
