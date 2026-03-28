import React, { useContext } from 'react';
import { Grid, ResponsiveContext } from 'grommet';
import { data, DashboardCard } from '.';

export const DashboardGrid = ({ ...rest }) => {
  const size = useContext(ResponsiveContext);
  return (
    <Grid
      columns={!['xsmall', 'small'].includes(size) ? 'medium' : '100%'}
      gap="medium"
      {...rest}
    >
      {data &&
        data.map((datum, index) => <DashboardCard key={index} card={datum} />)}
    </Grid>
  );
};
