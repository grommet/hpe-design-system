import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from 'grommet';

export const NavLink = ({ size, ...rest }) => {
  return <Anchor navItem size={size} {...rest} />;
};

NavLink.propTypes = {
  active: PropTypes.bool,
  size: PropTypes.oneOfType([
    PropTypes.oneOf(['medium', 'large']),
    PropTypes.string,
  ]),
};

NavLink.defaultProps = {
  size: 'large',
};
