import React from 'react';
import { Anchor, Box, Text } from 'grommet';

export const AnchorExample = () => {
  return (
    <Box direction="column" align="start" gap="medium">
      <Box direction="row" gap="small">
        <Text>Default anchor:</Text>
        <Anchor color="brand" href="#" label="Anchor " />
      </Box>
      <Box direction="row" gap="small">
        <Text>Color anchor: </Text>
        <Anchor color="text" href="#" label="Color Anchor" />
      </Box>
    </Box>
  );
};
