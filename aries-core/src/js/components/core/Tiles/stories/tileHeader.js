import React from 'react';
import { Tile, Tiles } from 'aries-core';
import { storiesOf } from '@storybook/react';

import {
  Box,
  Button,
  Footer,
  Grommet,
  Header,
  Heading,
  Paragraph,
} from 'grommet';

import { More } from 'grommet-icons';
import { hpeFont } from './prototype';

export const TileHeader = () => (
  <Grommet theme={hpeFont} full>
    <Tiles margin="large">
      <Tile height="medium" width="medium">
        <Header pad="small">
          <Heading level={4} size="xsmall">
            Custom Header
          </Heading>
          <Button icon={<More color="control" />} onClick={() => {}} />
        </Header>
        <Box pad="small">
          <Paragraph>
            This custome Tile includes custom properties of: height, width &
            Heading. This Tile is built with the Grommet components of Header &
            Footer.
          </Paragraph>
        </Box>
        <Box flex />
        <Footer
          pad="medium"
          background="light-4"
          round={{ size: 'small', corner: 'bottom' }}
        >
          Hi! I'm a Footer
        </Footer>
      </Tile>
    </Tiles>
  </Grommet>
);

storiesOf('Tiles', module).add('Tile header', () => <TileHeader />);
