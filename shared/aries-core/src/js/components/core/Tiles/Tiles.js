import React from 'react';

import { Grid } from 'grommet';

export const Tiles = ({ ...rest }) => (
  <Grid columns={{ count: 'fit', size: 'xsmall' }} {...rest} />
);
