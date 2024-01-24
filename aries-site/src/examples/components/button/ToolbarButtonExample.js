import React from 'react';
import { Box, Data, Toolbar, DataSearch, DataFilters, Menu } from 'grommet';

export const ToolbarButtonExample = () => (
  <Box width="large">
    <Data>
      <Toolbar>
        <DataSearch />
        <DataFilters layer />
        <Box flex />
        <Menu label="Actions" kind="toolbar" />
      </Toolbar>
    </Data>
  </Box>
);
