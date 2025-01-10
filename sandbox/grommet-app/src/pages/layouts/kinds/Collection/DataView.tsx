import React from 'react';
import { Data, DataTable, Pagination } from 'grommet';

export const DataView = ({ data, columns, ...rest }) => {
  return (
    <Data data={data} toolbar {...rest}>
      <DataTable columns={columns} onSelect={() => { }} />
      <Pagination
        summary
        stepOptions
        border={{ side: 'top', color: 'border' }}
        pad={{ top: 'xsmall' }}
      />
    </Data>
  );
};
