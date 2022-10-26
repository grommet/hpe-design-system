import React from 'react';
import { Avatar, Box } from 'grommet';

export const AvatarDarkModeExample = () => (
  <Box
    width="medium"
    height="small"
    background={{ color: 'background', dark: true }}
    justify="center"
    align="center"
  >
    <Avatar
      background={{ color: 'background', dark: false }}
      alt="Ctera Logo"
      src="/ctera.svg"
      size="large"
      round="medium"
      align="undefined"
    />
  </Box>
);
