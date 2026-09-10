// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Data, Toolbar, DataSort } from 'grommet';
import { useInert } from '@shared/hooks';

export const DataSortPreview = () => {
  const ref = useInert();

  return (
    <Data ref={ref} data={[{ name: 'Scott' }, { name: 'Zelda' }]}>
      <Toolbar>
        <DataSort />
      </Toolbar>
    </Data>
  );
};
