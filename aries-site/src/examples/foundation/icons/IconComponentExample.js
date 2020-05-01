import React from 'react';
import { Box, Button, Menu } from 'grommet';
import { Add, FormNext } from 'grommet-icons';

export const IconComponentExample = () => {
  return (
    <Box gap="medium" direction="row-responsive">
      <Menu icon={<Add />} label="Add User" />
      <Button
        label="Button"
        icon={<FormNext />}
        reverse
        onClick={() => {}}
      />
    </Box>
  );
};
