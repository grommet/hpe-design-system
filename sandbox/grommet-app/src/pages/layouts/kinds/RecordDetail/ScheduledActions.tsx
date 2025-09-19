import React from 'react';
import { Anchor, Box, List, Menu, Text, } from 'grommet';
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

export const ScheduledActions = ({ ...rest }) => {
  return (
    <List
      data={scheduledActions}
      defaultItemProps={{ pad: undefined }}
      {...rest}
    >
      {datum => (
        <Box direction='row' align='center' gap={{ column: "medium" }} wrap>
          <Box width="xsmall">
            <Text color="text-strong" weight={500}>{datum.action}</Text>
          </Box>
          <Box direction='row' align="center" gap="medium">
            <Box
              // empirically tested for date widths
              width="11rem"
            >
              <Text textAlign='end'>
                {Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: "short" })
                  .format(new Date(datum.date))}
              </Text>
            </Box>
            <Anchor label="1 server" href="#" />
            <Menu
              icon={<More />}
              items={[
                { label: 'Edit schedule', onClick: () => { } },
                { label: 'Remove', onClick: () => { } },
              ]}
            />
          </Box>
        </Box>
      )
      }
    </List >
  );
}
