import { describe, it, expect, vi } from 'vitest';

// structure.js has a deep module dependency chain that, when fully loaded, pulls
// in most of the application (examples, layouts, utils, etc.) and creates
// circular dependencies (search.js imports src/data/ at module-init time) and
// missing build artifacts (contentForSearch is generated at build time).
//
// To let structure.js load in a test environment we mock only the modules that
// create these problems, while leaving ../structure itself unmocked so the
// real exported `structure` array (names, pages, seoDescription, etc.) is what
// the tests actually validate.
vi.mock('../../components', () => ({
  IconCircle: () => null,
  IconDiamond: () => null,
  IconSquare: () => null,
  IconExtend: () => null,
  IconTriangle: () => null,
}));

vi.mock('../../examples', () => ({}));

vi.mock('../../utils/search', () => ({
  getSearchSuggestions: [],
  nameToSlug: (name: string) => name.toLowerCase().replace(/\s+/g, '-'),
  getPageDetails: () => undefined,
  getParentPage: () => undefined,
  getSectionParent: () => undefined,
  nameToPath: (name: string) => `/${name.toLowerCase()}`,
  getCards: () => [],
  getRelatedContent: () => [],
}));

import { structure } from '../structure';

type StructurePage = {
  name: string;
  pages?: string[];
  category?: string;
  seoDescription?: string;
};

const realStructure = structure as StructurePage[];

describe('Structure Data Validation', () => {
  describe('Schema Validation', () => {
    it('should have all required properties for each page', () => {
      realStructure.forEach((page, index) => {
        expect(page.name, `Page at index ${index} missing name`).toBeDefined();
        expect(typeof page.name).toBe('string');
        expect(page.name.length).toBeGreaterThan(0);
      });
    });

    it('should have valid optional properties', () => {
      realStructure.forEach(page => {
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
    it('should have no duplicate page names for non-reference pages', () => {
      // Pages with an `href` are cross-section reference links and are
      // intentionally allowed to share a name with a primary page entry.
      type PageWithHref = StructurePage & { href?: string };
      const primaryPages = (realStructure as PageWithHref[]).filter(
        p => !p.href,
      );
      const names = primaryPages.map(p => p.name);
      const uniqueNames = new Set(names);
      expect(
        names.length,
        `Duplicate primary page names: ${names
          .filter((n, i) => names.indexOf(n) !== i)
          .join(', ')}`,
      ).toBe(uniqueNames.size);
    });

    it('should have valid parent/child relationships', () => {
      const allNames = new Set(realStructure.map(p => p.name));
      realStructure.forEach(page => {
        if (page.pages && page.pages.length > 0) {
          page.pages.forEach((childName: string) => {
            expect(typeof childName).toBe('string');
            expect(childName.length).toBeGreaterThan(0);
            expect(
              allNames.has(childName),
              `"${page.name}" references child "${childName}" which does not exist in structure`,
            ).toBe(true);
          });
        }
      });
    });

    it('should have descriptions for all searchable pages', () => {
      type PageWithSearchable = StructurePage & { searchable?: boolean };
      // Pages explicitly marked searchable: false are not SEO-indexed
      // so they do not require a seoDescription.
      const searchablePages = (realStructure as PageWithSearchable[]).filter(
        p => p.searchable !== false,
      );
      searchablePages.forEach(page => {
        expect(
          page.seoDescription,
          `"${page.name}" missing seoDescription`,
        ).toBeDefined();
        expect(page.seoDescription?.length).toBeGreaterThan(0);
      });
    });

    it('should have consistent category information when present', () => {
      realStructure.forEach(page => {
        if (page.category) {
          expect(typeof page.category).toBe('string');
          expect(page.category.length).toBeGreaterThan(0);
        }
      });
    });

    it('should have pages array for hub pages', () => {
      const hubPages = realStructure.filter(p => p.pages);
      expect(hubPages.length).toBeGreaterThan(0);

      hubPages.forEach(hub => {
        expect(Array.isArray(hub.pages)).toBe(true);
        expect(hub.pages?.length).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('Navigation Consistency', () => {
    it('Home should reference all major sections', () => {
      const home = realStructure.find(p => p.name === 'Home');
      expect(home?.pages?.length).toBeGreaterThan(0);
    });

    it('all hub pages should have consistent structure', () => {
      const hubPages = ['Foundation', 'Components', 'Templates'];

      hubPages.forEach(hubName => {
        const hub = realStructure.find(p => p.name === hubName);
        expect(hub).toBeDefined();
        expect(hub?.seoDescription).toBeDefined();
        expect(hub?.pages).toBeDefined();
      });
    });
  });

  describe('No Circular References', () => {
    it('should not have pages referencing their parents', () => {
      realStructure.forEach(parent => {
        if (parent.pages) {
          parent.pages.forEach((childName: string) => {
            const child = realStructure.find(p => p.name === childName);
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
