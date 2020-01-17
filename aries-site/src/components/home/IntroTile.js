import React from 'react';

import { Tile } from 'aries-core';
import { Box, Heading, Paragraph, ResponsiveContext } from 'grommet';

export const IntroTile = () => (
  <Tile>
    <ResponsiveContext.Consumer>
      {size => (
        <Box align="start">
          <Heading level={size === 'medium' ? '2' : '1'} margin="none">
            Building experiences for the people that keep your customers happy
          </Heading>
          <Paragraph size={size !== 'large' ? 'small' : undefined} fill>
            The HPE Design System is the way Hewlett Packard Enterprise's brand,
            technology, and it's partners share a single language for
            application, web, and digital experiences to answer your customers
            needs-Look behind the element!
          </Paragraph>
          {/* <Button primary label="Get Started" /> */}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  </Tile>
);
