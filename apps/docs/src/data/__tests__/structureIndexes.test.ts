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
] as any[];

describe('buildStructureIndexes', () => {
  it('prefers the primary non-href page in byName lookups', () => {
    const indexes = buildStructureIndexes(mockStructure, buildCategoryMapping(mockStructure));
    expect(indexes.byNameLookup.card.href).toBeUndefined();
  });

  it('builds parent and section lookup maps', () => {
    const indexes = buildStructureIndexes(mockStructure, buildCategoryMapping(mockStructure));

    expect(indexes.parentByChild.Button?.name).toBe('Components');
    expect(indexes.bySection.Accessibility?.name).toBe('Card');
  });

  it('builds grouped categories by parent hub', () => {
    const indexes = buildStructureIndexes(mockStructure, buildCategoryMapping(mockStructure));

    expect(indexes.byCategory.Components?.Controls?.map(page => page.name)).toEqual([
      'Button',
    ]);
    expect(indexes.byCategory.Components?.Layouts?.map(page => page.name)).toEqual([
      'Card',
    ]);
  });
});
