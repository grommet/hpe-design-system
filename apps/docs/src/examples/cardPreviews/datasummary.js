import React from 'react';
import { Data, DataSummary } from 'grommet';

export const DataSummaryPreview = () => (
  <Data data={[{ name: 'Scott' }, { name: 'Zelda' }]}>
    <DataSummary />
  </Data>
);
