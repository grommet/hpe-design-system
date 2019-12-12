import React from 'react';
import PropTypes from 'prop-types';
import { Paragraph } from 'grommet';

// Body text size should be based on if its parent heading is an
// h2, h3, etc.
const TEXT_SIZE = {
  1: 'large',
  2: 'medium', // default font size
  3: 'small',
};

export const BodyText = ({ children, level, size, ...rest }) => {
  return (
    <Paragraph
      size={size || TEXT_SIZE[level]}
      fill
      color="text-weak"
      margin="none"
      {...rest}
    >
      {children}
    </Paragraph>
  );
};

BodyText.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.number,
  size: PropTypes.string,
};

BodyText.defaultProps = {
  level: 2,
  size: undefined,
};
