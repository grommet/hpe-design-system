import React from 'react';
import { Box, Button, Menu } from 'grommet';
import { MoreVertical, Refresh, Share } from 'grommet-icons';

export const PageActions = () => {
  const menuItems = [
    { label: 'Edit', onClick: () => {} },
    { label: 'Delete', onClick: () => {} },
  ];

  return (
    <Box direction="row">
      <Button a11yTitle="Refresh" icon={<Refresh />} onClick={() => {}} />
      <Button a11yTitle="Share" icon={<Share />} onClick={() => {}} />
      <Menu
        a11yTitle="Actions"
        icon={<MoreVertical />}
        items={menuItems}
        dropAlign={{ top: 'bottom', right: 'right' }}
      />
    </Box>
  );
};
