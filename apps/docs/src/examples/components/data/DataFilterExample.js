// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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
