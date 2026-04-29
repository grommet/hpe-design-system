import type { CategoryMappings } from './buildCategoryMapping';

export type StructurePage = {
  name: string;
  pages?: string[];
  sections?: string[];
  category?: string;
  href?: string;
  path?: string;
  url?: string;
  parentPage?: string;
  [key: string]: unknown;
};

export type StructureIndexes = {
  byName: Record<string, StructurePage>;
  byNameLookup: Record<string, StructurePage>;
  bySlug: Record<string, StructurePage[]>;
  byParent: Record<string, StructurePage[]>;
  parentByChild: Record<string, StructurePage>;
  bySection: Record<string, StructurePage>;
  byCategory: Record<string, Record<string, StructurePage[]>>;
};

const toLookupKey = (value?: string) => (value || '').trim().toLowerCase();

const isInternalReference = (value?: string) =>
  typeof value === 'string' && value.startsWith('/');

export const nameToSlug = (name: string) => {
  const a = `àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűų
  ẃẍÿýžźż·/_,:;`;
  const b = `aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuu
  wxyyzzz------`;
  const p = new RegExp(a.split('').join('|'), 'g');

  return name
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(p, c => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const selectCanonicalPage = (pages: StructurePage[]) =>
  pages.find(page => !page.href) || pages[0];

const getPageByName = (indexes: StructureIndexes, pageName: string) =>
  indexes.byNameLookup[toLookupKey(pageName)];

export const buildStructureIndexes = (
  structureData: StructurePage[],
  categoryMapping?: CategoryMappings,
): StructureIndexes => {
  const groupedByLookupName = new Map<string, StructurePage[]>();

  structureData.forEach(page => {
    const key = toLookupKey(page.name);
    if (!key) return;

    const existing = groupedByLookupName.get(key) || [];
    groupedByLookupName.set(key, [...existing, page]);
  });

  const byName: Record<string, StructurePage> = {};
  const byNameLookup: Record<string, StructurePage> = {};

  groupedByLookupName.forEach((pages, lookupKey) => {
    const canonicalPage = selectCanonicalPage(pages);
    byName[canonicalPage.name] = canonicalPage;
    byNameLookup[lookupKey] = canonicalPage;
  });

  const byParent: Record<string, StructurePage[]> = {};
  const parentByChild: Record<string, StructurePage> = {};
  const bySection: Record<string, StructurePage> = {};
  const bySlug: Record<string, StructurePage[]> = {};

  structureData.forEach(page => {
    if (Array.isArray(page.pages) && page.pages.length > 0) {
      byParent[page.name] = page.pages
        .map(childName =>
          getPageByName(
            {
              byName,
              byNameLookup,
              bySlug,
              byParent,
              parentByChild,
              bySection,
              byCategory: {},
            },
            childName,
          ),
        )
        .filter(Boolean) as StructurePage[];

      byParent[page.name].forEach(child => {
        if (!parentByChild[child.name]) {
          parentByChild[child.name] = page;
        }
      });
    }

    if (Array.isArray(page.sections)) {
      page.sections.forEach(section => {
        if (!bySection[section]) {
          bySection[section] = page;
        }
      });
    }

    if (!page.href && !page.url) {
      const slug = nameToSlug(page.name);
      if (!bySlug[slug]) bySlug[slug] = [];
      bySlug[slug].push(page);
    }
  });

  const byCategory: Record<string, Record<string, StructurePage[]>> = {};

  if (categoryMapping) {
    Object.entries(categoryMapping).forEach(([hubName, groupedCategories]) => {
      byCategory[hubName] = {};

      Object.entries(groupedCategories).forEach(([category, pageNames]) => {
        byCategory[hubName][category] = pageNames
          .map(pageName =>
            getPageByName(
              {
                byName,
                byNameLookup,
                bySlug,
                byParent,
                parentByChild,
                bySection,
                byCategory,
              },
              pageName,
            ),
          )
          .filter(Boolean) as StructurePage[];
      });
    });
  }

  return {
    byName,
    byNameLookup,
    bySlug,
    byParent,
    parentByChild,
    bySection,
    byCategory,
  };
};

export const getPrimaryPageByName = (
  pageName: string | undefined,
  indexes: StructureIndexes,
) => {
  if (!pageName) return undefined;
  return indexes.byNameLookup[toLookupKey(pageName)];
};

export const getPathOverride = (page: StructurePage | undefined) => {
  if (!page) return undefined;

  if (typeof page.path === 'string') return page.path;
  if (isInternalReference(page.href)) return page.href;
  if (typeof page.url === 'string') return page.url;

  return undefined;
};
