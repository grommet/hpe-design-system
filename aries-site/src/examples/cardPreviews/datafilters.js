import React from 'react';
import { Data, Toolbar, DataFilters } from 'grommet';

export const DataFiltersPreview = () => (
  <Data data={[{ name: 'Scott' }, { name: 'Zelda' }]}>
    <Toolbar>
      <DataFilters tabIndex={-1} />
    </Toolbar>
  </Data>
);
