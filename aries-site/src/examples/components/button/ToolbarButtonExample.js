import React from 'react';
import { Menu } from 'grommet';
import {
  FilterControls,
  FiltersProvider,
} from '../../templates/FilterControls';

export function ToolbarButtonExample() {
  return <FiltersProvider>
    <FilterControls
      actions={<Menu label="Actions" kind="toolbar" />}
      data={[]}
      filters={[]}
      searchFilter={{ placeholder: 'Search users...' }}
    />
  </FiltersProvider>;
}
