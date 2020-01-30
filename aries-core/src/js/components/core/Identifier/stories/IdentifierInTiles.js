import React from 'react';
import { storiesOf } from '@storybook/react';

import { Tile, Tiles } from 'aries-core';
import { ServicePlay } from 'grommet-icons';
import { Box, Grommet } from 'grommet';

import { aries } from '../../../../../../../aries-site/src/themes/aries';
import { Identifier } from '../Identifier';

const colors = ['blue', 'green', 'red', 'orange', 'teal', 'purple'];

export const IdentifierInTiles = () => (
  <Grommet theme={aries} full>
    <Box pad="xlarge" height="100%" gap="large">
      <Tiles gap="large" rows="small">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(value => (
          <Tile
            background={colors[value % 6]}
            key={`Tile ${value}`}
            pad={{ horizontal: 'small', top: 'medium' }}
            onClick={() => {}}
            alignContent="center"
          >
            <Identifier
              title={value > 10 ? 'Direction Row' : 'Service Name'}
              subTitle={value < 5 ? 'left' : 'center'}
              size="small"
              gap="medium"
              pad="small"
              align={value < 5 ? 'left' : 'center'}
              direction={value > 9 ? 'row' : 'column'}
            >
              <ServicePlay size="large" />
            </Identifier>
          </Tile>
        ))}
      </Tiles>
    </Box>
  </Grommet>
);

storiesOf('Identifier', module).add('Tiles', () => <IdentifierInTiles />);
