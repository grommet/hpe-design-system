import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

export const LayerPreview = ({ center }) =>
  !center ? (
    <Box fill direction="row">
      <Box basis="3/4" background="background-contrast" />
      <Box basis="1/4" background="background-back" />
    </Box>
  ) : (
    <Box background="background-contrast" fill align="center" justify="center">
      <Box
        background="background-back"
        width='3xsmall'
        pad={{ vertical: 'medium' }}
        round="xsmall"
      />
    </Box>
  );

LayerPreview.propTypes = {
  center: PropTypes.bool,
};
