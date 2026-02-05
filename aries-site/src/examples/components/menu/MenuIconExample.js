import React from 'react';
import { Box, Menu } from 'grommet';
import { More, Settings } from '@hpe-design/icons-grommet';

export const MenuIconExample = () => {
  const items = [{ label: 'Action' }, { label: 'Action' }, { label: 'Action' }];

  return (
    <Box direction="row" align="start" gap="small">
      <Menu icon={<More />} items={items} />
      <Menu icon={<Settings />} items={items} />
    </Box>
  );
};
