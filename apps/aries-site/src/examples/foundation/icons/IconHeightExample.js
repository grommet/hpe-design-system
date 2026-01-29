import React from 'react';
import { Box, Paragraph } from 'grommet';
import { Add } from '@hpe-design/icons-grommet';

export const IconHeightExample = () => (
  <Box gap="medium">
    <Box direction="row" gap="xsmall" align="start">
      <Add height="medium" />
      <Paragraph margin="none">
        The icon uses height="medium" to align with the first line of text
      </Paragraph>
    </Box>
    <Box direction="row" gap="xsmall" align="start">
      <Add />
      <Paragraph margin="none">
        Without height="medium", the icon no longer aligns with the
        first line of text.
      </Paragraph>
    </Box>
      <Box direction="row" gap="xsmall" align="start">
      <Add size="large" height="large" />
      <Paragraph margin="none" size="large">
        The icon uses height="large" to align with paragraph size=large
      </Paragraph>
    </Box>
    <Box direction="row" gap="xsmall" align="start">
      <Add size="large"/>
      <Paragraph margin="none" size="large">
        Without height=&quot;large&quot;, the icon no longer aligns with the
        first line of text.
      </Paragraph>
    </Box>
  </Box>
);
