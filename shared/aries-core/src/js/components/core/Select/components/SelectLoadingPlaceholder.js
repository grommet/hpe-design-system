import React from 'react';
import { Box, Spinner, Text } from 'grommet';

const SelectLoadingPlaceholder = ({ text = 'Loading...' }) => (
  <Box direction="row" align="center" gap="xxsmall">
    <Spinner size="xsmall" />
    <Text color="text-weak">{text}</Text>
  </Box>
);

export { SelectLoadingPlaceholder };
