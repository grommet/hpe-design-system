// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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
