import React from 'react';
import { Anchor, Box, Text } from 'grommet';
import { useInert } from '@shared/hooks';

export const AnchorPreview = () => {
  const ref = useInert();

  return (
    <Box ref={ref} direction="row" gap="3xsmall">
      <Text>The ship's</Text>
      {/* Placing as span to avoid nested Anchor errors in DOM. Since this is
       purely a visual preview, functionality isn't important here */}
      <Anchor as="span" label="Anchor" />.
    </Box>
  );
};
