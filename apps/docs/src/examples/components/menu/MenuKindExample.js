import React from 'react';
import { Box, Menu } from 'grommet';

export const MenuKindExample = () => {
  const items = [
    { label: 'Edit' },
    { label: 'View servers' },
    { label: 'Add servers' },
  ];

  return (
    <Box direction="row" align="start" gap="small">
      <Menu kind="primary" label="Actions" items={items} />
      <Menu kind="secondary" label="Actions" items={items} />
    </Box>
  );
};
