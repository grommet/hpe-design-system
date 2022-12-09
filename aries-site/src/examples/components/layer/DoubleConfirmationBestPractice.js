import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';
import { LayerHeader } from './components';

export const DoubleConfirmationBestPractice = ({ bestPractice = true }) => (
  <Box round="small" elevation="large" pad="medium" gap="medium">
    <LayerHeader
      title={
        bestPractice
          ? 'Discard application?'
          : 'Are you sure you want to do this?'
      }
      subtitle="Your changes will not be applied."
    />
    <Box direction="row" gap="small" justify="end">
      <Button label="Cancel" />
      <Button label={bestPractice !== 'badLabel' ? 'Discard' : 'Yes'} primary />
    </Box>
  </Box>
);

DoubleConfirmationBestPractice.propTypes = {
  bestPractice: PropTypes.bool,
};
