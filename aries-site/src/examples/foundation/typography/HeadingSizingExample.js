import React from 'react';
import { Box, Heading } from 'grommet';

export const HeadingSizingExample = () => (
    <Box gap="large">
      <Box gap="medium">
        <Heading level={1} size="medium" margin="none">
          h1 default
        </Heading>
        <Heading level={2} size="medium" margin="none">
          h2 default
        </Heading>
        <Heading level={3} size="medium" margin="none">
          h3 default
        </Heading>
        <Heading level={4} size="medium" margin="none">
          h4 default
        </Heading>
      </Box>
      <Box gap="medium">
        <Heading level={1} size="xlarge" margin="none">
          h1 xlarge
        </Heading>
        <Heading level={2} size="xlarge" margin="none">
          h2 xlarge
        </Heading>
        <Heading level={3} size="xlarge" margin="none">
          h3 xlarge
        </Heading>
        <Heading level={4} size="xlarge" margin="none">
          h4 xlarge
        </Heading>
      </Box>
      <Box gap="medium">
        <Heading level={1} size="large" margin="none">
          h1 large
        </Heading>
        <Heading level={2} size="large" margin="none">
          h2 large
        </Heading>
        <Heading level={3} size="large" margin="none">
          h3 large
        </Heading>
        <Heading level={4} size="large" margin="none">
          h4 large
        </Heading>
      </Box>
      <Box gap="medium">
        <Heading level={1} size="small" margin="none">
          h1 small
        </Heading>
        <Heading level={2} size="small" margin="none">
          h2 small
        </Heading>
        <Heading level={3} size="small" margin="none">
          h3 small
        </Heading>
        <Heading level={4} size="small" margin="none">
          h4 small
        </Heading>
      </Box>
    </Box>
  );
