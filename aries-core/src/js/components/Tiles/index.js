import React from 'react';

import { Box } from 'grommet';

// eslint-disable-next-line react/prop-types
export const Tiles = ({ children, ...rest }) => <Box {...rest}>{children}</Box>;
