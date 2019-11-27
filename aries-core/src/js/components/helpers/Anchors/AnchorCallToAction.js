import React from 'react';
import PropTypes from 'prop-types';
import { Anchor } from 'grommet';
import { FormNext } from 'grommet-icons';

export const AnchorCallToAction = ({ color, ...rest }) => (
  <Anchor color={color} icon={<FormNext />} reverse {...rest} />
);

AnchorCallToAction.defaultProps = {
  color: 'brand',
};

AnchorCallToAction.propTypes = {
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string,
    }),
  ]),
};
