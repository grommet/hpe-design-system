import React from 'react';
import { Box } from 'grommet';

export const ContentPane = ({ ...rest }) => (
  <Box background="background-front" pad="medium" round='xlarge' {...rest} />
);
