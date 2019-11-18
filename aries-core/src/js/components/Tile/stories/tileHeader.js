import React from 'react';
import { Tile } from 'aries-core';
import { storiesOf } from '@storybook/react';

import { Button, Grommet, Heading, Box, Paragraph } from 'grommet';
import { More } from 'grommet-icons';
import { hpeFont } from './prototype';

export const TileHeader = () => (
  <Grommet theme={hpeFont} full>
    <Box direction="row" gap="large" pad="large">
      <Tile pad={false} height="medium" width="medium">
        <Box
          pad="small"
          tag="header"
          direction="row"
          justify="between"
          align="center"
        >
          <Heading level={4} size="xsmall" margin="none">
            Custom Tile
          </Heading>
          <Button icon={<More color="control" />} />
        </Box>
        <Box pad="small">
          <Paragraph>
            This 'Custome Tile' includes custom properties of: height, width,
            pad & heading. It also includes a footer. Header & Footer can be
            refactored to use the future components of Header and Footer.
          </Paragraph>
        </Box>
        <Box flex />
        <Box pad="small" background="light-4" fill="horizontal">
          Hi! I'm a footer
        </Box>
      </Tile>
    </Box>
  </Grommet>
);

storiesOf('Tile', module).add('Tile header', () => <TileHeader />);
