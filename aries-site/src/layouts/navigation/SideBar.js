import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

export const SideBar = ({ children }) => {
  return <Box pad={{ horizontal: 'large', vertical: 'large' }}>{children}</Box>;
};

SideBar.defaultProps = {
  /* eslint-disable-next-line react/default-props-match-prop-types */
  SideBar: true,
};

SideBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};
