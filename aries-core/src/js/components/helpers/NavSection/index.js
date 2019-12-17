/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Box, ResponsiveContext } from 'grommet';

export const NavSection = ({ children, lastSection }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Box
      border={
        !lastSection
          ? { side: size !== 'small' ? 'right' : 'bottom' }
          : undefined
      }
      pad={
        size !== 'small'
          ? {
              right: !lastSection ? 'medium' : undefined,
            }
          : undefined
      }
      direction={size !== 'small' ? 'row' : 'column'}
      gap="xsmall"
    >
      {children}
    </Box>
  );
};

NavSection.defaultProps = {
  lastSection: false,
};
