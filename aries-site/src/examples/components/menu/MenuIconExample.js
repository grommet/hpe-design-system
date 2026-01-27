import React from 'react';
import { Grid, Menu } from 'grommet';
import { More, Settings } from '@hpe-design/icons-grommet';

export const MenuIconExample = () => {
  const items = [{ label: 'Action' }, { label: 'Action' }, { label: 'Action' }];

  return (
    <Grid
      columns="3xsmall"
      gap="medium"
      height="xsmall"
      align="start"
      justify="start"
    >
      <Menu open icon={<More />} hoverIndicator items={items} />
      <Menu open icon={<Settings />} hoverIndicator items={items} />
    </Grid>
  );
};
