import React from 'react';

import { Tile } from 'aries-core';
import { Box, Heading, Paragraph } from 'grommet';

export const IntroTile = () => (
  <Tile>
    <Box align="start">
      <Heading margin="none">
        Mix, match, and stack cards to change the game
      </Heading>
      <Paragraph fill>
        The Carte Design System was created to empower designers, developer, and
        others to contribute in making great experiences for the customer. Carte
        means “card game” in Italian. Pick your cards and see what games you can
        play.
      </Paragraph>
    </Box>
  </Tile>
);
