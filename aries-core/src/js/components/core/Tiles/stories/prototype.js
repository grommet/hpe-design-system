import React from 'react';
import { Tile, Tiles } from 'aries-core';
import { storiesOf } from '@storybook/react';

import { grommet, Grommet, Box, Text } from 'grommet';
import { deepMerge } from 'grommet/utils';

// Should be removed once we'll finalize HPE theme
export const hpeFont = deepMerge(grommet, {
  global: {
    font: {
      family: "'Metric', Arial, sans-serif",
      face: `
          @font-face {
            font-family: "Metric";
            src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Regular.woff") format('woff');
          }
          @font-face {
            font-family: "Metric";
            src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Bold.woff") format('woff');
            font-weight: 700;
          }
          @font-face {
            font-family: "Metric";
            src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Semibold.woff") format('woff');
            font-weight: 600;
          }
          @font-face {
            font-family: "Metric";
            src: url("https://hpefonts.s3.amazonaws.com/web/MetricHPE-Web-Light.woff") format('woff');
            font-weight: 100;
          }
        `,
    },
  },
});

export const Prototype = () => (
  <Grommet theme={hpeFont} full>
    <Box pad="large" height="100%" background="light-2">
      <Tiles gap="medium" rows="small">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(value => (
          <Tile
            background="white"
            key={`Tile ${value}`}
            pad={{ horizontal: 'small', top: 'small' }}
            onClick={() => {}}
          >
            <Text size="small" weight="bold">
              Service Name
            </Text>
            <Text size="xsmall">Category Name</Text>
          </Tile>
        ))}
      </Tiles>
    </Box>
  </Grommet>
);

storiesOf('Tiles', module).add('Prototype', () => <Prototype />);
