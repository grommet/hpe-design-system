import { describe, expect, it } from 'vitest';

import {
  canonicalTokenPathSegments,
  colorNameToHierarchyPartsCore,
  normalizeColorVariableNameFromFigmaCore,
  normalizeRoleSegments,
  tokenAliasToFigmaAliasCore,
} from '../semantic_color_normalization.js';
import {
  normalizeColorVariableNameFromFigma,
  tokenAliasToFigmaAlias,
} from '../semantic_color_figma_adapter.js';
import { parseSemanticColorTokenMetadata } from '../semantic_color_parser.js';

describe('semantic_color_normalization', () => {
  it('canonicalizes incoming token path segments', () => {
    expect(
      canonicalTokenPathSegments(' {hpe.color.background.primary.strong} '),
    ).toEqual(['color', 'background', 'primary', 'strong']);
  });

  it('normalizes compact role segments from figma style names', () => {
    expect(
      normalizeRoleSegments('background', ['primary-strong-hover']),
    ).toEqual(['primary', 'strong', 'hover']);
    expect(
      normalizeRoleSegments('background', ['accent', 'purple-weak']),
    ).toEqual(['accent', 'purple', 'weak']);
  });

  it('expands accent figma names and preserves non-canonical tails', () => {
    expect(
      colorNameToHierarchyPartsCore('color/background/accent/purple-strong'),
    ).toEqual(['color', 'background', 'accent', 'purple', 'strong']);
    expect(
      colorNameToHierarchyPartsCore('color/background/accent/purple-custom'),
    ).toEqual(['color', 'background', 'accent', 'purple-custom']);
  });

  it('adds DEFAULT and REST when normalizing figma names', () => {
    expect(
      normalizeColorVariableNameFromFigmaCore(
        'color/background/primary-strong',
      ),
    ).toBe('color/background/primary/strong/REST');
    expect(
      normalizeColorVariableNameFromFigmaCore('color/background/back'),
    ).toBe('color/background/back/DEFAULT/REST');
  });

  it('converts canonical aliases back to figma aliases', () => {
    expect(
      tokenAliasToFigmaAliasCore('color/background/accent/purple/strong/REST'),
    ).toBe('color/background/accent/purple-strong');
    expect(tokenAliasToFigmaAliasCore('color/focus/support/DEFAULT/REST')).toBe(
      'color/focus-support',
    );
  });

  // eslint-disable-next-line max-len
  it('keeps adapter and parser aligned through shared normalization paths', () => {
    const fixtures = [
      {
        figmaName: 'color/background/accent/purple-strong-hover',
        canonicalAlias: 'color/background/accent/purple/strong/hover',
      },
      {
        figmaName: 'color/background/primary-strong-hover',
        canonicalAlias: 'color/background/primary/strong/hover',
      },
    ];

    fixtures.forEach(({ figmaName, canonicalAlias }) => {
      const normalizedByAdapter =
        normalizeColorVariableNameFromFigma(figmaName);
      const normalizedByCore =
        normalizeColorVariableNameFromFigmaCore(figmaName);

      expect(normalizedByAdapter).toBe(canonicalAlias);
      expect(normalizedByCore).toBe(canonicalAlias);

      const parsedFromAdapterPath =
        parseSemanticColorTokenMetadata(normalizedByAdapter);
      const parsedFromCanonicalPath =
        parseSemanticColorTokenMetadata(canonicalAlias);

      expect(parsedFromAdapterPath).toEqual(parsedFromCanonicalPath);

      const figmaAliasFromAdapter = tokenAliasToFigmaAlias(canonicalAlias);
      const figmaAliasFromCore = tokenAliasToFigmaAliasCore(canonicalAlias);

      expect(figmaAliasFromAdapter).toBe(figmaAliasFromCore);
      expect(normalizeColorVariableNameFromFigma(figmaAliasFromAdapter)).toBe(
        canonicalAlias,
      );
    });
  });
});
