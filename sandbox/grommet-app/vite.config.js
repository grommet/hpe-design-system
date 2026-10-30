// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Multi-page: the surface token validation pages and presentation
    // (#6071) must be built too, or the Netlify deploy preview falls
    // back to index.html for them.
    rollupOptions: {
      input: {
        main: 'index.html',
        surfaces: 'surfaces.html',
        presentation: 'presentation.html',
      },
    },
  },
  optimizeDeps: {
    // Keep local workspace packages out of pre-bundle cache so token/hook
    // changes flow through during dev without requiring frequent restarts.
    exclude: ['@shared/hooks', 'hpe-design-tokens'],
  },
});
