import React from 'react';
import { Data, DataSort } from 'grommet';
import applications from '../../../data/mockData/applications.json';

export const DataSortExample = () => {
  return (
    <Data data={applications}>
      <DataSort drop />
    </Data>
  );
};
