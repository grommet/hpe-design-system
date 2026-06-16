import { describe, expect, it } from 'vitest';
import { buildCategoryMapping } from '../buildCategoryMapping';
import { buildStructureIndexes } from '../structureIndexes';

const mockStructure = [
  {
    name: 'Home',
    pages: ['Components', 'Foundation'],
  },
  {
    name: 'Components',
    pages: ['Button', 'Card'],
  },
  {
    name: 'Button',
    category: 'Controls',
  },
  {
    name: 'Card',
    category: 'Layouts',
    sections: ['Accessibility'],
  },
  {
    name: 'Card',
    href: '/foundation/card',
  },
  {
    name: 'Foundation',
    pages: [],
  },
// eslint-disable-next-line @typescript-eslint/no-explicit-any
] as any[];

describe('buildStructureIndexes', () => {
  it('prefers the primary non-href page in byName lookups', () => {
    // eslint-disable-next-line max-len
    const indexes = buildStructureIndexes(mockStructure, buildCategoryMapping(mockStructure));
    expect(indexes.byNameLookup.card.href).toBeUndefined();
  });

  it('builds parent and section lookup maps', () => {
    // eslint-disable-next-line max-len
    const indexes = buildStructureIndexes(mockStructure, buildCategoryMapping(mockStructure));

    expect(indexes.parentByChild.Button?.name).toBe('Components');
    expect(indexes.bySection.Accessibility?.name).toBe('Card');
  });

  it('builds grouped categories by parent hub', () => {
    // eslint-disable-next-line max-len
    const indexes = buildStructureIndexes(mockStructure, buildCategoryMapping(mockStructure));

    // eslint-disable-next-line max-len
    expect(indexes.byCategory.Components?.Controls?.map(page => page.name)).toEqual([
      'Button',
    ]);
    // eslint-disable-next-line max-len
    expect(indexes.byCategory.Components?.Layouts?.map(page => page.name)).toEqual([
      'Card',
    ]);
  });
});
