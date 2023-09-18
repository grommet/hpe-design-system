/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Box, ResponsiveContext } from 'grommet';

export const NavSection = ({ children, lastSection }) => {
  const size = useContext(ResponsiveContext);

  return (
    <Box
      border={
        !lastSection
          ? { side: !['xsmall', 'small'].includes(size) ? 'right' : 'bottom' }
          : undefined
      }
      pad={
        !['xsmall', 'small'].includes(size)
          ? {
              right: !lastSection ? 'medium' : undefined,
            }
          : undefined
      }
      direction={!['xsmall', 'small'].includes(size) ? 'row' : 'column'}
      gap="xsmall"
    >
      {children}
    </Box>
  );
};

NavSection.defaultProps = {
  lastSection: false,
};
