import { beforeAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ICONS_DIR = path.resolve(__dirname, '../icons');

// ---------------------------------------------------------------------------
// Source icon file validation
// ---------------------------------------------------------------------------
describe('Icon source files', () => {
  let iconFiles: string[];

  beforeAll(() => {
    iconFiles = fs.readdirSync(ICONS_DIR).filter(f => f.endsWith('.svg'));
  });

  it('contains at least 400 SVG icons', () => {
    expect(iconFiles.length).toBeGreaterThanOrEqual(400);
  });

  it('icons directory contains only SVG files', () => {
    const allFiles = fs.readdirSync(ICONS_DIR);
    const nonSvg = allFiles.filter(f => !f.endsWith('.svg'));
    expect(nonSvg).toEqual([]);
  });

  it('all filenames follow the expected naming convention (kebab-case)', () => {
    // Allows lowercase-kebab, AI-prefixed (uppercase abbreviations), and digits
    const invalid = iconFiles.filter(
      f => !/^[a-zA-Z][a-zA-Z0-9-]*\.svg$/.test(f),
    );
    expect(invalid).toEqual([]);
  });

  it('no duplicate filenames', () => {
    const unique = new Set(iconFiles);
    expect(iconFiles.length).toBe(unique.size);
  });

  it('all icons have viewBox="0 0 24 24"', () => {
    const invalid = iconFiles.filter(file => {
      const content = fs.readFileSync(path.join(ICONS_DIR, file), 'utf-8');
      return !content.includes('viewBox="0 0 24 24"');
    });
    expect(invalid).toEqual([]);
  });

  it('all icons use fill="currentColor" for CSS color support', () => {
    const invalid = iconFiles.filter(file => {
      const content = fs.readFileSync(path.join(ICONS_DIR, file), 'utf-8');
      return !content.includes('fill="currentColor"');
    });
    expect(invalid).toEqual([]);
  });

  it('all icons declare width="24" and height="24"', () => {
    const invalid = iconFiles.filter(file => {
      const content = fs.readFileSync(path.join(ICONS_DIR, file), 'utf-8');
      return (
        !content.includes('width="24"') || !content.includes('height="24"')
      );
    });
    expect(invalid).toEqual([]);
  });

  it('all icons are valid SVG markup', () => {
    const invalid = iconFiles.filter(file => {
      const content = fs.readFileSync(path.join(ICONS_DIR, file), 'utf-8');
      return (
        !content.trimStart().startsWith('<svg') || !content.includes('</svg>')
      );
    });
    expect(invalid).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Icon name derivation logic (mirrors src/index.ts)
// ---------------------------------------------------------------------------
describe('Icon name derivation', () => {
  const getIconName = (filename: string): string => {
    const nameWithoutExt = filename.replace(/\.svg$/, '');
    return nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1);
  };

  const getIconFileName = (iconPath: string): string =>
    iconPath.split('/').pop()!;

  it('derives a capitalised name from a simple filename', () => {
    expect(getIconName('add.svg')).toBe('Add');
    expect(getIconName('close.svg')).toBe('Close');
    expect(getIconName('home.svg')).toBe('Home');
  });

  it('preserves hyphenated names', () => {
    expect(getIconName('chart-bar.svg')).toBe('Chart-bar');
    expect(getIconName('arrow-left.svg')).toBe('Arrow-left');
    expect(getIconName('status-critical.svg')).toBe('Status-critical');
  });

  it('preserves already-uppercase prefixes (e.g. AI-*)', () => {
    expect(getIconName('AI-gen.svg')).toBe('AI-gen');
    expect(getIconName('AI-systems.svg')).toBe('AI-systems');
    expect(getIconName('AI-gen-fill.svg')).toBe('AI-gen-fill');
  });

  it('extracts filename from a full path', () => {
    expect(getIconFileName('./icons/add.svg')).toBe('add.svg');
    expect(getIconFileName('./icons/AI-gen.svg')).toBe('AI-gen.svg');
  });

  it('all source icons produce unique exported names', () => {
    const iconFiles = fs.readdirSync(ICONS_DIR).filter(f => f.endsWith('.svg'));
    const names = iconFiles.map(f => getIconName(f));
    const unique = new Set(names);
    expect(names.length).toBe(unique.size);
  });
});
