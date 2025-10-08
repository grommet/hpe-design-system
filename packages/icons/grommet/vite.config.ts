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
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'styled-components',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'styled-components': 'styled',
        },
        // Preserve module structure for better tree-shaking
        preserveModules: true,
        interop: 'auto',
        // Ensure proper exports
        exports: 'named',
      },
    },
    // Generate source maps for better debugging
    sourcemap: true,
    // Enable minification but preserve template literals
    minify: 'terser',
    terserOptions: {
      compress: {
        // Don't compress template literals to preserve styled-components
        keep_fnames: true,
      },
      mangle: {
        // Don't mangle function names to preserve styled-components
        keep_fnames: true,
      },
    },
  },
});
