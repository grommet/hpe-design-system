import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'grommet';

export const Subheading = ({ children, headingSize, level = 2 }) => (
  <Heading level={level} margin={{ vertical: 'none' }} size={headingSize}>
    {children}
  </Heading>
);

Subheading.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.number,
  headingSize: PropTypes.string,
};
