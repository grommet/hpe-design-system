/* eslint-disable react/prop-types */
import React from 'react';

import { Box, Heading } from 'grommet';

export const Tile = ({ children, title, pad, ...rest }) => {
  const tilePad =
    pad === true ? { horizontal: 'small', top: 'small', bottom: 'small' } : pad;

  return (
    <Box
      height="small"
      width="small"
      elevation="medium"
      round="small"
      {...rest}
    >
      <Box
        tag="header"
        pad={tilePad}
        direction="row"
        justify="between"
        align="center"
      >
        {title && (
          <Heading level={3} size="xsmall" margin="none">
            {title}
          </Heading>
        )}
      </Box>
      <Box flex pad={tilePad}>
        {children}
      </Box>
    </Box>
  );
};
