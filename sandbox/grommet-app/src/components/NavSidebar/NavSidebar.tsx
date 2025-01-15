import React from 'react';
import { Anchor, Box } from 'grommet';

export const NavSidebar = ({ ...rest }) => {
  return (
    <Box
      direction="column"
      gap="small"
      {...rest}
    >
      <Anchor href="/home" label="Home" />
      <Anchor href="/about" label="About" />
      <Anchor href="/contact" label="Contact" />
    </Box>
  );
};
