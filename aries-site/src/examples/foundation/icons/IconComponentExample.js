import React from 'react';
import { Box, Button, Menu } from 'grommet';
import { Add, Next } from 'grommet-icons';

export const IconComponentExample = () => (
  <Box gap="medium" direction="row-responsive">
    <Menu
      items={[{ label: 'Home' }, { label: 'Logout' }]}
      icon={<Add />}
      label="Menu with Icon"
    />
    <Button label="Button" icon={<Next />} reverse onClick={() => {}} />
  </Box>
);
