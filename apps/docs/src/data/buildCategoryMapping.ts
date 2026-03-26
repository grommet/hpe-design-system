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
  [parentPageName: string]: CategoryWeights;
}

/**
 * Generates category weight mappings for all hub pages with categories
 * @param data - The structure data array
 */
export function buildCategoryMapping(data: any[]): CategoryMappings {
  const mappings: CategoryMappings = {};

  // Find all hub pages (pages with .pages array)
  const hubPages = data.filter(page => page.pages && Array.isArray(page.pages));

  for (const hub of hubPages) {
    const weights: CategoryWeights = {};
    let weightCounter = 0;

    // Get all child pages for this hub
    const childPages = data.filter(
      page => hub.pages && hub.pages.includes(page.name),
    );

    // Assign weights based on first occurrence order
    for (const child of childPages) {
      const category = (child as any)?.category;
      if (category && !(category in weights)) {
        weights[category] = weightCounter;
        weightCounter++;
      }
    }

    // Only add mapping if this hub has categorized pages
    if (Object.keys(weights).length > 0) {
      mappings[hub.name] = weights;
    }
  }

  return mappings;
}

/**
 * Get category weights for a specific hub page
 * @param data - The structure data array
 * @param hubPageName - The name of the hub page
 */
export function getCategoryWeights(
  data: any[],
  hubPageName: string,
): CategoryWeights {
  const mappings = buildCategoryMapping(data);
  return mappings[hubPageName] || {};
}
