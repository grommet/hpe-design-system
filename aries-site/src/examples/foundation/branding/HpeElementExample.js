import React from 'react';
import { Box, Text } from 'grommet';
import { Hpe } from 'grommet-icons';

export function HpeElementExample() {
  const textSize = 'small';

  return (
    <Box direction="row" align="center" gap="medium">
      <Hpe color="brand" />
      <Box direction="row" gap="xsmall">
        <Text size={textSize} weight="bold">
          HPE
        </Text>
        <Text size={textSize}>Service Name</Text>
      </Box>
    </Box>
  );
}
