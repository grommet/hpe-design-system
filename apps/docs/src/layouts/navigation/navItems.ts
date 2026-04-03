import { NavItemType } from '@shared/aries-core';
import { structure } from '../../data';
import { categoryOrders, structureIndexes } from '../../data/structure';
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

const excludePages = ['Card', 'Layer', 'Forms', 'Show More']; // Pages with children to exclude from top-level navigation
const excludeChildPages = ['All components'];
const topLevelNavOrder = [
  'Home',
  'Foundation',
  'Components',
  'Templates',
  'Design tokens',
  'Learn',
];

// Helper to build a single nav item
const buildNavItem = (pageName: string): NavItemType | null => {
  if (excludeChildPages.includes(pageName)) return null;

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
    ? structureIndexes.byCategory[parentName]
    : undefined;

  if (parentMapping) {
    const orderedCategories = categoryOrders[parentName || ''];
    const sortedParentEntries = Object.entries(parentMapping).sort(
      ([aCategory], [bCategory]) => {
        if (!orderedCategories) return 0;

        const fallbackWeight = Number.MAX_SAFE_INTEGER;
        const aWeight = orderedCategories.indexOf(aCategory);
        const bWeight = orderedCategories.indexOf(bCategory);

        return (
          (aWeight === -1 ? fallbackWeight : aWeight) -
          (bWeight === -1 ? fallbackWeight : bWeight)
        );
      },
    );

    // Build grouped items from the category mapping
    return sortedParentEntries
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
  .sort((a, b) => {
    const fallbackWeight = Number.MAX_SAFE_INTEGER;
    const aWeight = topLevelNavOrder.indexOf(a.name);
    const bWeight = topLevelNavOrder.indexOf(b.name);

    return (
      (aWeight === -1 ? fallbackWeight : aWeight) -
      (bWeight === -1 ? fallbackWeight : bWeight)
    );
  })
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
