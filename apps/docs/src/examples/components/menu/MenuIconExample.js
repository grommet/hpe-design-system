import React from 'react';
import { Box, Menu } from 'grommet';
import { More, Settings } from '@hpe-design/icons-grommet';

export const MenuIconExample = () => {
  return (
    <Box direction="row" align="start" gap="small">
      <Menu
        a11yTitle="Open actions menu"
        icon={<More />}
        items={[
          { label: 'Edit' },
          { label: 'View servers' },
          { label: 'Add servers' },
        ]}
      />
      <Menu
        a11yTitle="Open settings menu"
        icon={<Settings />}
        items={[
          { label: 'Edit preferences' },
          { label: 'View system details' },
          { label: 'Reset system settings' },
        ]}
      />
    </Box>
  );
};
