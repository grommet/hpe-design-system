import React from 'react';
import { Data, DataFilters } from 'grommet';
import applications from '../../../data/mockData/applications.json';

export const DataFiltersAnatomy = () => {
  return (
    <Data
      data={applications}
      properties={{
        publisher: { label: 'Publisher ' },
        pricing: { label: 'Pricing' },
        delivery: { label: 'Delivery' },
        rating: { label: 'Rating' },
      }}
    >
      <DataFilters layer />
    </Data>
  );
};
