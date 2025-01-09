import React from 'react';
import { Data, DataTable, Pagination } from 'grommet';
import { columns } from './tableColumns';

export const DataView = ({ data, ...rest }) => {
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