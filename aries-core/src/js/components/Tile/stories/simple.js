import React from 'react';
import { Tile } from 'aries-core';

import { Grommet, Box } from 'grommet';
import { Sign } from 'grommet-icons';
import { hpeFont } from './prototype';

export default {
  title: 'Tile',
};

export const Simple = () => (
  <Grommet theme={hpeFont} full>
    <Box direction="row" gap="medium" pad="large">
      <Tile pad title="Tile 1">
        Shimi dev Shimi Shimi coco puff
        <Box pad="small">
          <Sign color="brand" />
        </Box>
      </Tile>
      <Tile pad title="Tile 2">
        Taytay dev all tiles in this container are symetric.
      </Tile>
      <Tile pad title="Tile 3">
        gliss dev
      </Tile>
    </Box>
  </Grommet>
);
