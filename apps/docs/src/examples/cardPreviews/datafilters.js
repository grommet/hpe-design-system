import React from 'react';
import { Data, Toolbar, DataFilters } from 'grommet';
import { useInert } from '@shared/hooks';

export const DataFiltersPreview = () => {
  const ref = useInert();

  return (
    <Data ref={ref} data={[{ name: 'Scott' }, { name: 'Zelda' }]}>
      <Toolbar>
        <DataFilters />
      </Toolbar>
    </Data>
  );
};
