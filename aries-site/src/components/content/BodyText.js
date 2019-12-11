import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'grommet';

// Body text size should be based on if its parent heading is an
// h2, h3, etc.
const TEXT_SIZE = {
  2: undefined, // use default text size
  3: 'small',
};

export const BodyText = ({ children, level, ...rest }) => {
  return (
    <Text size={TEXT_SIZE[level]} margin="none" {...rest}>
      {children}
    </Text>
  );
};

BodyText.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.number,
};

BodyText.defaultProps = {
  level: 2,
};
