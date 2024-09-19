import React from 'react';
import { Data, DataSearch } from 'grommet';
import applications from '../../../data/mockData/applications.json';

export const DataSearchExample = () => {
  return (
    <Data data={applications}>
      <DataSearch />
    </Data>
  );
};
