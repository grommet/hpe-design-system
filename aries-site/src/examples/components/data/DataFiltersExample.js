import React from 'react';
import { Data, DataFilters } from 'grommet';
import applications from '../../../data/mockData/applications.json';

export const DataFiltersExample = () => {
  return (
    <Data
      data={applications}
      properties={{
        title: { label: 'Title' },
        publisher: { label: 'Publisher' },
        categories: {
          label: 'Categories',
          options: [
            'Data Analytics',
            'Data protection',
            'Machine learning',
            'Monitoring',
          ],
        },
        rating: { label: 'Rating', range: { min: 0, max: 5 } },
      }}
    >
      <DataFilters layer />
    </Data>
  );
};
