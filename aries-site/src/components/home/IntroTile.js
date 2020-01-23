import React from 'react';

import { Tile } from 'aries-core';
import { Box, Heading, Paragraph, ResponsiveContext } from 'grommet';

export const IntroTile = () => (
  <Tile>
    <ResponsiveContext.Consumer>
      {size => (
        <Box align="start">
          <Heading level={size === 'medium' ? '2' : '1'} margin="none">
            Building experiences that advance the way people live and work.
          </Heading>
          <Paragraph size={size !== 'large' ? 'small' : undefined} fill>
            With deep roots in human-centered design, this is the way we share a
            single language for generating experiences that are inclusive and
            vibrant.
          </Paragraph>
          {/* <Button primary label="Get Started" /> */}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  </Tile>
);
