import React from 'react';
import { Box, Menu } from 'grommet';

export const MenuToolbarExample = () => {
  const items = [{ label: 'Action' }, { label: 'Action' }, { label: 'Action' }];

  return (
    <Box direction="row" align="start">
      <Menu kind="toolbar" label="Menu" items={items} />
    </Box>
  );
};
