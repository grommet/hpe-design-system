import React, { useContext } from 'react';
import { Grid, ResponsiveContext } from 'grommet';
import { data, DashboardCard } from '.';

export function DashboardGrid({ ...rest }) {
  const size = useContext(ResponsiveContext);
  return (
    <Grid
      columns={!['xsmall', 'small'].includes(size) ? 'medium' : '100%'}
      rows={[['auto', 'full']]}
      gap="medium"
      fill
      {...rest}
    >
      {data &&
        data.map((datum, index) => <DashboardCard key={index} card={datum} />)}
    </Grid>
  );
}
