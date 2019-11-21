import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

export const SideBar = ({ children }) => {
  return <Box pad={{ horizontal: 'large', vertical: 'large' }}>{children}</Box>;
};

SideBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};
