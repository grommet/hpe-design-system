/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { FilteringCards } from 'apps/docs/src/examples/templates/filtering/FilteringCards/FilteringCards';
import { FilteringTable } from 'apps/docs/src/examples/templates/filtering/FilteringTable/FilteringTable';
import { FilteringLists } from 'apps/docs/src/examples/templates/filtering/FilteringLists/FilteringLists';
import { QuickFilterToolbar } from 'apps/docs/src/examples/templates/filtering/QuickFilterToolbar';

const meta = {
  title: 'Patterns/Filtering',
};

export default meta;

export const FilterCards = {
  render: () => <FilteringCards />,
};

export const FilterTable = {
  render: () => <FilteringTable />,
};

export const FilterLists = {
  render: () => <FilteringLists />,
};

export const QuickFilter = {
  render: () => <QuickFilterToolbar />,
};
