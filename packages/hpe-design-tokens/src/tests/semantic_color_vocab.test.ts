import fs from 'fs';
import { describe, expect, it } from 'vitest';

import {
  SEMANTIC_COLOR_ROLE_FAMILIES_BY_TARGET,
  SEMANTIC_COLOR_ROLE_VARIANTS,
  SEMANTIC_COLOR_SCALES,
  SEMANTIC_COLOR_STATES,
  SEMANTIC_COLOR_TARGETS,
} from '../semantic_color_vocab.js';

describe('semantic_color_vocab', () => {
  it('matches current semantic color target inventory', () => {
    const source = JSON.parse(
      fs.readFileSync('./tokens/semantic/color.dark.json', 'utf8'),
    ) as { color: Record<string, unknown> };

    const targetKeys = Object.keys(source.color).sort();
    expect(targetKeys).toEqual([...SEMANTIC_COLOR_TARGETS].sort());
  });

  it('contains canonical scale and state vocabularies', () => {
    expect(SEMANTIC_COLOR_SCALES).toEqual([
      'xweak',
      'weak',
      'default',
      'strong',
      'xstrong',
    ]);
    expect(SEMANTIC_COLOR_STATES).toEqual(['REST', 'hover', 'focus', 'active']);
  });

  it('covers all role families currently in color.dark.json', () => {
    const source = JSON.parse(
      fs.readFileSync('./tokens/semantic/color.dark.json', 'utf8'),
    ) as { color: Record<string, unknown> };

    Object.entries(source.color).forEach(([target, roleTree]) => {
      if (!roleTree || typeof roleTree !== 'object') {
        return;
      }

      const roleKeys = Object.keys(roleTree).filter(k => !k.startsWith('$'));
      const canonical =
        SEMANTIC_COLOR_ROLE_FAMILIES_BY_TARGET[
          target as keyof typeof SEMANTIC_COLOR_ROLE_FAMILIES_BY_TARGET
        ];

      expect(new Set(roleKeys).size).toBe(roleKeys.length);
      roleKeys.forEach(role => {
        if (target === 'transparent') {
          return;
        }

        expect(canonical).toContain(role);
      });
    });
  });

  it('keeps known multi-slot role variants explicit', () => {
    expect(SEMANTIC_COLOR_ROLE_VARIANTS.background.selected).toEqual([
      'primary',
    ]);
    expect(SEMANTIC_COLOR_ROLE_VARIANTS.dataVis.categorical).toEqual([
      '10',
      '20',
      '30',
      '40',
      '50',
      '60',
      '70',
      '80',
    ]);
  });
});
