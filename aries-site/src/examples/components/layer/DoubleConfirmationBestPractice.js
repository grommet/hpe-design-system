import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import { LayerHeader } from 'aries-core';

export const DoubleConfirmationBestPractice = ({ bestPractice = true }) => (
  <Box
    background="background-floating"
    round="medium"
    elevation="large"
    pad="medium"
    gap="medium"
  >
    <LayerHeader
      title={
        bestPractice
          ? 'Discard application?'
          : 'Are you sure you want to do this?'
      }
      subtitle="Your changes will not be applied."
    />
    <Box direction="row" gap="xsmall" justify="end">
      <Button label="Cancel" />
      <Button label={bestPractice !== 'badLabel' ? 'Discard' : 'Yes'} primary />
    </Box>
  </Box>
);

DoubleConfirmationBestPractice.propTypes = {
  bestPractice: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(['badLabel']),
  ]),
};
