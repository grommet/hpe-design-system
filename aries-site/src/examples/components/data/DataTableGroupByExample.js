import React from 'react';
import { Data, DataTableGroupBy } from 'grommet';
import applications from '../../../data/mockData/applications.json';

export const DataTableGroupByExample = () => {
  return (
    <Data data={applications}>
      <DataTableGroupBy
        options={[
          {
            property: 'categories',
            label: 'Categories',
          },
          {
            property: 'delivery',
            label: 'Delivery',
          },
          {
            property: 'pricing',
            label: 'Pricing',
          },
          {
            property: 'publisher',
            label: 'Publisher',
          },
          {
            property: 'rating',
            label: 'Rating',
          },
          {
            property: 'title',
            label: 'Title',
          },
        ]}
      />
    </Data>
  );
};
