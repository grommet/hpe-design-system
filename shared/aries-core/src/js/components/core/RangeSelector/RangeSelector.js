import React from 'react';
import PropTypes from 'prop-types';
import { RangeSelector } from 'grommet';

const StyledRangeSelector = ({ color, ...rest }) => (
  <RangeSelector color={color} size="full" {...rest} />
);

StyledRangeSelector.propTypes = {
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string,
    }),
  ]),
};

StyledRangeSelector.defaultProps = {
  color: 'text',
};

export { StyledRangeSelector as RangeSelector };
