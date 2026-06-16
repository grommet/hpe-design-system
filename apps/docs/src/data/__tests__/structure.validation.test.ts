import { describe, it, expect, vi } from 'vitest';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

import { categoryMapping, structure } from '../structure';
import { nameToSlug } from '../structureIndexes';
import {
  ALLOWED_CATEGORIES,
  validateStructureData,
} from '../structureValidation';
import { nameToPath } from '../../utils/search';

// Importing ../structure pulls in React components and other heavier modules
// that are not needed for these schema-validation tests and can make the test
// environment harder to configure (e.g. requiring DOM/rendering setup or
// build-time data).
//
// To keep the tests fast and focused on the data shape, we mock just the
// problematic dependencies while leaving ../structure itself unmocked so the
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

type StructurePage = {
  name: string;
  pages?: string[];
  category?: string;
  relatedContent?: string[];
  seoDescription?: string;
  href?: string;
  url?: string;
};

const realStructure = structure as StructurePage[];

const PAGE_EXTENSIONS = new Set(['.js', '.jsx', '.md', '.mdx', '.ts', '.tsx']);
const ROUTE_EXCLUSIONS = new Set(['404', '500', '_app', '_document', '_error']);
// Only include routes that are intentionally data-only or redirect-only.
// Do not add entries for missing content routes; create page files instead.
const STRUCTURE_ROUTE_FILE_ALLOWLIST = new Set<string>(['/show-more']);

const toRoutePath = (relativePath: string) => {
  const segments = relativePath.split(path.sep);
  const fileName = segments[segments.length - 1];
  const extension = path.extname(fileName);
  const pageName = fileName.replace(extension, '');

  if (!PAGE_EXTENSIONS.has(extension)) return undefined;
  if (ROUTE_EXCLUSIONS.has(pageName) || pageName.startsWith('_'))
    return undefined;

  const routeSegments = [...segments.slice(0, -1)];
  if (pageName !== 'index') routeSegments.push(pageName);

  const joined = routeSegments.join('/');
  return `/${joined}`.replace(/\/+/g, '/').toLowerCase();
};

const getPageRoutes = async (dirPath: string): Promise<string[]> => {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const routes: string[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const entry of entries) {
    const absolutePath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      // eslint-disable-next-line no-await-in-loop
      const nestedRoutes = await getPageRoutes(absolutePath);
      routes.push(...nestedRoutes);
      // eslint-disable-next-line no-continue
      continue;
    }

    const relativePath = path.relative(
      path.resolve(process.cwd(), 'src/pages'),
      absolutePath,
    );
    const route = toRoutePath(relativePath);
    if (route) routes.push(route);
  }

  return routes;
};

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
              // eslint-disable-next-line max-len
              `"${page.name}" references child "${childName}" which does not exist in structure`,
            ).toBe(true);
          });
        }
      });
    });

    it('should have unique slugs for primary pages', () => {
      const slugCandidates = (realStructure as StructurePage[]).filter(
        page => !page.href && !page.url,
      );
      const slugs = slugCandidates.map(page => nameToSlug(page.name));
      const uniqueSlugs = new Set(slugs);
      expect(slugs.length).toBe(uniqueSlugs.size);
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

    it('should use allowed category vocabulary', () => {
      realStructure.forEach(page => {
        if (page.category) {
          expect(
            ALLOWED_CATEGORIES.has(page.category),
            `Invalid category "${page.category}" on "${page.name}"`,
          ).toBe(true);
        }
      });
    });

    it('should have valid relatedContent references when present', () => {
      const allNames = new Set(realStructure.map(page => page.name));

      realStructure.forEach(page => {
        if (Array.isArray(page.relatedContent)) {
          page.relatedContent.forEach(relatedPageName => {
            expect(
              allNames.has(relatedPageName),
              // eslint-disable-next-line max-len
              `Missing relatedContent "${relatedPageName}" referenced by "${page.name}"`,
            ).toBe(true);
          });
        }
      });
    });

    it('should have pages array for hub pages', () => {
      const hubPages = realStructure.filter(p => p.pages);
      expect(hubPages.length).toBeGreaterThan(0);

      hubPages.forEach(hub => {
        expect(Array.isArray(hub.pages)).toBe(true);
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

  describe('Build-time Validation', () => {
    it('should pass structure validation checks', () => {
      const result = validateStructureData(realStructure, categoryMapping);
      expect(result.errors).toEqual([]);
    });

    it('should have structure entries for all docs page routes', async () => {
      const routesFromFiles = new Set(
        await getPageRoutes(path.resolve(process.cwd(), 'src/pages')),
      );

      const routesFromStructure = new Set(
        realStructure
          .map(page => nameToPath(page.name))
          .filter(
            (route): route is string =>
              typeof route === 'string' &&
              route.startsWith('/') &&
              !route.includes('#'),
          )
          .map(route => route.toLowerCase()),
      );

      const missingStructureEntries = [...routesFromFiles].filter(
        route => !routesFromStructure.has(route),
      );

      expect(
        missingStructureEntries,
        `Missing structure entries for routes: ${missingStructureEntries.join(
          ', ',
        )}`,
      ).toEqual([]);
    });

    it('should have page files for all structure routes', async () => {
      const routesFromFiles = new Set(
        await getPageRoutes(path.resolve(process.cwd(), 'src/pages')),
      );

      const routesFromStructure = new Set(
        realStructure
          .map(page => nameToPath(page.name))
          .filter(
            (route): route is string =>
              typeof route === 'string' &&
              route.startsWith('/') &&
              !route.includes('#') &&
              !route.startsWith('http'),
          )
          .map(route => route.toLowerCase()),
      );

      const missingPageFiles = [...routesFromStructure].filter(
        route =>
          !routesFromFiles.has(route) &&
          !STRUCTURE_ROUTE_FILE_ALLOWLIST.has(route),
      );

      expect(
        missingPageFiles,
        `Missing page files for structure routes: ${missingPageFiles.join(
          ', ',
        )}`,
      ).toEqual([]);
    });
  });
});
