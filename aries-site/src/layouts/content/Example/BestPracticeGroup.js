import React, { useContext } from 'react';
import { Grid, ResponsiveContext } from 'grommet';

export const BestPracticeGroup = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  let column;
  // on small and medium layout we want to use auto
  if (size !== 'medium' && !['xsmall', 'small'].includes(size)) {
    column = ['flex', 'flex'];
  } else column = 'auto';

  return (
    <Grid
      columns={column}
      gap={!['xsmall', 'small'].includes(size) ? 'xlarge' : 'none'}
      {...rest}
    />
  );
};
