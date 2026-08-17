import React from 'react';
import { Box, Spinner, Text } from 'grommet';

const SelectLoadingPlaceholder = ({
  text = 'Loading...',
  message = { start: text, end: 'Loading complete' },
  ...rest
}) => (
  <Box direction="row" align="center" gap="xxsmall" {...rest}>
    <Spinner size="xsmall" message={message} />
    <Text color="text-weak">{text}</Text>
  </Box>
);

export { SelectLoadingPlaceholder };
