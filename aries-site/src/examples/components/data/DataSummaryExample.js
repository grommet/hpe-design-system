import React from 'react';
import { Data, DataSummary } from 'grommet';
import applications from '../../../data/mockData/applications.json';

export const DataSummaryExample = () => {
  return (
    <Data
      data={applications}
      view={{
        properties: { categories: ['Data analytics', 'Data protection'] },
      }}
    >
      <DataSummary />
    </Data>
  );
};
