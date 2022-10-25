import React from 'react';
import { Avatar, Box } from 'grommet';

export const AvatarDarkModeExample = () => (
  <Box
  // background={{ color: 'background', dark: true }}
  >
    <Avatar
      background={{ color: 'background', dark: 'false' }}
      alt="Apache Logo"
      src="/apache-spark.svg"
    />
  </Box>
);
