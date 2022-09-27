import React from 'react';
import PropTypes from 'prop-types';
import { Box, Paragraph } from 'grommet';

export const Decision = ({ children, ...rest }) => (
  <Box round="large" background="purple!" pad="medium" border {...rest}>
    <Paragraph margin="none" color="text-strong">
      {children}
    </Paragraph>
  </Box>
);

Decision.propTypes = {
  children: PropTypes.string,
};
