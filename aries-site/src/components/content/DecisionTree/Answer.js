import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from 'grommet';

export const Answer = ({ children, ...rest }) => (
  <Box align="center" {...rest}>
    <Text weight={500}>{children}</Text>
  </Box>
);

Answer.propTypes = {
  children: PropTypes.string,
};
