import React from 'react';
import { Box, ToggleGroup } from 'grommet';
import { Table, List, Map } from '@hpe-design/icons-grommet';

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
          icon: <Map />,
          value: 'map',
        },
      ]}
    />
  </Box>
);
