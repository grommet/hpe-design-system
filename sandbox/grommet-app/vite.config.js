import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Keep local workspace packages out of pre-bundle cache so token/hook
    // changes flow through during dev without requiring frequent restarts.
    exclude: ['@shared/hooks', 'hpe-design-tokens'],
  },
});
