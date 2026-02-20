import React from 'react';
import PropTypes from 'prop-types';
import { Box, Layer } from 'grommet';

export const Sidedrawer = ({ children, ...rest }) => (
  <Layer position="right" full="vertical" {...rest}>
    <Box pad="medium" gap="medium" overflow="auto">
      {children}
    </Box>
  </Layer>
);

Sidedrawer.propTypes = {
  children: PropTypes.node,
};
