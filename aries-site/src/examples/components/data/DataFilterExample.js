import React from 'react';
import { Data, DataFilter, Toolbar } from 'grommet';
import applications from '../../../data/mockData/applications.json';

export const DataFilterExample = () => {
  return (
    <Data data={applications}>
      <Toolbar>
        <DataFilter property="delivery" />
      </Toolbar>
    </Data>
  );
};
