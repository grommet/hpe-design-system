/**
 * Builds category weight mappings from structure data.
 *
 * This function generates weight objects for sorting pages by category.
 * Rather than hardcoding weights like { Assets: 1, Philosophy: 0 },
 * we derive them from the actual page definitions and their first occurrence.
 *
 * Weight assignment rule: First occurrence = 0, next unique = 1, etc.
 */

export interface CategoryWeights {
  [category: string]: number;
}

export interface CategoryMappings {
  [parentPageName: string]: {
    [category: string]: string[];
  };
}

/**
 * Generates category mappings for all hub pages with categories.
 *
 * Output shape:
 * {
 *   Foundation: {
 *     Philosophy: ['Accessibility', ...],
 *     Assets: ['Colors', ...],
 *   }
 * }
 * @param data - The structure data array
 */
export function buildCategoryMapping(data: any[]): CategoryMappings {
  const mappings: CategoryMappings = {};

  // Find all hub pages (pages with .pages array)
  const hubPages = data.filter(page => page.pages && Array.isArray(page.pages));

  for (const hub of hubPages) {
    const groupedByCategory: Record<string, string[]> = {};

    // Iterate in parent pages order to preserve current behavior.
    for (const pageName of hub.pages) {
      const child = data.find(page => page.name === pageName && !page.href);
      const category = child?.category;

      if (category) {
        if (!groupedByCategory[category]) groupedByCategory[category] = [];
        groupedByCategory[category].push(pageName);
      }
    }

    // Only add mapping if this hub has categorized pages
    if (Object.keys(groupedByCategory).length > 0) {
      mappings[hub.name] = groupedByCategory;
    }
  }

  return mappings;
}

/**
 * Converts category group order into numeric weights for sortByCategory.
 * @param mapping - The generated category mapping
 * @param hubPageName - The name of the hub page
 * @param categoryOrder - Optional custom category order. If provided, uses this order instead of data order
 */
export function getCategoryWeights(
  mapping: CategoryMappings,
  hubPageName: string,
  categoryOrder?: string[],
): CategoryWeights {
  const categoryGroups = mapping[hubPageName];
  if (!categoryGroups) return {};

  const categories = categoryOrder || Object.keys(categoryGroups);

  return categories.reduce((acc, category, index) => {
    if (categoryGroups[category]) {
      acc[category] = index;
    }
    return acc;
  }, {} as CategoryWeights);
}
