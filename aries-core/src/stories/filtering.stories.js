import React from 'react';
/* eslint-disable max-len */
import { FilteringCards } from 'aries-site/src/examples/templates/filtering/FilteringCards/FilteringCards';
import { FilteringTable } from 'aries-site/src/examples/templates/filtering/FilteringTable/FilteringTable';
import { FilteringLists } from 'aries-site/src/examples/templates/filtering/FilteringLists/FilteringLists';
import { QuickFilterToolbar } from 'aries-site/src/examples/templates/filtering/QuickFilterToolbar';

export const FilterCards = () => <FilteringCards />;
export const FilterTable = () => <FilteringTable />;
export const FilterLists = () => <FilteringLists />;
export const QuickFilter = () => <QuickFilterToolbar />;

export default {
  title: 'Filtering',
};
