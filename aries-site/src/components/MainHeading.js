import React from 'react';
import PropTypes from 'prop-types';
import { Heading } from 'grommet';

export const MainHeading = ({ children }) => {
  return <Heading level={1}>{children}</Heading>;
};

MainHeading.propTypes = {
  children: PropTypes.string.isRequired,
};
