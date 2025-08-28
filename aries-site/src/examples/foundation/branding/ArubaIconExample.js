import React from 'react';
import { Box, Text } from 'grommet';
import { Aruba } from 'grommet-icons';

export const ArubaIconExample = () => {
  const textSize = 'small';

  return (
    <Box direction="row" align="center" gap="medium">
      <Aruba color="plain" />
      <Box direction="row" gap='3xsmall'>
        <Text size={textSize} weight="bold">
          Aruba
        </Text>
        <Text size={textSize}>Service Name</Text>
      </Box>
    </Box>
  );
};
