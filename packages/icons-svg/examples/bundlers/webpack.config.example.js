/**
 * Example Webpack 5 configuration for projects consuming @hpe-design/icons-svg.
 *
 * Two SVG handling strategies are shown:
 *   A) URL/DataURI — import resolves to a URL string (no CSS colour control)
 *   B) Raw string  — import resolves to the SVG markup  (CSS colour control ✅)
 *
 * Install the required loader before using Option B:
 *   npm install --save-dev raw-loader
 */

/** @type {import('webpack').Configuration} */
module.exports = {
  module: {
    rules: [
      // ── TypeScript / JavaScript ────────────────────────────────────────
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },

      // ── Option A: SVG as URL / Data URI ───────────────────────────────
      // `import iconUrl from '@hpe-design/icons-svg/add.svg'`
      // → resolves to a data URL or asset URL (no CSS colour control).
      {
        test: /\.svg$/,
        // Exclude packages where you want raw strings (Option B) by using
        // a resourceQuery or separate rule with `include` / `exclude`.
        type: 'asset/resource',
        // Alternatively, inline small SVGs as data URIs:
        // type: 'asset',
        // parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
      },

      // ── Option B: SVG as raw string ────────────────────────────────────
      // Uncomment this rule (and comment out Option A above) to import SVGs
      // as raw markup strings so `fill="currentColor"` can be styled with CSS.
      //
      // {
      //   test: /\.svg$/,
      //   use: 'raw-loader',
      // },

      // ── Option C: Use a resourceQuery to support both simultaneously ───
      // This lets you choose per-import:
      //   import url from './icon.svg'        → URL  (matched by Option A)
      //   import raw from './icon.svg?raw'    → raw  (matched by this rule)
      //
      // {
      //   test: /\.svg$/,
      //   resourceQuery: /raw/,
      //   use: 'raw-loader',
      // },
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
