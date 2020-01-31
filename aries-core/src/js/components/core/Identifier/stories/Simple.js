import React from 'react';

import { Grommet, Box } from 'grommet';
import { Node, Code, Reactjs } from 'grommet-icons';

import { Identifier, Tile, Tiles } from 'aries-core';
import { aries } from '../../../../../../../aries-site/src/themes/aries';

export default {
  title: 'Identifier',
};

const iconSizeMap = {
  xsmall: 'medium',
  small: 'large',
  medium: 'large',
  large: 'xlarge',
};

// eslint-disable-next-line react/prop-types
const BasicTile = ({ gap, direction, size, ...rest }) => (
  <Tile background="background-front" pad="small" alignSelf="center">
    <Identifier
      size={size}
      gap={gap || 'medium'}
      pad="small"
      direction={direction || 'row'}
      {...rest}
    >
      {gap && <Code size={iconSizeMap[size]} />}
      {direction && <Node size={iconSizeMap[size]} />}
      {!gap && !direction && <Reactjs size={iconSizeMap[size]} />}
    </Identifier>
  </Tile>
);

export const Basics = () => (
  <Grommet theme={aries}>
    <Box>
      <Tiles
        margin="large"
        gap="medium"
        columns={['medium', 'medium', 'medium']}
      >
        {/* Xsmall */}
        <BasicTile title="XSmall" subTitle="XSmall subTitle" size="xsmall" />
        <BasicTile
          title="XSmall"
          subTitle="XSmall gap"
          gap="xsmall"
          size="xsmall"
        />
        <BasicTile
          title="XSmall"
          subTitle="Column direction"
          size="xsmall"
          direction="column"
          align="left"
        />
        {/* Small */}
        <BasicTile title="Small" subTitle="Small subTitle" size="small" />
        <BasicTile
          title="Small"
          subTitle="Small gap"
          size="small"
          gap="small"
        />
        <BasicTile
          title="Small"
          subTitle="Column direction"
          size="small"
          direction="column"
          align="left"
        />
        {/* Medium */}
        <BasicTile title="Medium" subTitle="Medium subTitle" size="medium" />
        <BasicTile
          title="Medium"
          subTitle="Medium gap"
          size="medium"
          gap="medium"
        />
        <BasicTile
          title="Medium"
          subTitle="Column direction"
          size="medium"
          direction="column"
          align="left"
        />
        {/* Large */}
        <BasicTile title="Large" subTitle="Large subTitle" size="large" />
        <BasicTile
          title="Large"
          subTitle="Large gap"
          size="large"
          gap="large"
        />
        <BasicTile
          title="Large"
          subTitle="Column direction"
          size="large"
          direction="column"
          align="left"
        />
      </Tiles>
    </Box>
  </Grommet>
);
