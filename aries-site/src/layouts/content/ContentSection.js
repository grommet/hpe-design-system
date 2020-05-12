import React from 'react';
import { Box } from 'grommet';

export const ContentSection = ({ ...rest }) => (
  <Box
    as="section"
    // align="start"
    gap="medium"
    pad={{
      bottom: 'medium',
      horizontal: 'xxsmall',
      top: 'large',
    }}
    {...rest}
  />
);
