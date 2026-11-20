// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  // Relative asset URLs so the build also works when grommet-app nests it
  // under /native-web/ on the hpe-theme-preview Netlify site (#6071).
  base: './',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        surfaces: 'surfaces.html',
      },
    },
  },
  optimizeDeps: {
    exclude: ['hpe-design-tokens'],
  },
});
