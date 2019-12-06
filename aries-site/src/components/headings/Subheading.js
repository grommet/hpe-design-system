import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'grommet';

<<<<<<< HEAD
export const Subheading = ({ children, headingSize, level }) => {
  return (
    <Heading level={level} margin={{ vertical: 'none' }} size={headingSize}>
=======
export const Subheading = ({ children, ...rest }) => {
  return (
    <Heading level={2} margin={{ vertical: 'none' }} {...rest}>
>>>>>>> master
      {children}
    </Heading>
  );
};

Subheading.propTypes = {
  children: PropTypes.string.isRequired,
  level: PropTypes.number,
  headingSize: PropTypes.string,
};

Subheading.defaultProps = {
  level: 2,
  headingSize: undefined,
};
