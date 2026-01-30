import React from 'react';
import { Box, Text } from 'grommet';
import { Element } from '@hpe-design/icons-grommet';

export const HpeElementExample = () => {
  const textSize = 'small';

  return (
    <Box direction="row" align="center" gap="medium">
      <Element color="brand" />
      <Box direction="row" gap="3xsmall">
        <Text size={textSize} weight="bold">
          HPE
        </Text>
        <Text size={textSize}>Service Name</Text>
      </Box>
    </Box>
  );
};
