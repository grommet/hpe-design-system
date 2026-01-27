import React from 'react';
import { Data, Toolbar, DataFilter } from 'grommet';

export const DataFilterPreview = () => (
  <Data
    data={[
      {
        location: 'Fort Collins',
      },
      {
        location: 'Boise',
      },
      {
        location: 'Palo Alto',
      },
      {
        location: 'San Francisco',
      },
    ]}
  >
    <Toolbar>
      <DataFilter tabIndex={-1} property="location" />
    </Toolbar>
  </Data>
);
