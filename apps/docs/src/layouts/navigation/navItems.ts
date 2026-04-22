import { NavItemType } from '@shared/aries-core';
import { structure } from '../../data';
import { structureIndexes } from '../../data/structure';
import { nameToPath } from '../../utils';

type NavPage = {
  name: string;
  pages?: string[];
  parentPage?: string;
};

const structurePages = structure as NavPage[];

const pageDetails = structureIndexes.byName as { [key: string]: NavPage };

const hasChildren = (page: NavPage): page is NavPage & { pages: string[] } =>
  Array.isArray(page.pages) && page.pages.length > 0;

// eslint-disable-next-line max-len
const excludePages = ['Card']; // Pages with children to exclude from top-level navigation

// Helper to build a single nav item
const buildNavItem = (pageName: string): NavItemType | null => {
  const details = pageDetails[pageName];
  if (!details) return null;

  const navItem: NavItemType = {
    label: pageName,
  };

  if (hasChildren(details)) {
    // eslint-disable-next-line no-use-before-define
    navItem.children = buildNavItems(details.pages!, pageName);
  } else {
    navItem.url = nameToPath(pageName);
  }

  return navItem;
};

// Build navigation items for a parent, grouping by category if mapping exists
const buildNavItems = (pages: string[], parentName?: string): NavItemType[] => {
  const parentMapping = parentName
    ? structureIndexes.byCategory[parentName]
    : undefined;

  if (parentMapping) {
    // Build grouped items from the category mapping
    return Object.entries(parentMapping)
      .map(([category, categoryPages]) => {
        const groupChildren = categoryPages
          .map(page => buildNavItem(page.name))
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

export const navItems: NavItemType[] = structurePages
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
