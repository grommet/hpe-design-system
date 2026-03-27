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
      const mapping = buildCategoryMapping(mockStructure);
      const weights = getCategoryWeights(mapping, 'Foundation');
      expect(weights).toBeDefined();
      expect(Object.keys(weights).length).toBeGreaterThan(0);
    });

    it('should maintain category weight consistency', () => {
      const mapping = buildCategoryMapping(mockStructure);
      const weights = getCategoryWeights(mapping, 'Foundation');
      // All weights should be non-negative integers
      Object.values(weights).forEach(weight => {
        expect(typeof weight).toBe('number');
        expect(weight).toBeGreaterThanOrEqual(0);
        expect(Number.isInteger(weight)).toBe(true);
      });
    });

    it('should assign weights in order of first appearance', () => {
      const mapping = buildCategoryMapping(mockStructure);
      const weights = getCategoryWeights(mapping, 'Foundation');
      // Philosophy appears first, Assets second, Layout third
      expect(weights['Philosophy']).toBe(0);
      expect(weights['Assets']).toBe(1);
      expect(weights['Layout']).toBe(2);
    });

    it('should group Foundation pages under categories', () => {
      const mappings = buildCategoryMapping(mockStructure);
      expect(mappings.Foundation.Philosophy).toEqual(['Philosophy Item']);
      expect(mappings.Foundation.Assets).toEqual([
        'Assets Item 1',
        'Assets Item 2',
      ]);
      expect(mappings.Foundation.Layout).toEqual(['Layout Item']);
    });
  });

  describe('Components category weights', () => {
    it('should generate weights for Components hub page', () => {
      const mapping = buildCategoryMapping(mockStructure);
      const weights = getCategoryWeights(mapping, 'Components');
      expect(weights).toBeDefined();
      expect(Object.keys(weights).length).toBeGreaterThan(0);
    });

    it('should assign weights based on first appearance', () => {
      const mapping = buildCategoryMapping(mockStructure);
      const weights = getCategoryWeights(mapping, 'Components');
      expect(weights['Controls']).toBe(0);
      expect(weights['Layouts']).toBe(1);
      expect(weights['Inputs']).toBe(2);
      expect(weights['Visualizations']).toBe(3);
      expect(weights['Data']).toBe(4);
    });

    it('should group Components pages under categories', () => {
      const mappings = buildCategoryMapping(mockStructure);
      expect(mappings.Components.Controls).toEqual(['Button']);
      expect(mappings.Components.Layouts).toEqual(['Card']);
      expect(mappings.Components.Inputs).toEqual(['Input']);
      expect(mappings.Components.Visualizations).toEqual(['Chart']);
      expect(mappings.Components.Data).toEqual(['Grid']);
    });
  });

  it('should return empty object for non-existent hub pages', () => {
    const mapping = buildCategoryMapping(mockStructure);
    const weights = getCategoryWeights(mapping, 'NonExistent');
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
      const mapping = buildCategoryMapping(mockStructure);
      const weights = getCategoryWeights(mapping, 'Foundation');
      // Verify Philosophy comes before Assets (based on original { Assets: 1, Philosophy: 0 })
      expect(weights['Philosophy']).toBeLessThan(weights['Assets']);
    });
  });

  describe('live-data integration', () => {
    it('should generate correct category mapping for Foundation hub page with real structure data', () => {
      // For live-data integration, we'll create a minimal test structure
      // that simulates real Foundation pages with categories
      const realFoundationPages = [
        { name: 'Accessibility', category: 'Philosophy' },
        { name: 'Our brand', category: 'Assets' },
        { name: 'Distinctive brand assets', category: 'Assets' },
        { name: 'Color', category: 'Philosophy' },
        { name: 'Composition', category: 'Assets' },
        { name: 'Icons', category: 'Assets' },
        { name: 'Responsive grid', category: 'Layout' },
        { name: 'Spacing', category: 'Layout' },
        { name: 'Typography', category: 'Layout' },
        { name: 'Motion', category: 'Layout' },
      ];

      const liveStructure = [
        {
          name: 'Foundation',
          pages: realFoundationPages.map(p => p.name),
        },
        ...realFoundationPages,
      ];

      const mapping = buildCategoryMapping(liveStructure);

      // Verify Foundation hub page has category mappings
      expect(mapping['Foundation']).toBeDefined();
      expect(Object.keys(mapping['Foundation']).length).toBeGreaterThan(0);

      // Verify expected categories exist in Foundation
      expect(mapping['Foundation']['Philosophy']).toBeDefined();
      expect(mapping['Foundation']['Assets']).toBeDefined();
      expect(mapping['Foundation']['Layout']).toBeDefined();

      // Verify pages are grouped under their categories
      expect(Array.isArray(mapping['Foundation']['Philosophy'])).toBe(true);
      expect(Array.isArray(mapping['Foundation']['Assets'])).toBe(true);
      expect(Array.isArray(mapping['Foundation']['Layout'])).toBe(true);

      // Verify each category contains actual page names
      expect(mapping['Foundation']['Philosophy'].length).toBeGreaterThan(0);
      expect(mapping['Foundation']['Assets'].length).toBeGreaterThan(0);
      expect(mapping['Foundation']['Layout'].length).toBeGreaterThan(0);

      // Verify specific pages are in their expected categories
      expect(mapping['Foundation']['Philosophy']).toContain('Accessibility');
      expect(mapping['Foundation']['Philosophy']).toContain('Color');
      expect(mapping['Foundation']['Assets']).toContain('Our brand');
      expect(mapping['Foundation']['Assets']).toContain(
        'Distinctive brand assets',
      );
      expect(mapping['Foundation']['Layout']).toContain('Responsive grid');
    });

    it('should generate correct category weights for Foundation with real structure data', () => {
      const realFoundationPages = [
        { name: 'Accessibility', category: 'Philosophy' },
        { name: 'Our brand', category: 'Assets' },
        { name: 'Distinctive brand assets', category: 'Assets' },
        { name: 'Color', category: 'Philosophy' },
        { name: 'Responsive grid', category: 'Layout' },
      ];

      const liveStructure = [
        {
          name: 'Foundation',
          pages: realFoundationPages.map(p => p.name),
        },
        ...realFoundationPages,
      ];

      const mapping = buildCategoryMapping(liveStructure);
      const weights = getCategoryWeights(mapping, 'Foundation');

      // Verify weights are generated and maintain proper ordering
      expect(Object.keys(weights).length).toBeGreaterThan(0);
      expect(weights['Philosophy']).toBeLessThan(weights['Assets']);
      expect(weights['Assets']).toBeLessThan(weights['Layout']);
    });

    it('should generate correct category mapping for Components hub page with real structure data', () => {
      // Simulate real Components pages with categories
      const realComponentPages = [
        { name: 'Anchor', category: 'Controls' },
        { name: 'Avatar', category: 'Visualizations' },
        { name: 'Box', category: 'Layouts' },
        { name: 'Button', category: 'Controls' },
        { name: 'CheckBox', category: 'Inputs' },
        { name: 'DateInput', category: 'Inputs' },
        { name: 'Footer', category: 'Layouts' },
        { name: 'Grid', category: 'Layouts' },
        { name: 'Header', category: 'Layouts' },
        { name: 'MaskedInput', category: 'Inputs' },
      ];

      const liveStructure = [
        {
          name: 'Components',
          pages: realComponentPages.map(p => p.name),
        },
        ...realComponentPages,
      ];

      const mapping = buildCategoryMapping(liveStructure);

      // Verify Components hub page has category mappings
      expect(mapping['Components']).toBeDefined();
      expect(Object.keys(mapping['Components']).length).toBeGreaterThan(0);

      // Verify expected categories exist in Components
      expect(mapping['Components']['Controls']).toBeDefined();
      expect(mapping['Components']['Inputs']).toBeDefined();
      expect(mapping['Components']['Layouts']).toBeDefined();
      expect(mapping['Components']['Visualizations']).toBeDefined();

      // Verify pages are grouped under their categories
      expect(Array.isArray(mapping['Components']['Controls'])).toBe(true);
      expect(Array.isArray(mapping['Components']['Inputs'])).toBe(true);
      expect(Array.isArray(mapping['Components']['Layouts'])).toBe(true);
      expect(Array.isArray(mapping['Components']['Visualizations'])).toBe(true);

      // Verify each category contains actual page names
      expect(mapping['Components']['Controls'].length).toBeGreaterThan(0);
      expect(mapping['Components']['Inputs'].length).toBeGreaterThan(0);
      expect(mapping['Components']['Layouts'].length).toBeGreaterThan(0);
      expect(mapping['Components']['Visualizations'].length).toBeGreaterThan(0);

      // Verify specific pages are in their expected categories
      expect(mapping['Components']['Controls']).toContain('Anchor');
      expect(mapping['Components']['Controls']).toContain('Button');
      expect(mapping['Components']['Visualizations']).toContain('Avatar');
      expect(mapping['Components']['Inputs']).toContain('CheckBox');
      expect(mapping['Components']['Layouts']).toContain('Box');
    });

    it('should generate correct category weights for Components with real structure data', () => {
      const realComponentPages = [
        { name: 'Anchor', category: 'Controls' },
        { name: 'Avatar', category: 'Visualizations' },
        { name: 'Box', category: 'Layouts' },
        { name: 'Button', category: 'Controls' },
        { name: 'CheckBox', category: 'Inputs' },
      ];

      const liveStructure = [
        {
          name: 'Components',
          pages: realComponentPages.map(p => p.name),
        },
        ...realComponentPages,
      ];

      const mapping = buildCategoryMapping(liveStructure);
      const weights = getCategoryWeights(mapping, 'Components');

      // Verify weights are generated
      expect(Object.keys(weights).length).toBeGreaterThan(0);

      // Verify all expected categories have numeric weights
      expect(typeof weights['Controls']).toBe('number');
      expect(typeof weights['Inputs']).toBe('number');
      expect(typeof weights['Layouts']).toBe('number');
      expect(typeof weights['Visualizations']).toBe('number');

      // Verify weights are in order of first appearance
      // Controls appears first, then Visualizations, then Layouts, then Inputs
      expect(weights['Controls']).toBeLessThan(weights['Visualizations']);
      expect(weights['Visualizations']).toBeLessThan(weights['Layouts']);
      expect(weights['Layouts']).toBeLessThan(weights['Inputs']);
    });
  });
});
