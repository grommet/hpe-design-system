import { NavItemType } from '@shared/aries-core';
import { structure, PageDetails } from '../../data';
import { nameToPath } from '../../utils';

// Create a lookup for all pages in the structure to access metadata like 'category'
const pageDetails = structure.reduce((acc, item) => {
  acc[item.name] = item;
  return acc;
}, {} as { [key: string]: PageDetails });

export const navItems: NavItemType[] = structure
  .filter(page => Array.isArray(page.pages)) // Only include sections (items that can have subpages)
  .map(page => {
    const groups: { [key: string]: NavItemType[] } = {};

    page.pages?.forEach(pageName => {
      const details = pageDetails[pageName];
      // Only valid pages that exist in structure
      if (details) {
        const category = details.category || 'Other';

        if (!groups[category]) {
          groups[category] = [];
        }

        groups[category].push({
          label: pageName,
          url: nameToPath(pageName),
        });
      }
    });

    const groupKeys = Object.keys(groups);

    // If we only have "Other" (uncategorized), return flat list preserving original order
    if (groupKeys.length === 1 && groupKeys[0] === 'Other') {
      return {
        label: page.name,
        url: nameToPath(page.name),
        children: groups['Other'],
      };
    }

    // Sort categories and create grouped children
    const children: NavItemType[] = groupKeys
      .sort((a, b) => {
        const { categoryOrder } = page;
        if (categoryOrder) {
          const indexA = categoryOrder.indexOf(a);
          const indexB = categoryOrder.indexOf(b);

          if (indexA > -1 && indexB > -1) {
            return indexA - indexB;
          }
          if (indexA > -1) {
            return -1;
          }
          if (indexB > -1) {
            return 1;
          }
        }
        return a.localeCompare(b);
      })
      .map(category => ({
        label: category,
        type: 'group',
        children: groups[category].sort((a, b) => {
          const detailsA = pageDetails[a.label];
          const detailsB = pageDetails[b.label];
          const orderA = detailsA?.cardOrder ?? Number.MAX_SAFE_INTEGER;
          const orderB = detailsB?.cardOrder ?? Number.MAX_SAFE_INTEGER;

          return orderA - orderB || a.label.localeCompare(b.label);
        }),
      }));

    return {
      label: page.name,
      url: nameToPath(page.name),
      children,
    };
  });
