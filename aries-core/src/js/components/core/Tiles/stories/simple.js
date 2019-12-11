import React from 'react';
import { Tile, Tiles } from 'aries-core';

import { Grommet, Box, Text, Anchor } from 'grommet';
import { hpeFont } from './prototype';

export default {
  title: 'Tiles',
};

const content = [
  'Shimi dev - Shimi Shimi Coco Puff.  ',
  'Taytay dev - All tiles in the Grid container are symetric.',
  'Gliss dev - Responsive works better with Grid.',
];

const TileCollection = () =>
  [0, 1, 2].map(index => (
    <Tile key={index} pad heading={`Tile ${index + 1}`}>
      {content[index]}
      {index === 0 && (
        <Anchor
          href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/CSS_Grid_and_Progressive_Enhancement"
          label="Learn more about Grid"
          margin={{ vertical: 'small' }}
        />
      )}
    </Tile>
  ));

export const Simple = () => (
  <Grommet theme={hpeFont} full>
    <Box margin="large">
      <Text margin="small">Tiles Container as Grid</Text>
      <Tiles rows="small" columns="small" gap="large">
        <TileCollection />
      </Tiles>
      <Box pad="medium" />
      <Text margin="small">Box Container</Text>
      <Box direction="row" gap="small">
        <TileCollection />
      </Box>
    </Box>
  </Grommet>
);
