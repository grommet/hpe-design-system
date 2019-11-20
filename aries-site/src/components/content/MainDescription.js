import React from 'react';
import PropTypes from 'prop-types';
import { Text } from 'grommet';

export const MainDescription = ({ children }) => {
  return <Text size="xlarge">{children}</Text>;
};

MainDescription.propTypes = {
  children: PropTypes.string.isRequired,
};
