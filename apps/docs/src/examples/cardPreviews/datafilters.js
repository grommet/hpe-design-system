import React from 'react';
import { Data, Toolbar, DataFilters } from 'grommet';
import { useInert } from '@shared/hooks';

export const DataFiltersPreview = () => {
  const ref = useInert();

  return (
    <div ref={ref}>
      <Data data={[{ name: 'Scott' }, { name: 'Zelda' }]}>
        <Toolbar>
          <DataFilters />
        </Toolbar>
      </Data>
    </div>
  );
};
