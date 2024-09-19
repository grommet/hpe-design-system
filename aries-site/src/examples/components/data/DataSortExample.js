import React from 'react';
import { Data, DataSort, Toolbar } from 'grommet';
import applications from '../../../data/mockData/applications.json';

export const DataSortExample = () => {
  return (
    <Data data={applications}>
      <Toolbar>
        <DataSort drop />
      </Toolbar>
    </Data>
  );
};
