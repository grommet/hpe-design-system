import React from 'react';
import { Anchor, Box, Grid, List, Menu, Text, } from 'grommet';
import { More } from 'grommet-icons';

const futureDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + Math.random() * 100);
  return date.toISOString();
}

const scheduledActions = [
  { action: 'Update firmware', date: futureDate() },
  { action: 'Collect hardware inventory', date: futureDate() },
];

export const ScheduledActions: React.FC = () => {
  return (
    <List
      data={scheduledActions}
      defaultItemProps={{ pad: undefined }}
    >
      {datum => (
        <Grid columns={['small', 'small', 'xsmall', 'auto']} align="center" gap="medium">
          <Text color="text-strong" weight={500}>{datum.action}</Text>
          <Text textAlign='end'>
            {Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: "short" })
              .format(new Date(datum.date))}
          </Text>
          <Anchor label="1 server" href="#" />
          <Menu
            icon={<More />}
            items={[
              { label: 'Edit schedule', onClick: () => { } },
              { label: 'Remove', onClick: () => { } },
            ]}
          />
        </Grid>
      )}
    </List>
  );
}