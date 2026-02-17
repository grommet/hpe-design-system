/* Functions to support page structure array manipulations */

export class Structure extends Array {
  sortByAvailability() {
    const availability = { true: 0, false: 1 };

    return this.sort(
      (a, b) => availability[a.available] - availability[b.available],
    );
  }

  sortByCardOrder() {
    return this.sort((a, b) => {
      if (a.cardOrder === undefined) return 1;
      if (b.cardOrder === undefined) return -1;
      return a.cardOrder - b.cardOrder;
  });
  }

  sortByCategory(weights) {
    return this.sort((a, b) => weights[a.category] - weights[b.category]);
  }

  sortByName() {
    return this.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
  }
}
