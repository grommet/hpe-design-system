import React from 'react';
import { Tile } from 'aries-core';
import { storiesOf } from '@storybook/react';

import { grommet, Grommet, Box, Text } from 'grommet';
import { deepMerge } from 'grommet/utils';
// import { hpe } from 'grommet-theme-hpe';

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
    <Box
      fill
      direction="row-responsive"
      gap="medium"
      pad="large"
      background="light-2"
    >
      {[1, 2, 3, 4].map(value => (
        <Tile
          background="white"
          height="small"
          width="small"
          elevation="none"
          key={`Tile ${value}`}
          pad={{ horizontal: 'small', top: 'small' }}
        >
          <Text size="small" weight="bold">
            Service Name
          </Text>
          <Text size="xsmall">Category Name</Text>
        </Tile>
      ))}
    </Box>
  </Grommet>
);

storiesOf('Tile', module).add('Prototype', () => <Prototype />);
