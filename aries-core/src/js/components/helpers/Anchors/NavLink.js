import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Text } from 'grommet';

export const NavLink = ({ active, children, label, size, ...rest }) => {
  const textColor = 'text-strong';
  const activeFontWeight = 700;
  const defaultFontWeight = 400;
  const [fontWeight, setFontWeight] = useState(active ? activeFontWeight : defaultFontWeight);

  return (
    <Anchor
      color={textColor}
      label={
        <Text size={size} weight={fontWeight}>
          {label || children}
        </Text>
      }
      onBlur={() => setFontWeight(defaultFontWeight)}
      onFocus={() => setFontWeight(activeFontWeight)}
      onMouseOut={() => setFontWeight(defaultFontWeight)}
      onMouseOver={() => setFontWeight(activeFontWeight)}
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
