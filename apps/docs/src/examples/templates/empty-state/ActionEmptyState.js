import React, { useContext } from 'react';
import { EmptyState } from '@shared/aries-core';
import { Anchor, Box, Button, Grid, ResponsiveContext } from 'grommet';
import { Checkmark, Search } from '@hpe-design/icons-grommet';

export const ActionEmptyState = () => {
  const breakpoint = useContext(ResponsiveContext);
  return (
    <Grid
      columns={
        ['xsmall', 'small'].includes(breakpoint)
          ? ['auto']
          : { count: 2, size: 'xsmall' }
      }
      gap="3xlarge"
    >
      <EmptyState
        title="Success"
        description="Your message was successfully delivered."
        icon={<Checkmark color="icon-ok" />}
        actions={
          <Box align="center" gap="xsmall">
            <Button label="Return to dashboard" primary />
            <Anchor label="When will I hear back?" />
          </Box>
        }
        level={2}
      />
      <EmptyState
        title="All notifications cleared"
        description={`There are no further notifications 
        for you to view.`}
        icon={<Checkmark color="icon-ok" />}
        level={2}
      />
      <EmptyState
        title="No results found"
        description={`Please refine your search and 
        try again.`}
        icon={<Search />}
        level={2}
      />
    </Grid>
  );
};
