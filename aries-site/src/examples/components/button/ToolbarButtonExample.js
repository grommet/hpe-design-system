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

export const ToolbarButtonExample = () => {
  const items = [
    { label: 'View details', onClick: () => {} },
    { label: 'Edit profile', onClick: () => {} },
    { label: 'Apply blueprint', onClick: () => {} },
  ];
  return (
    <Box>
      <Data data={applications}>
        <Toolbar>
          <DataSearch />
          <DataFilters layer />
          <Box flex />
          <Menu label="Actions" items={items} kind="toolbar" />
        </Toolbar>
        <DataSummary />
      </Data>
    </Box>
  );
};
