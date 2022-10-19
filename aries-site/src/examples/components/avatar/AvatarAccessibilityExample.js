import React from 'react';
import { Avatar, Box } from 'grommet';

export const AvatarAccessibilityExample = () => (
  <Box align="center">
    <Avatar
      size="large"
      a11yTitle="Avatar containing initial letters J and S"
      background="green"
    >
      JS
    </Avatar>
  </Box>
);
