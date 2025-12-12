import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/icons/**/*.svg',
          dest: '.',
        },
      ],
    }),
  ],
  build: {
    lib: {
      name: 'hpe-icons',
      entry: {
        'hpe-icons': 'src/index.ts',
      },
      formats: ['es', 'cjs'],
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
});
