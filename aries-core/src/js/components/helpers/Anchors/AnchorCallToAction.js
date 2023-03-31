import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Anchor } from 'grommet';
import { Next } from 'grommet-icons/icons/Next';

export const AnchorCallToAction = forwardRef(
  ({ color, size, ...rest }, ref) => (
    <Anchor
      color={color}
      icon={<Next />}
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
