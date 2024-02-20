import React from 'react';
import { Data, DataTableColumns, Toolbar } from 'grommet';
import applications from '../../../data/mockData/applications.json';

export const DataTableColumnsExample = () => {
  return (
    <Data data={applications}>
      <Toolbar>
        <DataTableColumns
          options={[
            {
              property: 'title',
              label: 'Title',
            },
            {
              property: 'publisher',
              label: 'Publisher',
            },
            {
              property: 'categories',
              label: 'Categories',
            },
            {
              property: 'rating',
              label: 'Rating',
            },
            {
              property: 'pricing',
              label: 'Pricing',
            },
            {
              property: 'delivery',
              label: 'Delivery',
            },
          ]}
          drop
        />
      </Toolbar>
    </Data>
  );
};
