import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'grommet';

export const Subheading = ({ children, ...rest }) => {
  return (
    <Heading level={2} margin={{ vertical: 'none' }} {...rest}>
      {children}
    </Heading>
  );
};

Subheading.propTypes = {
  children: PropTypes.string.isRequired,
};
