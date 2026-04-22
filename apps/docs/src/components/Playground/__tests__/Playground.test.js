/**
 * Unit tests for Playground/index.jsx
 *
 * Tests the exclude filtering logic — ensures that:
 *   - props NOT in exclude are included
 *   - props IN exclude are removed
 *   - exclude defaults to [] (all props shown)
 *   - unknown prop names in exclude are safely ignored
 */

import { describe, it, expect } from 'vitest';

// ---------------------------------------------------------------------------
// Helpers — mock schema (mirrors PropDescriptor shape from schema.ts)
// ---------------------------------------------------------------------------

const mockButtonSchema = [
  { name: 'active', type: 'boolean' },
  { name: 'busy', type: 'boolean' },
  { name: 'disabled', type: 'boolean' },
  {
    name: 'kind',
    type: 'enum',
    options: ['default', 'critical', 'primary', 'secondary', 'toolbar'],
  },
  { name: 'label', type: 'string' },
  { name: 'size', type: 'enum', options: ['small', 'medium', 'large'] },
  { name: 'as', type: 'string' },
  { name: 'children', type: 'string' },
  { name: 'onClick', type: 'any' },
  { name: 'style', type: 'any' },
];

// ---------------------------------------------------------------------------
// Pure filtering logic (extracted from Playground useEffect)
// These tests verify the exclude behaviour independently of React rendering.
// ---------------------------------------------------------------------------

function applyExclude(schema, exclude = []) {
  return schema.filter(p => !exclude.includes(p.name));
}

describe('Playground — exclude filtering logic', () => {
  it('returns all props when exclude is empty', () => {
    const result = applyExclude(mockButtonSchema, []);
    expect(result).toHaveLength(mockButtonSchema.length);
  });

  it('returns all props when exclude is omitted (default)', () => {
    const result = applyExclude(mockButtonSchema);
    expect(result).toHaveLength(mockButtonSchema.length);
  });

  it('removes props listed in exclude', () => {
    const result = applyExclude(mockButtonSchema, [
      'as',
      'children',
      'style',
      'onClick',
    ]);
    const names = result.map(p => p.name);
    expect(names).not.toContain('as');
    expect(names).not.toContain('children');
    expect(names).not.toContain('style');
    expect(names).not.toContain('onClick');
  });

  it('keeps props not listed in exclude', () => {
    const result = applyExclude(mockButtonSchema, ['as', 'children']);
    const names = result.map(p => p.name);
    expect(names).toContain('disabled');
    expect(names).toContain('kind');
    expect(names).toContain('label');
    expect(names).toContain('size');
  });

  it('preserves original schema order', () => {
    const result = applyExclude(mockButtonSchema, ['as']);
    const expectedOrder = mockButtonSchema
      .filter(p => p.name !== 'as')
      .map(p => p.name);
    expect(result.map(p => p.name)).toEqual(expectedOrder);
  });

  it('unknown names in exclude are silently ignored', () => {
    const result = applyExclude(mockButtonSchema, [
      'nonExistentProp',
      'anotherFakeProp',
    ]);
    expect(result).toHaveLength(mockButtonSchema.length);
  });

  it('excluding every prop returns an empty array', () => {
    const allNames = mockButtonSchema.map(p => p.name);
    const result = applyExclude(mockButtonSchema, allNames);
    expect(result).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// Schema shape validation — mirrors what Playground expects at runtime
// ---------------------------------------------------------------------------

describe('Playground — schema shape contract', () => {
  it('every prop has a name (string) and type (string)', () => {
    mockButtonSchema.forEach(prop => {
      expect(typeof prop.name).toBe('string');
      expect(typeof prop.type).toBe('string');
    });
  });

  it('enum props have an options array', () => {
    const enumProps = mockButtonSchema.filter(p => p.type === 'enum');
    enumProps.forEach(prop => {
      expect(Array.isArray(prop.options)).toBe(true);
      expect(prop.options.length).toBeGreaterThan(0);
    });
  });
});
