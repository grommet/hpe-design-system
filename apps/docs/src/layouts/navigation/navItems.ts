import { NavItemType } from '@shared/aries-core';
import { structure, PageDetails } from '../../data';
import * as structureModule from '../../data/structure';
import { nameToPath } from '../../utils';

// Access categoryMapping from structure module
const categoryMapping = (structureModule as any).categoryMapping;

// Create a lookup for all pages in the structure to access metadata
const pageDetails = structure.reduce((acc, item) => {
  acc[item.name] = item;
  return acc;
}, {} as { [key: string]: PageDetails });

const hasChildren = (page: PageDetails): boolean => {
  return Array.isArray(page.pages) && page.pages.length > 0;
};

const excludePages = ['Card']; // Pages with children to exclude from top-level navigation

// Helper to build a single nav item
const buildNavItem = (pageName: string): NavItemType | null => {
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
};

// Build navigation items for a parent, grouping by category if mapping exists
const buildNavItems = (pages: string[], parentName?: string): NavItemType[] => {
  const parentMapping = parentName
    ? (categoryMapping as Record<string, Record<string, string[]>>)[parentName]
    : undefined;

  if (parentMapping) {
    // Build grouped items from the category mapping
    return Object.entries(parentMapping)
      .map(([category, categoryPages]) => {
        const groupChildren = categoryPages
          .map(buildNavItem)
          .filter(Boolean) as NavItemType[];

        if (groupChildren.length === 0) return null;

        // Alphabetize the leaf nodes within each group
        groupChildren.sort((a, b) => a.label.localeCompare(b.label));

        return {
          id: `group-${category.toLowerCase().replace(/\s+/g, '-')}`,
          label: category,
          type: 'group',
          children: groupChildren,
        } as NavItemType;
      })
      .filter(Boolean) as NavItemType[];
  }

  // Fallback: build items without grouping for parents without a mapping
  const items = pages
    .map(pageName => {
      const details = pageDetails[pageName];
      if (details?.parentPage) return null;
      return buildNavItem(pageName);
    })
    .filter(Boolean) as NavItemType[];

  return items.sort((a, b) => a.label.localeCompare(b.label));
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
