import React from 'react';
import { Data, Toolbar, DataView } from 'grommet';

export const DataViewPreview = () => (
  <Data
    data={[{ age: 12 }, { age: 91 }]}
    views={[
      { name: 'oldest', sort: { property: 'age', direction: 'desc' } },
      { name: 'youngest', sort: { property: 'age', direction: 'asc' } },
    ]}
  >
    <Toolbar>
      <DataView tabIndex={-1} />
    </Toolbar>
  </Data>
);
