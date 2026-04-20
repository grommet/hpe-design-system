import React from 'react';
import { Data, Toolbar, DataTableColumns } from 'grommet';
import { useInert } from '@shared/hooks';

export const DataTableColumnsPreview = () => {
  const ref = useInert();

  return (
    <Data
      ref={ref}
      data={[
        { id: 1, name: 'Scott', age: 12 },
        { id: 2, name: 'Zelda', age: 91 },
      ]}
    >
      <Toolbar>
        <DataTableColumns options={['id', 'name', 'age']} drop />
      </Toolbar>
    </Data>
  );
};
