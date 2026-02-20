import { NavItemType } from '@shared/aries-core';
import { structure, PageDetails } from '../../data';
import { nameToPath } from '../../utils';

// Create a lookup for all pages in the structure to access metadata like 'category'
const pageDetails = structure.reduce((acc, item) => {
  acc[item.name] = item;
  return acc;
}, {} as { [key: string]: PageDetails });

const hasChildren = (page: PageDetails) => {
  return Array.isArray(page.pages) && page.pages.length > 0;
};

const excludePages = ['Card']; // Pages with children to exclude from top-level navigation

// Recursive function to build nav items, handling nested pages
const buildNavItems = (pages: string[]): NavItemType[] => {
  return pages
    .map(pageName => {
      const details = pageDetails[pageName];
      if (!details) return null; // Skip if page details are missing
      if (details.parentPage) return null; // Skip if this page is a child (will be handled in its parent)

      const navItem: NavItemType = {
        label: pageName,
      };

      if (hasChildren(details)) {
        navItem.children = buildNavItems(details.pages!);
      } else {
        navItem.url = nameToPath(pageName);
      }

      return navItem;
    })
    .filter(Boolean) as NavItemType[];
};

export const navItems: NavItemType[] = structure
  .filter(page => hasChildren(page) && !excludePages.includes(page.name)) // Only include top-level sections with children
  .map(page => {
    console.log('Processing page:', page.name); // Debug log to check page processing
    let navItem;
    if (page.name === 'Home') {
      navItem = {
        label: page.name,
        url: nameToPath(page.name),
      };
    } else {
      navItem = {
        label: page.name,
        // url: nameToPath(page.name),
        children: [
          {
            label: 'Overview',
            url: nameToPath(page.name),
          },
          ...buildNavItems(page.pages!),
        ],
      };
    }
    return navItem;
  });
