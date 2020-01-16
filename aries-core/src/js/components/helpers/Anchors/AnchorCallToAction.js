import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Anchor } from 'grommet';
import { FormNext } from 'grommet-icons';

export const AnchorCallToAction = forwardRef(
  ({ color, size, ...rest }, ref) => (
    <Anchor
      color={color}
      icon={<FormNext />}
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
