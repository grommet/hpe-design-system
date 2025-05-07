import React from 'react';
import { Data, Toolbar, DataTableGroupBy } from 'grommet';

export const DataTableGroupbyPreview = () => (
  <Data
    data={[
      { id: 1, name: 'Scott', country: 'AUS' },
      { id: 2, name: 'Zelda', country: 'AUS' },
    ]}
  >
    <Toolbar>
      <DataTableGroupBy tabIndex={-1} options={['country']} drop />
    </Toolbar>
  </Data>
);
