import React from 'react';
import { Box } from 'grommet';

export const ContentSection = ({ ...rest }) => (
  <Box
    as="section"
    pad={{
      bottom: 'medium',
      horizontal: 'xxsmall',
      top: 'large',
    }}
    {...rest}
  />
);
