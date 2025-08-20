import PocketBase from "pocketbase";
import type { RecordModel } from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

interface GetAllRecordsParams {
  collection: string;
  options?: Record<string, unknown>;
}

const getAllRecords = async ({
  collection,
  options = {},
}: GetAllRecordsParams): Promise<RecordModel[]> => {
  const allRecords: RecordModel[] = [];
  let page = 1;
  const perPage = 50; // Reasonable page size
  let totalPages = 1; // Will be updated after first API call

  while (page <= totalPages) {
    const records = await pb
      .collection(collection)
      .getList(page, perPage, options);

    // Update totalPages from API response after first call
    if (page === 1) {
      totalPages = records.totalPages;
    }

    allRecords.push(...records.items);

    // If we got fewer items than requested, we've reached the end
    if (records.items.length < perPage) {
      break;
    }

    page++;
  }

  return allRecords;
};

export { getAllRecords };
