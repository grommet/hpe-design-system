import React from 'react';
import { Box, ToggleGroup } from 'grommet';
import { List, Table, MapLocation } from 'grommet-icons';

const options = [
  {
    icon: <List a11yTitle="List view" />,
    value: 'list',
    tip: 'List',
  },
  {
    icon: <Table a11yTitle="Map view" />,
    value: 'table',
    tip: 'Table',
  },
  {
    icon: <MapLocation a11yTitle="Map view" />,
    value: 'map',
    tip: 'Map',
  },
];

export const ToggleGroupSimple = () => (
  <Box gap='xlarge' pad='xlarge'>
    <ToggleGroup
      a11yTitle="Choose view"
      options={options}
      defaultValue="list"
    />
  </Box>
);
