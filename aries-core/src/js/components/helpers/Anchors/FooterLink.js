import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Text } from 'grommet';

export const FooterLink = forwardRef(
  ({ active, children, label, size, ...rest }, ref) => {
    const activeTextColor = 'text-strong';
    const defaultTextColor = 'text-weak';
    const [textColor, setTextColor] = useState(
      active ? activeTextColor : defaultTextColor,
    );

    return (
      <Anchor
        color={textColor}
        label={
          <Text weight="normal" size={size} color={textColor}>
            {label || children}
          </Text>
        }
        onBlur={() => !active && setTextColor(defaultTextColor)}
        onFocus={() => !active && setTextColor(activeTextColor)}
        onMouseOut={() => !active && setTextColor(defaultTextColor)}
        onMouseOver={() => !active && setTextColor(activeTextColor)}
        ref={ref}
        {...rest}
      />
    );
  },
);
FooterLink.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  size: PropTypes.string,
};

FooterLink.defaultProps = {
  size: 'medium',
};
