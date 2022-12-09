import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Heading } from 'grommet';

export const ActionLabelTitle = ({ bestPractice = true }) => (
  <Box gap="medium">
    <Heading level={2} margin="none" size="small">
      Add pipeline
    </Heading>
    <Box pad="medium" border={{ style: 'dashed' }}>
      Body content goes here.
    </Box>
    <Box direction="row" gap="small">
      <Button label={`${bestPractice ? 'Add' : 'Create'} pipeline`} primary />
      <Button label="Cancel" />
    </Box>
  </Box>
);

ActionLabelTitle.propTypes = {
  bestPractice: PropTypes.bool,
};
