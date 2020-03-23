import React from 'react';
import PropTypes from 'prop-types';

import { Box } from 'grommet';

export const Sidebar = ({ children, header, ...rest }) => {
  return (
    <Box
      pad="medium"
      gap="large"
      fill="vertical"
      width="auto"
      height="100%"
      {...rest}
    >
      {header}
      {children}
    </Box>
  );
};

Sidebar.propTypes = {
  children: PropTypes.node,
  header: PropTypes.string,
};

Sidebar.defaultProps = {
  children: undefined,
  header: undefined,
};
