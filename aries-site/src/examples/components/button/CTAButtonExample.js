import React from 'react';
import { Box, Button } from 'grommet';

export const CTAButtonExample = () => {
  return (
    <Box gap="small">
      <Button label="Discover HPE GreenLake" kind="cta-primary" />
      <Button label="Discover HPE GreenLake" kind="cta-alternate" />
    </Box>
  );
};
