import React from 'react';
import { Box, Menu } from 'grommet';

export const MenuDefaultExample = () => {
  const items = [{ label: 'Action' }, { label: 'Action' }, { label: 'Action' }];

  return (
    <Box height="xsmall" direction="row" align="start">
      <Menu open label="Menu" items={items} />
    </Box>
  );
};
