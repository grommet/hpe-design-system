import React from 'react';
import { Data, Toolbar, DataFilter } from 'grommet';

export const DataFilterPreview = () => (
  <Data data={[{ age: 12 }, { age: 91 }]}>
    <Toolbar>
      <DataFilter tabIndex={-1} property="age" />
    </Toolbar>
  </Data>
);
