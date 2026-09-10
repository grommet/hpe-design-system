// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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
