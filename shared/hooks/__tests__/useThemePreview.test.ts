import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { buildThemePreview, useThemePreview } from '../src/useThemePreview';

describe('buildThemePreview', () => {
  it('builds a theme using default options', () => {
    const result = buildThemePreview();

    expect(result.theme).toBeDefined();
    expect(result.options['v6-backwards-compatibility']).toBe(false);
    expect(result.tokens.large).toBeDefined();
  });

  it('supports deep token overrides without replacing sibling branches', () => {
    const base = buildThemePreview();
    const overridden = buildThemePreview({
      tokenOverrides: {
        global: {
          hpe: {
            focusIndicator: {
              outline: {
                color: 'brand',
              },
            },
          },
        },
      },
    });

    expect(overridden.tokens.global.hpe.focusIndicator.outline.color).toBe(
      'brand',
    );
    expect(overridden.tokens.global.hpe.fontWeight).toEqual(
      base.tokens.global.hpe.fontWeight,
    );
  });
});

describe('useThemePreview', () => {
  it('returns theme, tokens, and resolved options', () => {
    const { result } = renderHook(() => useThemePreview());

    expect(result.current.theme).toBeDefined();
    expect(result.current.tokens).toBeDefined();
    expect(result.current.options['v6-backwards-compatibility']).toBe(false);
  });
});
