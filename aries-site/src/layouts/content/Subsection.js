import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

export const Subsection = ({ children }) => {
  return (
    <Box margin={{ bottom: 'small' }} gap="small">
      {children}
    </Box>
  );
};

Subsection.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array])
    .isRequired,
};
