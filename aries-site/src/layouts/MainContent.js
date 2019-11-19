import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

const MainContent = ({ children }) => {
  return <Box pad={{ horizontal: 'large', vertical: 'large' }}>{children}</Box>;
};

MainContent.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
};

export default MainContent;
