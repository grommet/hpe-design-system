import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';

const ContentSection = ({ children, lastSection }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Box border={!lastSection ? { side: 'bottom' } : undefined}>
      <Box
        pad={{ vertical: size !== 'small' ? 'large' : 'xlarge' }}
        gap="medium"
        width="large"
      >
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
