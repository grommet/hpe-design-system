import React from 'react';
import { Data, Toolbar, DataTableGroupBy } from 'grommet';
import { useInert } from '@shared/hooks';

export const DataTableGroupbyPreview = () => {
  const ref = useInert();

  return (
    <Data
      ref={ref}
      data={[
        { id: 1, name: 'Scott', country: 'AUS' },
        { id: 2, name: 'Zelda', country: 'AUS' },
      ]}
    >
      <Toolbar>
        <DataTableGroupBy options={['country']} drop />
      </Toolbar>
    </Data>
  );
};
