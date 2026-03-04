import { NavItemType } from '@shared/aries-core';
import { structure, PageDetails } from '../../data';
import { nameToPath } from '../../utils';

// Import categoryMapping with type assertion (exported from structure.js)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoryMapping: any = require('../../data/structure').categoryMapping;

// Create a lookup for all pages in the structure to access metadata
const pageDetails = structure.reduce((acc, item) => {
  acc[item.name] = item;
  return acc;
}, {} as { [key: string]: PageDetails });

const hasChildren = (page: PageDetails) => {
  return Array.isArray(page.pages) && page.pages.length > 0;
};

const excludePages = ['Card']; // Pages with children to exclude from top-level navigation

// Build navigation items for a parent, grouping by category if mapping exists
const buildNavItems = (pages: string[], parentName?: string): NavItemType[] => {
  // Check if this parent has a category mapping
  const parentMapping =
    parentName && categoryMapping[parentName as keyof typeof categoryMapping];

  if (parentMapping) {
    // Build grouped items from the category mapping
    const result: NavItemType[] = [];

    Object.entries(parentMapping).forEach(([category, categoryPages]) => {
      const groupChildren: NavItemType[] = (categoryPages as string[])
        .map((pageName: string) => {
          const details = pageDetails[pageName];
          if (!details) return null;

          const navItem: NavItemType = {
            label: pageName,
          };

          if (hasChildren(details)) {
            navItem.children = buildNavItems(details.pages!, pageName);
          } else {
            navItem.url = nameToPath(pageName);
          }

          return navItem;
        })
        .filter(Boolean) as NavItemType[];

      // Create a group item for each category
      if (groupChildren.length > 0) {
        result.push({
          id: `group-${category.toLowerCase().replace(/\s+/g, '-')}`,
          label: category,
          type: 'group',
          children: groupChildren,
        });
      }
    });

    return result;
  }

  // Fallback: build items without grouping for parents without a mapping
  return pages
    .map(pageName => {
      const details = pageDetails[pageName];
      if (!details) return null;
      if (details.parentPage) return null;

      const navItem: NavItemType = {
        label: pageName,
      };

      if (hasChildren(details)) {
        navItem.children = buildNavItems(details.pages!, pageName);
      } else {
        navItem.url = nameToPath(pageName);
      }

      return navItem;
    })
    .filter(Boolean) as NavItemType[];
};

export const navItems: NavItemType[] = structure
  .filter(page => hasChildren(page) && !excludePages.includes(page.name))
  .map(page => {
    if (page.name === 'Home') {
      return {
        label: page.name,
        url: nameToPath(page.name),
      };
    }

    return {
      label: page.name,
      children: [
        {
          label: 'Overview',
          url: nameToPath(page.name),
        },
        ...buildNavItems(page.pages!, page.name),
      ],
    };
  });
