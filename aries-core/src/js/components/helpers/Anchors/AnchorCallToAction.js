import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Anchor } from 'grommet';
import { Right } from '@hpe-design/icons-grommet';

export const AnchorCallToAction = forwardRef(
  ({ color, size, ...rest }, ref) => (
    <Anchor
      color={color}
      icon={<Right />}
      ref={ref}
      reverse
      size={size}
      {...rest}
    />
  ),
);

AnchorCallToAction.defaultProps = {
  color: 'brand',
  size: 'medium',
};

AnchorCallToAction.propTypes = {
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string,
    }),
  ]),
  size: PropTypes.string,
};
