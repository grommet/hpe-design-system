import { beforeAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../../dist');
const ICONS_DIR = path.resolve(__dirname, '../icons');

const distExists = fs.existsSync(DIST_DIR);

// ---------------------------------------------------------------------------
// Guard: skip all build tests if dist/ hasn't been generated yet.
// Run `pnpm build` before running `pnpm test` in CI, or run both together:
//   pnpm build && pnpm test
// ---------------------------------------------------------------------------
describe.skipIf(!distExists)(
  'Build output — run `pnpm build` before this suite',
  () => {
    let distFiles: string[];
    let sourceIconFiles: string[];

    beforeAll(() => {
      distFiles = fs.readdirSync(DIST_DIR);
      sourceIconFiles = fs
        .readdirSync(ICONS_DIR)
        .filter(f => f.endsWith('.svg'));
    });

    // -------------------------------------------------------------------------
    // Required output files
    // -------------------------------------------------------------------------
    describe('Required output files', () => {
      it('ESM bundle (hpe-icons.js) exists', () => {
        expect(distFiles).toContain('hpe-icons.js');
      });

      it('CJS bundle (hpe-icons.cjs) exists', () => {
        expect(distFiles).toContain('hpe-icons.cjs');
      });

      it('TypeScript declaration file (index.d.ts) exists', () => {
        expect(distFiles).toContain('index.d.ts');
      });
    });

    // -------------------------------------------------------------------------
    // SVG files copied to dist/
    // -------------------------------------------------------------------------
    describe('SVG files copied to dist/', () => {
      it('SVG count in dist/ matches SVG count in src/icons/', () => {
        const distSvgFiles = distFiles.filter(f => f.endsWith('.svg'));
        expect(distSvgFiles.length).toBe(sourceIconFiles.length);
      });

      it('all source SVG filenames are present in dist/', () => {
        const missing = sourceIconFiles.filter(f => !distFiles.includes(f));
        expect(missing).toEqual([]);
      });
    });

    // -------------------------------------------------------------------------
    // Bundle file contents
    // -------------------------------------------------------------------------
    describe('Bundle file contents', () => {
      it('ESM bundle contains export default', () => {
        const content = fs.readFileSync(
          path.join(DIST_DIR, 'hpe-icons.js'),
          'utf-8',
        );
        expect(content).toContain('export default');
      });

      it('CJS bundle contains exports assignment', () => {
        const content = fs.readFileSync(
          path.join(DIST_DIR, 'hpe-icons.cjs'),
          'utf-8',
        );
        const hasCjsExports =
          content.includes('module.exports') || content.includes('exports.');
        expect(hasCjsExports).toBe(true);
      });

      it('TypeScript declaration re-exports a default', () => {
        const content = fs.readFileSync(
          path.join(DIST_DIR, 'index.d.ts'),
          'utf-8',
        );
        expect(content).toContain('export default');
      });

      it('ESM bundle references the expected icon names', () => {
        const content = fs.readFileSync(
          path.join(DIST_DIR, 'hpe-icons.js'),
          'utf-8',
        );
        // Spot-check a few well-known icons that should always exist
        expect(content).toContain('add.svg');
        expect(content).toContain('close.svg');
        expect(content).toContain('search.svg');
      });
    });
  },
);

// ---------------------------------------------------------------------------
// Reminder when the build hasn't been run yet
// ---------------------------------------------------------------------------
describe.skipIf(distExists)('Build output — dist/ not found', () => {
  it.todo('dist/ directory should exist — run `pnpm build` before this suite');
});
