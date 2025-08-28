import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { CircleAlert } from 'grommet-icons';

export const Error = ({ children, ...rest }) => (
  <Box
    animation="fadeIn"
    background="validation-critical"
    margin={{ bottom: 'medium' }}
    pad='xsmall'
    round="4px"
    width="medium"
  >
    <Box direction="row" gap='3xsmall' {...rest}>
      <CircleAlert size="small" />
      <Text size="xsmall">{children}</Text>
    </Box>
  </Box>
);

Error.propTypes = {
  children: PropTypes.string,
};
