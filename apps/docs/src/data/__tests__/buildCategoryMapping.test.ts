import { describe, it, expect } from 'vitest';
import {
  buildCategoryMapping,
  getCategoryWeights,
} from '../buildCategoryMapping';

// Test with mock structure data to avoid circular dependencies
const mockStructure = [
  {
    name: 'Foundation',
    pages: ['Philosophy Item', 'Assets Item 1', 'Assets Item 2', 'Layout Item'],
  },
  { name: 'Philosophy Item', category: 'Philosophy' },
  { name: 'Assets Item 1', category: 'Assets' },
  { name: 'Assets Item 2', category: 'Assets' },
  { name: 'Layout Item', category: 'Layout' },
  {
    name: 'Components',
    pages: ['Button', 'Card', 'Input', 'Chart', 'Grid'],
  },
  { name: 'Button', category: 'Controls' },
  { name: 'Card', category: 'Layouts' },
  { name: 'Input', category: 'Inputs' },
  { name: 'Chart', category: 'Visualizations' },
  { name: 'Grid', category: 'Data' },
];

describe('buildCategoryMapping', () => {
  it('should generate category mappings from structure data', () => {
    const mappings = buildCategoryMapping(mockStructure);
    expect(mappings).toBeDefined();
    expect(typeof mappings).toBe('object');
  });

  it('should generate mappings only for hub pages with categorized children', () => {
    const mappings = buildCategoryMapping(mockStructure);
    // Should have mappings for Foundation and Components
    expect(Object.keys(mappings).length).toBeGreaterThan(0);
    expect(mappings['Foundation']).toBeDefined();
    expect(mappings['Components']).toBeDefined();
  });

  describe('Foundation category weights', () => {
    it('should generate weights for Foundation hub page', () => {
      const weights = getCategoryWeights(mockStructure, 'Foundation');
      expect(weights).toBeDefined();
      expect(Object.keys(weights).length).toBeGreaterThan(0);
    });

    it('should maintain category weight consistency', () => {
      const weights = getCategoryWeights(mockStructure, 'Foundation');
      // All weights should be non-negative integers
      Object.values(weights).forEach(weight => {
        expect(typeof weight).toBe('number');
        expect(weight).toBeGreaterThanOrEqual(0);
        expect(Number.isInteger(weight)).toBe(true);
      });
    });

    it('should assign weights in order of first appearance', () => {
      const weights = getCategoryWeights(mockStructure, 'Foundation');
      // Philosophy appears first, Assets second, Layout third
      expect(weights['Philosophy']).toBe(0);
      expect(weights['Assets']).toBe(1);
      expect(weights['Layout']).toBe(2);
    });

    it('should include all unique categories from Foundation pages', () => {
      const weights = getCategoryWeights(mockStructure, 'Foundation');
      expect(Object.keys(weights)).toContain('Philosophy');
      expect(Object.keys(weights)).toContain('Assets');
      expect(Object.keys(weights)).toContain('Layout');
    });
  });

  describe('Components category weights', () => {
    it('should generate weights for Components hub page', () => {
      const weights = getCategoryWeights(mockStructure, 'Components');
      expect(weights).toBeDefined();
      expect(Object.keys(weights).length).toBeGreaterThan(0);
    });

    it('should assign weights based on first appearance', () => {
      const weights = getCategoryWeights(mockStructure, 'Components');
      expect(weights['Controls']).toBe(0);
      expect(weights['Layouts']).toBe(1);
      expect(weights['Inputs']).toBe(2);
      expect(weights['Visualizations']).toBe(3);
      expect(weights['Data']).toBe(4);
    });
  });

  it('should return empty object for non-existent hub pages', () => {
    const weights = getCategoryWeights(mockStructure, 'NonExistent');
    expect(weights).toEqual({});
  });

  describe('consistency across multiple calls', () => {
    it('should return consistent results on multiple invocations', () => {
      const mappings1 = buildCategoryMapping(mockStructure);
      const mappings2 = buildCategoryMapping(mockStructure);

      expect(JSON.stringify(mappings1)).toBe(JSON.stringify(mappings2));
    });
  });

  describe('backward compatibility', () => {
    it('should generate correct weights matching hardcoded requirements', () => {
      const weights = getCategoryWeights(mockStructure, 'Foundation');
      // Verify Philosophy comes before Assets (based on original { Assets: 1, Philosophy: 0 })
      expect(weights['Philosophy']).toBeLessThan(weights['Assets']);
    });
  });
});
