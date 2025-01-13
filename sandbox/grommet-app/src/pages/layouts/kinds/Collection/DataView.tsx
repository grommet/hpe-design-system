import React from 'react';
import { Data, DataFilters, DataSearch, DataSummary, DataTable, Pagination, Toolbar } from 'grommet';
import { DataTableActions } from './DataTableActions';

export const DataView = ({ data, columns, ...rest }) => {
  return (
    <Data data={data} {...rest}>
      <Toolbar>
        <Toolbar>
          <DataSearch />
          <DataFilters drop />
        </Toolbar>
        <DataTableActions flex justify="end" />
      </Toolbar>
      <DataSummary />
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
