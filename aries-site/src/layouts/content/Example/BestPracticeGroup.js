import React, { useContext } from 'react';
import { Grid, ResponsiveContext } from 'grommet';

export const BestPracticeGroup = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid
      columns={size !== 'small' ? ['1/2', '1/2'] : 'auto'}
      gap={size !== 'small' ? 'large' : 'none'}
      {...rest}
    />
  );
};
