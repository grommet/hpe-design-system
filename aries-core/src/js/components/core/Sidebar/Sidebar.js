import React from 'react';
import PropTypes from 'prop-types';

import { Box } from 'grommet';

export const Sidebar = ({ children, header, ...rest }) => {
  return (
    <Box pad="small" gap="large" height={{ min: '100%' }} {...rest}>
      {header}
      <Box justify="between" align="center" fill="vertical">
        {children}
      </Box>
    </Box>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node,
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Sidebar.defaultProps = {
  children: undefined,
  header: undefined,
};
