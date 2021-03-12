import React from 'react';
import { Box, Text } from 'grommet';

export const TextSizeExample = () => (
    <Box direction="column" gap="medium">
      <Text size="xxlarge">Text xxlarge</Text>
      <Text size="xlarge">Text xlarge</Text>
      <Text size="large">Text large</Text>
      <Text>Text default</Text>
      <Text size="small">Text small</Text>
      <Text size="xsmall">Text xsmall</Text>
    </Box>
  );
