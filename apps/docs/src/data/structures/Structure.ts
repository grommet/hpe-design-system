/* Functions to support page structure array manipulations */

export type StructureItem = {
  available?: boolean;
  cardOrder?: number;
  category?: string;
  name?: string;
  [key: string]: unknown;
};

export class Structure extends Array<StructureItem> {
  sortByAvailability() {
    const availability: Record<string, number> = { true: 0, false: 1 };

    return this.sort(
      (a, b) =>
        availability[String(a.available)] - availability[String(b.available)],
    );
  }

  sortByCardOrder() {
    return this.sort((a, b) => {
      if (a.cardOrder === undefined) return 1;
      if (b.cardOrder === undefined) return -1;
      return a.cardOrder - b.cardOrder;
    });
  }

  sortByCategory(weights: Record<string, number>) {
    return this.sort(
      (a, b) => weights[a.category as string] - weights[b.category as string],
    );
  }

  sortByName() {
    return this.sort((a, b) => {
      if ((a.name as string) < (b.name as string)) return -1;
      if ((a.name as string) > (b.name as string)) return 1;
      return 0;
    });
  }
}
