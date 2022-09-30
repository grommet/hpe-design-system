import React from 'react';
import { Box, Text } from 'grommet';

export const Answer = ({ children, ...rest }) => (
  <Box align="center" {...rest}>
    <Text weight={500}>{children}</Text>
  </Box>
);
