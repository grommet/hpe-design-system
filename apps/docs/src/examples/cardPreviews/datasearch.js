import React from 'react';
import { Data, Toolbar, DataSearch } from 'grommet';

export const DataSearchPreview = () => (
  <Data data={[{ name: 'Scott' }, { name: 'Zelda' }]}>
    <Toolbar>
      <DataSearch tabIndex={-1} />
    </Toolbar>
  </Data>
);
