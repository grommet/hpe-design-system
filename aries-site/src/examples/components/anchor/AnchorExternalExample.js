import React from 'react';
import { Anchor, Box, Paragraph } from 'grommet';

export const AnchorExternalExample = () => {
  return (
    <Box align="center">
      <Paragraph>
        The HPE Design System is built with Grommet components. If you want to
        learn more, head over to the{' '}
        <Anchor
          label="Grommet website"
          href="https://grommet.io"
          target="_blank"
          rel="noopener"
        />
        .
      </Paragraph>
    </Box>
  );
};
