import React from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';
import { Tile, Tiles } from 'aries-core';

export const PageIntro = ({ children, ...rest }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Box height={{ min: 'medium' }} justify="center">
      <Tiles
        gap={size !== 'small' ? 'large' : 'medium'}
        columns={{ count: 'fit', size: size !== 'small' ? 'medium' : 'fill' }}
        {...rest}
      >
        {/* Empty tile allows vertical space for background image to 
        show on mobile */}
        <Tile height="small" />
        <Tile>{children}</Tile>
      </Tiles>
    </Box>
  );
};

PageIntro.propTypes = {
  children: PropTypes.node.isRequired,
};
