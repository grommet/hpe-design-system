import React from 'react';
import PropTypes from 'prop-types';
import { Box, Select, Text } from 'grommet';

export const PaginationStep = ({ step, onChange, ...rest }) => (
  <Box direction="row" align="center" gap="xsmall" {...rest}>
    <Text>Items per page</Text>
    <Box width="3xsmall">
      <Select
        options={[10, 20, 50, 100, 500]} // can be configured based on use case
        value={step}
        onChange={onChange}
      />
    </Box>
  </Box>
);

PaginationStep.propTypes = {
  step: PropTypes.number,
  onChange: PropTypes.func,
};
