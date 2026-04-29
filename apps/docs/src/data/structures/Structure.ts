/* Functions to support page structure array manipulations */

export type StructureItem = {
  available?: boolean;
  cardOrder?: number;
  category?: string;
  name?: string;
  [key: string]: unknown;
};

export class Structure<
  T extends StructureItem = StructureItem,
> extends Array<T> {
  static from<TItem extends StructureItem>(items: TItem[]): Structure<TItem> {
    const structure = new Structure<TItem>();
    structure.push(...items);
    return structure;
  }

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
    const fallbackWeight = Number.MAX_SAFE_INTEGER;

    return this.sort((a, b) => {
      const aWeight = a.category
        ? weights[a.category] ?? fallbackWeight
        : fallbackWeight;
      const bWeight = b.category
        ? weights[b.category] ?? fallbackWeight
        : fallbackWeight;

      return aWeight - bWeight;
    });
  }

  sortByName() {
    return this.sort((a, b) => {
      if ((a.name as string) < (b.name as string)) return -1;
      if ((a.name as string) > (b.name as string)) return 1;
      return 0;
    });
  }
}
