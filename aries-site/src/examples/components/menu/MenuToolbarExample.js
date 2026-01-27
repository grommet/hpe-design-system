import React from 'react';
import { Box, Menu } from 'grommet';

export const MenuToolbarExample = () => {
  const items = [{ label: 'Action' }, { label: 'Action' }, { label: 'Action' }];

  return (
    <Box height="xsmall" direction="row" align="start">
      <Menu open kind="toolbar" label="Menu" items={items} />
    </Box>
  );
};
