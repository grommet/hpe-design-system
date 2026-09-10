// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Data, Toolbar, DataView } from 'grommet';
import { useInert } from '@shared/hooks';

export const DataViewPreview = () => {
  const ref = useInert();

  return (
    <Data
      ref={ref}
      data={[{ age: 12 }, { age: 91 }]}
      views={[
        { name: 'oldest', sort: { property: 'age', direction: 'desc' } },
        { name: 'youngest', sort: { property: 'age', direction: 'asc' } },
      ]}
    >
      <Toolbar>
        <DataView />
      </Toolbar>
    </Data>
  );
};
