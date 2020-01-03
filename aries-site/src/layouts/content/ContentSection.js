import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';

export const ContentSection = ({ children, lastSection }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Box
      as="section"
      align="start"
      border={!lastSection ? { side: 'bottom' } : undefined}
      gap="medium"
      margin={
        !lastSection
          ? { bottom: size !== 'small' ? 'large' : 'xlarge' }
          : undefined
      }
      pad={{ bottom: size !== 'small' ? 'large' : 'xlarge' }}
      width="large"
    >
      {children}
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
