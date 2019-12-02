import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Text } from 'grommet';

export const NavLink = ({ active, children, label, size, ...rest }) => {
  const activeTextColor = active ? 'text' : null;
  const defaultTextColor = 'text-weak';
  const [textColor, setTextColor] = useState(defaultTextColor);

  return (
    <Anchor
      color={activeTextColor || textColor}
      label={<Text weight="normal">{label || children}</Text>}
      onBlur={() => setTextColor(defaultTextColor)}
      onFocus={() => setTextColor(activeTextColor)}
      onMouseOut={() => setTextColor(defaultTextColor)}
      onMouseOver={() => setTextColor(activeTextColor)}
      size={size}
      {...rest}
    />
  );
};

NavLink.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  size: PropTypes.string,
};

NavLink.defaultProps = {
  size: 'medium',
};
