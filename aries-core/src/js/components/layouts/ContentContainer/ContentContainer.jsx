import React from 'react';
import { Box } from 'grommet';

export const ContentContainer = ({ ...rest }) => {
  return (
    <Box background="background-front" pad="medium" round="medium" {...rest} />
  );
};
