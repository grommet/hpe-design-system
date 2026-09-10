// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
/* eslint-disable max-len */
import { describe, expect, it } from 'vitest';

import {
  normalizeColorVariableNameFromFigma,
  tokenAliasToFigmaAlias,
} from '../semantic_color_figma_adapter.js';

describe('semantic_color_figma_adapter', () => {
  it('normalizes accent background names with prominence and REST state', () => {
    expect(
      normalizeColorVariableNameFromFigma(
        'color/background/accent/purple-strong',
      ),
    ).toBe('color/background/accent/purple/strong/REST');
  });

  it('normalizes accent background names with prominence and interaction', () => {
    expect(
      normalizeColorVariableNameFromFigma(
        'color/background/accent/purple-strong-hover',
      ),
    ).toBe('color/background/accent/purple/strong/hover');
  });

  it('normalizes accent names missing prominence to DEFAULT', () => {
    expect(
      normalizeColorVariableNameFromFigma('color/background/accent/purple'),
    ).toBe('color/background/accent/purple/DEFAULT/REST');
  });

  it('keeps focus support and transparent exception colors stable', () => {
    expect(normalizeColorVariableNameFromFigma('color/focus/support')).toBe(
      'color/focus/support',
    );
    expect(normalizeColorVariableNameFromFigma('color/transparent')).toBe(
      'color/transparent',
    );
  });

  it('converts canonical aliases back to figma naming', () => {
    expect(
      tokenAliasToFigmaAlias('color/background/accent/purple/strong/REST'),
    ).toBe('color/background/accent/purple-strong');
    expect(tokenAliasToFigmaAlias('color/focus/support/DEFAULT/REST')).toBe(
      'color/focus-support',
    );
  });

  it('keeps non-canonical accent aliases stable at adapter boundary', () => {
    expect(
      tokenAliasToFigmaAlias('color/background/accent/purple/custom/REST'),
    ).toBe('color/background/accent/purple-custom');
    expect(
      tokenAliasToFigmaAlias(
        'color/background/accent/purple/DEFAULT/custom-state',
      ),
    ).toBe('color/background/accent/purple-custom-state');
  });

  it('normalizes non-canonical accent variable names without throwing', () => {
    expect(
      normalizeColorVariableNameFromFigma(
        'color/background/accent/purple-custom',
      ),
    ).toBe('color/background/accent/purple-custom/DEFAULT/REST');
  });
});
