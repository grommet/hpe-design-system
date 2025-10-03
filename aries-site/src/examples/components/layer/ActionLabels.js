import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from 'grommet';

export const ActionLabels = ({ bestPractice = true }) => (
  <Box direction="row" gap="xsmall" wrap>
    <Button label={`Apply ${bestPractice ? 'filters' : ''}`} primary />
    <Button label="Reset" secondary />
    <Button label="Cancel" />
  </Box>
);

ActionLabels.propTypes = {
  bestPractice: PropTypes.bool,
};
