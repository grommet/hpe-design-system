import React from 'react';

import { grommet, Box, Heading, Grommet, Paragraph } from 'grommet';

export const Header = () => (
  <Grommet theme={grommet}>
    <Box pad="small">
      <Heading level={3}>
        <strong>Hello World</strong>
      </Heading>
      <Paragraph>
        Hello from Aries! In order to understand how monorepo works in-action,
        change the Header component on aries-core and see how it immediately
        impacts aries-site.
      </Paragraph>
    </Box>
  </Grommet>
);
