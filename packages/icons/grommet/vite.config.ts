import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        'grommet/hpe-icons': 'src/js/grommet/index.ts',
      },
      name: 'hpe-icons',
      fileName: (format, entryName) => {
        return format === 'es' ? `${entryName}.js` : `${entryName}.${format}`;
      },
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React',
        },
      },
    },
  },
});
