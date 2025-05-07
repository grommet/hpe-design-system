import React from 'react';
import { Data, Toolbar, DataTableColumns } from 'grommet';

export const DataTableColumnsPreview = () => (
  <Data
    data={[
      { id: 1, name: 'Scott', age: 12 },
      { id: 2, name: 'Zelda', age: 91 },
    ]}
  >
    <Toolbar>
      <DataTableColumns tabIndex={-1} options={['id', 'name', 'age']} drop />
    </Toolbar>
  </Data>
);
