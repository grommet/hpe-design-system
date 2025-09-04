import React from 'react';
import { Box, Text } from 'grommet';
import { Hpe } from 'grommet-icons';

export const HpeElementExample = () => {
  const textSize = 'small';

  return (
    <Box direction="row" align="center" gap="medium">
      <Hpe color="brand" />
      <Box direction="row" gap='3xsmall'>
        <Text size={textSize} weight="bold">
          HPE
        </Text>
        <Text size={textSize}>Service Name</Text>
      </Box>
    </Box>
  );
};
