import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Example Vite configuration for projects consuming @hpe-design/icons-svg.
 *
 * Two common SVG import strategies are shown below. Pick the one that fits
 * your project, or use both side-by-side.
 */
export default defineConfig({
  plugins: [react()],

  // ─── Option A (default, no config needed) ───────────────────────────────
  // Vite handles SVG out-of-the-box:
  //   • `import url from './icon.svg'`       → resolves to a URL string
  //   • `import raw from './icon.svg?raw'`   → resolves to the SVG markup
  //
  // No extra configuration required for these two built-in query suffixes.

  // ─── Option B: treat ALL SVG imports as raw strings (no ?raw suffix) ────
  // Uncomment the block below if you prefer `import raw from './icon.svg'`
  // to always return the raw SVG markup instead of a URL.
  //
  // assetsInclude: [],  // prevent Vite treating .svg as static assets
  // optimizeDeps: {
  //   // If you pre-bundle dependencies, exclude the icons package so that
  //   // individual .svg files remain resolvable at runtime.
  //   exclude: ['@hpe-design/icons-svg'],
  // },
  // plugins: [
  //   react(),
  //   {
  //     // Inline plugin: intercept .svg imports and return raw content
  //     name: 'svg-raw',
  //     transform(src, id) {
  //       if (id.endsWith('.svg')) {
  //         return { code: `export default ${JSON.stringify(src)}`, map: null };
  //       }
  //     },
  //   },
  // ],
});
