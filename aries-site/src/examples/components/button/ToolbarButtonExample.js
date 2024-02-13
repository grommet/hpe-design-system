import React from 'react';
import {
  Box,
  Data,
  Toolbar,
  DataSearch,
  DataFilters,
  Menu,
  DataSummary,
} from 'grommet';
import applications from '../../../data/mockData/applications.json';

export const ToolbarButtonExample = () => (
  <Box>
    <Data data={applications}>
      <Toolbar>
        <DataSearch />
        <DataFilters layer />
        <Box flex />
        <Menu label="Actions" kind="toolbar" />
      </Toolbar>
      <DataSummary />
    </Data>
  </Box>
);
