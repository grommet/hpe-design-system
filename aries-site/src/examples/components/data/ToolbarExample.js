import React from 'react';
import {
  Box,
  Data,
  DataFilters,
  DataSearch,
  DataSort,
  DataSummary,
  DataTableColumns,
  DataView,
  Menu,
  Toolbar,
} from 'grommet';
import applications from '../../../data/mockData/applications.json';

export const ToolbarExample = () => {
  return (
    <Data data={applications}>
      <Toolbar gap="medium">
        <Toolbar>
          <DataSearch />
          <DataSort drop />
          <DataFilters layer />
        </Toolbar>
        <DataView />
        <DataTableColumns options={[]} drop />
        <Box flex align="end">
          <Menu label="Actions" kind="toolbar" items={[]} />
        </Box>
      </Toolbar>
      <DataSummary />
    </Data>
  );
};
