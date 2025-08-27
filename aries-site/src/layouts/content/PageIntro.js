import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

export const PageIntro = ({ children, ...rest }) => {
  return (
    <Box pad={{ vertical: 'medium' }} justify="center" {...rest}>
      {children}
    </Box>
  );
};

PageIntro.propTypes = {
  children: PropTypes.node.isRequired,
};
