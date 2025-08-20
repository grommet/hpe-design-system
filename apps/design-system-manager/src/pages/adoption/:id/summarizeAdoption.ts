import PocketBase, { type RecordModel } from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);
const ADOPTION_LEVEL_1_ID = import.meta.env.VITE_ADOPTION_LEVEL_1_ID;
const ADOPTION_LEVEL_2_ID = import.meta.env.VITE_ADOPTION_LEVEL_2_ID;
const ADOPTION_LEVEL_3_ID = import.meta.env.VITE_ADOPTION_LEVEL_3_ID;

const initializeAdoptionLevels = async () => {
  const fetchAllFeatures = async (adoptionLevelId: string) => {
    const allFeatures: RecordModel[] = [];
    let page = 1;
    const perPage = 50;
    let totalPages = 1;

    while (page <= totalPages) {
      const features = await pb.collection("features").getList(page, perPage, {
        filter: `status = "available" && adoption_level_id = "${adoptionLevelId}"`,
      });

      // Update totalPages from API response after first call
      if (page === 1) {
        totalPages = features.totalPages;
      }

      allFeatures.push(...features.items);

      // If we got fewer items than requested, we've reached the end
      if (features.items.length < perPage) {
        break;
      }

      page++;
    }

    return {
      items: allFeatures,
      totalItems: allFeatures.length,
    };
  };

  const level1 = await fetchAllFeatures(ADOPTION_LEVEL_1_ID);
  const level2 = await fetchAllFeatures(ADOPTION_LEVEL_2_ID);
  const level3 = await fetchAllFeatures(ADOPTION_LEVEL_3_ID);

  return { level1, level2, level3 };
};

export type AdoptionLevelSummary = {
  total: number;
  design: number;
  code: number;
};

export type SummaryResult = {
  level_1: AdoptionLevelSummary;
  level_2: AdoptionLevelSummary;
  level_3: AdoptionLevelSummary;
};

export const summarizeAdoption = async (teamAdoption: RecordModel[]) => {
  // Define level mapping for faster lookups
  const levelMapping: Record<string, keyof SummaryResult> = {
    "1 - Identity": "level_1",
    "2 - Presentation": "level_2",
    "3 - Patterns": "level_3",
  };

  const { level1, level2, level3 } = await initializeAdoptionLevels();

  // Initialize our summary object with typed structure
  const result: SummaryResult = {
    level_1: { total: level1.totalItems, design: 0, code: 0 },
    level_2: { total: level2.totalItems, design: 0, code: 0 },
    level_3: { total: level3.totalItems, design: 0, code: 0 },
  };

  // Process all items in a single pass - most efficient approach
  // O(n) time complexity with only one iteration through the data
  teamAdoption.forEach((item) => {
    const key = levelMapping[item.adoption_level];
    if (!key) return; // Skip if level is not one we're tracking

    result[key].design = result[key].design + item.num_design_adopted;
    result[key].code = result[key].code + item.num_code_adopted;
  });

  return result;
};
