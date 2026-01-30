import React from 'react';
import { Data, DataSearch, Toolbar } from 'grommet';
import applications from '../../../data/mockData/applications.json';

export const DataSearchExample = () => {
  return (
    <Data data={applications}>
      <Toolbar>
        <DataSearch />
      </Toolbar>
    </Data>
  );
};
