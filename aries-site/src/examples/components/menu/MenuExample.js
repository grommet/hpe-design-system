import React from 'react';
import { Box, Menu } from 'grommet';

export const MenuExample = () => {
  const items = [
    { label: 'Change username' },
    { label: 'Reset Password' },
    { label: 'Logout' },
  ];

  return (
    <Box round="xsmall">
      <Menu label="Account Information" items={items} width="medium" />
    </Box>
  );
};
