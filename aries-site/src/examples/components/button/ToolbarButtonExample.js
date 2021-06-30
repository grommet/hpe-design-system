import React from 'react';
import { Box, Menu } from 'grommet';
import {
  FilterControls,
  FiltersProvider,
} from '../../templates/FilterControls';

export const ToolbarButtonExample = () => (
  <Box align="start" direction="row" justify="between" wrap>
    <FiltersProvider>
      <FilterControls
        data={[]}
        filters={[]}
        searchFilter={{ placeholder: 'Search users...' }}
      />
    </FiltersProvider>
    <Menu label="Actions" kind="toolbar" />
  </Box>
);
