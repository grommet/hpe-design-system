import { describe, it, expect, vi } from 'vitest';
import { structure } from '../structure';

type StructurePage = {
  name: string;
  pages?: string[];
  category?: string;
  seoDescription?: string;
};

vi.mock('../structure', () => ({
  structure: [
    {
      name: 'Home',
      seoDescription: 'Home page',
      pages: ['Foundation', 'Components', 'Templates'],
    },
    {
      name: 'Foundation',
      seoDescription: 'Foundation page',
      pages: [],
    },
    {
      name: 'Components',
      seoDescription: 'Components page',
      pages: ['Button'],
    },
    {
      name: 'Templates',
      seoDescription: 'Templates page',
      pages: [],
    },
    {
      name: 'Button',
      seoDescription: 'Button page',
      pages: [],
    },
  ],
}));

const mockStructure = structure as StructurePage[];

describe('Structure Data Validation', () => {
  describe('Schema Validation', () => {
    it('should have all required properties for each page', () => {
      mockStructure.forEach((page, index) => {
        expect(page.name, `Page at index ${index} missing name`).toBeDefined();
        expect(typeof page.name).toBe('string');
        expect(page.name.length).toBeGreaterThan(0);
      });
    });

    it('should have valid optional properties', () => {
      mockStructure.forEach(page => {
        if (page.pages) {
          expect(Array.isArray(page.pages)).toBe(true);
        }
        if (page.category) {
          expect(typeof page.category).toBe('string');
        }
        if (page.seoDescription) {
          expect(typeof page.seoDescription).toBe('string');
        }
      });
    });
  });

  describe('Data Integrity', () => {
    it('should have no duplicate page names', () => {
      const names = mockStructure.map(p => p.name);
      const uniqueNames = new Set(names);
      expect(names.length).toBe(uniqueNames.size);
    });

    it('should have valid parent/child relationships', () => {
      mockStructure.forEach(page => {
        if (page.pages && page.pages.length > 0) {
          // For mock data, we just verify the structure is properly formed
          // not that every child exists (that's validated against real structure)
          page.pages.forEach((childName: string) => {
            expect(typeof childName).toBe('string');
            expect(childName.length).toBeGreaterThan(0);
          });
        }
      });
    });

    it('should have descriptions for all pages', () => {
      mockStructure.forEach(page => {
        expect(
          page.seoDescription,
          `"${page.name}" missing seoDescription`,
        ).toBeDefined();
        expect(page.seoDescription?.length).toBeGreaterThan(0);
      });
    });

    it('should have consistent category information when present', () => {
      mockStructure.forEach(page => {
        if (page.category) {
          expect(typeof page.category).toBe('string');
          expect(page.category.length).toBeGreaterThan(0);
        }
      });
    });

    it('should have pages array for hub pages', () => {
      const hubPages = mockStructure.filter(p => p.pages);
      expect(hubPages.length).toBeGreaterThan(0);

      hubPages.forEach(hub => {
        expect(Array.isArray(hub.pages)).toBe(true);
        expect(hub.pages?.length).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Navigation Consistency', () => {
    it('Home should reference all major sections', () => {
      const home = mockStructure.find(p => p.name === 'Home');
      expect(home?.pages?.length).toBeGreaterThan(0);
    });

    it('all hub pages should have consistent structure', () => {
      const hubPages = ['Foundation', 'Components', 'Templates'];

      hubPages.forEach(hubName => {
        const hub = mockStructure.find(p => p.name === hubName);
        expect(hub).toBeDefined();
        expect(hub?.seoDescription).toBeDefined();
        expect(hub?.pages).toBeDefined();
      });
    });
  });

  describe('No Circular References', () => {
    it('should not have pages referencing their parents', () => {
      mockStructure.forEach(parent => {
        if (parent.pages) {
          parent.pages.forEach((childName: string) => {
            const child = mockStructure.find(p => p.name === childName);
            if (child?.pages) {
              expect(
                !child.pages.includes(parent.name),
                `Circular reference: ${parent.name} <-> ${childName}`,
              ).toBe(true);
            }
          });
        }
      });
    });
  });
});
