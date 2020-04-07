import React from 'react';
import { Anchor, Box, Text } from 'grommet';

export const AnchorPreview = () => {
  return (
    <Box direction="row" gap="xsmall">
      <Text>The ship's</Text>
      <Anchor href="#" label="Anchor. " />
    </Box>
  );
};
