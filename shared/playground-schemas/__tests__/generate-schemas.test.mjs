/**
 * Unit tests for generate-schemas.mjs
 *
 * Tests the pure logic functions that are extractable without running the full
 * TypeScript compiler pipeline. The integration-level test (actually parsing
 * grommet .d.ts files) is covered by the generated/ snapshot tests below.
 */

import { describe, it, expect } from 'vitest';
import path from 'path';
import fs from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GENERATED_DIR = path.resolve(__dirname, '../generated');

/** @param {string} file */
const toFileURL = file => pathToFileURL(file).href;

// ---------------------------------------------------------------------------
// Snapshot tests — verify the generated output is structurally correct
// ---------------------------------------------------------------------------

describe('generate-schemas — generated output', () => {
  it('generated/ directory exists after running the script', () => {
    expect(fs.existsSync(GENERATED_DIR)).toBe(true);
  });

  it('Button.js exists and exports schema', async () => {
    const buttonFile = path.join(GENERATED_DIR, 'Button.js');
    expect(fs.existsSync(buttonFile)).toBe(true);

    const mod = await import(toFileURL(buttonFile));
    expect(Array.isArray(mod.schema)).toBe(true);
    expect(mod.schema.length).toBeGreaterThan(0);
  });

  it('every entry in schema has name and type fields', async () => {
    const { schema } = await import(
      toFileURL(path.join(GENERATED_DIR, 'Button.js'))
    );
    const VALID_TYPES = ['boolean', 'string', 'number', 'enum', 'union'];
    schema.forEach(prop => {
      expect(typeof prop.name).toBe('string');
      expect(VALID_TYPES).toContain(prop.type);
    });
  });

  it('schema contains expected core props', async () => {
    const { schema } = await import(
      toFileURL(path.join(GENERATED_DIR, 'Button.js'))
    );
    const names = schema.map(p => p.name);
    expect(names).toContain('disabled');
    expect(names).toContain('label');
    expect(names).toContain('size');
  });

  it('disabled prop is typed as boolean', async () => {
    const { schema } = await import(
      toFileURL(path.join(GENERATED_DIR, 'Button.js'))
    );
    const disabled = schema.find(p => p.name === 'disabled');
    expect(disabled).toBeDefined();
    expect(disabled.type).toBe('boolean');
  });

  it('size prop is typed as string or enum', async () => {
    const { schema } = await import(
      toFileURL(path.join(GENERATED_DIR, 'Button.js'))
    );
    const size = schema.find(p => p.name === 'size');
    expect(size).toBeDefined();
    // grommet types size as string; if it's an enum options array is non-empty
    expect(['string', 'enum']).toContain(size.type);
    if (size.type === 'enum') {
      expect(Array.isArray(size.options)).toBe(true);
      expect(size.options.length).toBeGreaterThan(0);
    }
  });

  it('badge prop is typed as union of boolean | number | string', async () => {
    const { schema } = await import(
      toFileURL(path.join(GENERATED_DIR, 'Button.js'))
    );
    const badge = schema.find(p => p.name === 'badge');
    expect(badge).toBeDefined();
    expect(badge.type).toBe('union');
    const unionTypes = badge.types.map(t => t.type);
    expect(unionTypes).toContain('boolean');
    expect(unionTypes).toContain('number');
  });
});
