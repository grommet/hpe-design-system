import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, Text } from 'grommet';

export const FooterLink = ({ children, label, size, ...rest }) => {
  const textColor = 'text-strong';

  return (
    <Anchor
      color={textColor}
      label={
        <Text size={size} weight="bold">
          {label || children}
        </Text>
      }
      {...rest}
    />
  );
};

FooterLink.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  size: PropTypes.string,
};

FooterLink.defaultProps = {
  size: 'small',
};
