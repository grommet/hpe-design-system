import React from 'react';
import { Box, Heading } from 'grommet';

export const HeadingExample = () => (
  <Box direction="column" gap="medium">
    <Heading level={1} margin="none">
      h1 Heading
    </Heading>
    <Heading level={2} margin="none">
      h2 Heading
    </Heading>
    <Heading level={3} margin="none">
      h3 Heading
    </Heading>
    <Heading level={4} margin="none">
      h4 Heading
    </Heading>
    <Heading level={1} margin="none" size="small">
      h1 Heading
    </Heading>
    <Heading level={1} margin="none" weight="bold">
      h1 Heading
    </Heading>
    <Heading level={1} margin="none" color="black">
      h1 Heading
    </Heading>
    <Heading level={1} margin="none" style={{ color: 'black' }}>
      h1 Heading
    </Heading>
  </Box>
);
