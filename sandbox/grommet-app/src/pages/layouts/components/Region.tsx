import React from 'react';
import { Box } from 'grommet';

export const Region = ({ ...rest }) => {
  return (
    <Box border={{ side: 'all', style: "dotted" }} {...rest} />
  );
}