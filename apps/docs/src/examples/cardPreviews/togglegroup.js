import React from 'react';
import { Box, ToggleGroup } from 'grommet';
import { Table, List, Map } from '@hpe-design/icons-grommet';
import { useInert } from '@shared/hooks';

export const ToggleGroupPreview = () => {
  const ref = useInert();

  return (
    <Box align="center" justify="center" ref={ref}>
      <ToggleGroup
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
};
