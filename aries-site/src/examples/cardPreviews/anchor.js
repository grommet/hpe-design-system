import React from 'react';
import { Anchor, Box, Text } from 'grommet';

export const AnchorPreview = () => {
  return (
    <Box direction="row" gap="xsmall">
      <Text>The ship's</Text>
      {/* Placing as span to avoid nested Anchor errors in DOM. Since this is
       purely a visual preview, functionality isn't important here */}
      <Anchor as="span" label="Anchor" />.
    </Box>
  );
};
