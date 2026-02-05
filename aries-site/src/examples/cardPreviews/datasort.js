import React from 'react';
import { Data, Toolbar, DataSort } from 'grommet';

export const DataSortPreview = () => (
  <Data data={[{ name: 'Scott' }, { name: 'Zelda' }]}>
    <Toolbar>
      <DataSort tabIndex={-1} />
    </Toolbar>
  </Data>
);
