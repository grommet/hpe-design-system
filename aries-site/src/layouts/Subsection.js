import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

const Subsection = ({ children }) => {
  return <Box margin={{ bottom: 'small' }}>{children}</Box>;
};

Subsection.propTypes = {
  children: PropTypes.string.isRequired,
};

export default Subsection;
