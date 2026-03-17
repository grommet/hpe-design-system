/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
/* eslint-disable import/extensions */
import React from 'react';
import { FilteringCards } from 'apps/docs/src/examples/templates/filtering/FilteringCards/FilteringCards';
import { FilteringTable } from 'apps/docs/src/examples/templates/filtering/FilteringTable/FilteringTable';
import { FilteringLists } from 'apps/docs/src/examples/templates/filtering/FilteringLists/FilteringLists';
import { QuickFilterToolbar } from 'apps/docs/src/examples/templates/filtering/QuickFilterToolbar';
import FilteringCardsSource from 'apps/docs/src/examples/templates/filtering/FilteringCards/FilteringCards.js?raw';
import FilteringTableSource from 'apps/docs/src/examples/templates/filtering/FilteringTable/FilteringTable.js?raw';
import FilteringListsSource from 'apps/docs/src/examples/templates/filtering/FilteringLists/FilteringLists.js?raw';
import QuickFilterToolbarSource from 'apps/docs/src/examples/templates/filtering/QuickFilterToolbar.js?raw';

const meta = {
  title: 'Patterns/Filtering',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

export const FilterCards = {
  render: () => <FilteringCards />,
  parameters: {
    docs: {
      source: {
        code: FilteringCardsSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const FilterTable = {
  render: () => <FilteringTable />,
  parameters: {
    docs: {
      source: {
        code: FilteringTableSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const FilterLists = {
  render: () => <FilteringLists />,
  parameters: {
    docs: {
      source: {
        code: FilteringListsSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const QuickFilter = {
  render: () => <QuickFilterToolbar />,
  parameters: {
    docs: {
      source: {
        code: QuickFilterToolbarSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
