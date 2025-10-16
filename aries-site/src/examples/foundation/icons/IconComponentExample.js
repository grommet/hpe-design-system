import React from 'react';
import { Box, Button, Menu } from 'grommet';
import { Add, Right } from '@hpe-design/icons-grommet';

export const IconComponentExample = () => (
  <Box gap="medium" direction="row-responsive">
    <Menu
      items={[{ label: 'Home' }, { label: 'Logout' }]}
      icon={<Add />}
      label="Menu with Icon"
    />
    <Button label="Button" icon={<Right />} reverse onClick={() => {}} />
  </Box>
);
