import React, { useContext } from 'react';
import { Grid, ResponsiveContext } from 'grommet';

export const BestPracticeGroup = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  let column;
  // on small and medium layout we want to use auto
  if (size !== 'medium' && size !== 'small') {
    column = ['1/2', '1/2'];
  } else column = 'auto';

  return (
    <Grid
      columns={column}
      gap={size !== 'small' ? 'large' : 'none'}
      {...rest}
    />
  );
};
