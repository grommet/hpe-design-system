import React, { useContext } from 'react';
import {
  Box,
  Data,
  DataFilters,
  DataSearch,
  DataSummary,
  DataTable,
  Pagination,
  ResponsiveContext,
  Toolbar
} from 'grommet';
import { DataTableActions } from './DataTableActions';

export const DataView = ({ data, columns, ...rest }) => {
  const breakpoint = useContext(ResponsiveContext);

  return (
    <Data data={data} {...rest}>
      <Toolbar>
        <Toolbar>
          <DataSearch drop={['xsmall', 'small'].includes(breakpoint)} />
          <DataFilters drop />
        </Toolbar>
        <DataTableActions responsive={breakpoint === 'xsmall'} flex justify="end" />
      </Toolbar>
      <DataSummary />
      <Box overflow={{ horizontal: 'auto' }}>
        <DataTable columns={columns} onSelect={() => { }} />
      </Box>
      <Pagination
        summary
        stepOptions
        border={{ side: 'top', color: 'border' }}
        pad={{
          top: '3xsmall'
        }}
      />
    </Data>
  );
};
