import React from 'react';
import { Data, DataFilter } from 'grommet';
import applications from '../../../data/mockData/applications.json';

export const DataFilterExample = () => {
  return (
    <Data data={applications}>
      <DataFilter property="delivery" />
    </Data>
  );
};
