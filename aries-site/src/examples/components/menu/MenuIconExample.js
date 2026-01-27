import React from 'react';
import { Grid, Menu } from 'grommet';
import { More, Settings } from '@hpe-design/icons-grommet';

export const MenuIconExample = () => {
  const items = [{ label: 'Action' }, { label: 'Action' }, { label: 'Action' }];

  return (
    <Grid columns="3xsmall" gap="medium" align="start" justify="start">
      <Menu icon={<More />} hoverIndicator items={items} />
      <Menu icon={<Settings />} hoverIndicator items={items} />
    </Grid>
  );
};
