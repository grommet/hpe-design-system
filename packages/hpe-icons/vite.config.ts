import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: {
        'hpe-icons': 'src/js/index.ts',
        'grommet/hpe-icons': 'src/js/grommet/index.ts',
      },
      name: 'hpe-icons',
      fileName: (format, entryName) => {
        return format === 'es'
          ? `${entryName}.js`
          : `${entryName}.${format}.js`;
      },
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
