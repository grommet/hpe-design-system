import type { RecordModel } from "pocketbase";

export interface GroupedFeature {
  adoptionLevel: string;
  categories: Array<{
    category: string;
    features: RecordModel[];
  }>;
}

/**
 * Groups features by adoption level first, then by category within each level.
 * This function is memoized for performance optimization.
 *
 * @param features - Array of feature records to group
 * @returns Hierarchical array grouped by adoption level and category
 */
export const groupFeaturesByAdoptionAndCategory = (
  features: RecordModel[] | undefined
): GroupedFeature[] => {
  if (!features) return [];

  return features.reduce((acc, feature) => {
    const { adoption_level, feature_category } = feature;

    // Find existing adoption level group or create new one
    let adoptionLevelGroup = acc.find(
      (group) => group.adoptionLevel === adoption_level
    );

    if (!adoptionLevelGroup) {
      adoptionLevelGroup = {
        adoptionLevel: adoption_level,
        categories: [],
      };
      acc.push(adoptionLevelGroup);
    }

    // Find existing category within this adoption level or create new one
    let categoryGroup = adoptionLevelGroup.categories.find(
      (cat) => cat.category === feature_category
    );

    if (!categoryGroup) {
      categoryGroup = {
        category: feature_category,
        features: [],
      };
      adoptionLevelGroup.categories.push(categoryGroup);
    }

    categoryGroup.features.push(feature);

    return acc;
  }, [] as GroupedFeature[]);
};
