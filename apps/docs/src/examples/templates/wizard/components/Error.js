import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';
import { Alert } from '@hpe-design/icons-grommet';

export const Error = ({ children, ...rest }) => (
  <Box
    animation="fadeIn"
    background="validation-critical"
    margin={{ bottom: 'medium' }}
    pad="xsmall"
    round="4px"
    width="medium"
  >
    <Box direction="row" gap="3xsmall" {...rest}>
      <Alert size="small" />
      <Text size="xsmall">{children}</Text>
    </Box>
  </Box>
);

Error.propTypes = {
  children: PropTypes.string,
};
