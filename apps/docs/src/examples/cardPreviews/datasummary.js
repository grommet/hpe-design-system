// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { Data, DataSummary } from 'grommet';
import { useInert } from '@shared/hooks';

export const DataSummaryPreview = () => {
  const ref = useInert();

  return (
    <Data ref={ref} data={[{ name: 'Scott' }, { name: 'Zelda' }]}>
      <DataSummary />
    </Data>
  );
};
