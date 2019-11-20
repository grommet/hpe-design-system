import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

const ContentSection = ({ children, lastSection }) => {
  return (
    <Box border={!lastSection ? { side: 'bottom' } : undefined}>
      <Box pad={{ vertical: 'large' }} gap="medium" width="large">
        {children}
      </Box>
    </Box>
  );
};

ContentSection.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  lastSection: PropTypes.bool,
};

ContentSection.defaultProps = {
  lastSection: false,
};

export default ContentSection;
