import React from 'react';
import { Box, ToggleGroup } from 'grommet';
import { Table, List, MapLocation } from 'grommet-icons';

export const ToggleGroupPreview = () => (
  <Box align="center" justify="center">
    <ToggleGroup
      tabIndex={-1}
      options={[
        {
          icon: <Table />,
          value: 'table',
        },
        {
          icon: <List />,
          value: 'list',
        },
        {
          icon: <MapLocation />,
          value: 'map',
        },
      ]}
    />
  </Box>
);
