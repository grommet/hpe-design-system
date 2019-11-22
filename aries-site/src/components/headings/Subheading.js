import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'grommet';

export const Subheading = ({ children }) => {
  return (
    <Heading level={2} margin={{ vertical: 'none' }}>
      {children}
    </Heading>
  );
};

Subheading.propTypes = {
  children: PropTypes.string.isRequired,
};
