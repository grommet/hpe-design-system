import React from 'react';

import { Tile } from 'aries-core';
import { Box, Heading, Paragraph } from 'grommet';

export const IntroTile = () => (
  <Tile>
    <Box align="start">
      <Heading margin="none">
        Building experiences that advance the way people live and work.
      </Heading>
      <Paragraph fill>
        With deep roots in human-centered design, the HPE Design System is our
        language for generating experiences that are inclusive and vibrant.
      </Paragraph>
    </Box>
  </Tile>
);
