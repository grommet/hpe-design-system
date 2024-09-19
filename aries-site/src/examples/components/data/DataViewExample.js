import React from 'react';
import { Data, DataView } from 'grommet';
import applications from '../../../data/mockData/applications.json';

export const DataViewExample = () => {
  return (
    <Data
      data={applications}
      views={[
        {
          name: 'Most popular',
          properties: {
            rating: { min: 4, max: 5 },
          },
        },
        {
          name: 'Needs attention',
          properties: {
            rating: { min: 0, max: 2 },
            pricing: ['Free'],
          },
        },
      ]}
    >
      <DataView />
    </Data>
  );
};
