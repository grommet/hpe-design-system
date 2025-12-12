/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
import { FilteringCards } from 'aries-site/src/examples/templates/filtering/FilteringCards/FilteringCards';
import { FilteringTable } from 'aries-site/src/examples/templates/filtering/FilteringTable/FilteringTable';
import { FilteringLists } from 'aries-site/src/examples/templates/filtering/FilteringLists/FilteringLists';
import { QuickFilterToolbar } from 'aries-site/src/examples/templates/filtering/QuickFilterToolbar';

const meta = {
  title: 'Filtering',
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
