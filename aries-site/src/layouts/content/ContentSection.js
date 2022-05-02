import React from 'react';
import { Box } from 'grommet';

export function ContentSection({ ...rest }) {
  return <Box
    as="section"
    pad={{
      bottom: 'medium',
      horizontal: 'xxsmall',
      top: 'large',
    }}
    {...rest}
  />;
}
