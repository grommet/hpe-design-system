import React, { useContext } from 'react';
import { EmptyState } from 'library';
import { Anchor, Box, Button, Grid, ResponsiveContext } from 'grommet';
import { Checkmark, Search } from 'grommet-icons';

export const ActionEmptyState = () => {
  const breakpoint = useContext(ResponsiveContext);
  return (
    <Grid
      columns={
        ['xsmall', 'small'].includes(breakpoint)
          ? ['auto']
          : { count: 2, size: 'small' }
      }
      gap="xlarge"
    >
      <EmptyState
        title="Success"
        description="Your message was successfully delivered."
        icon={<Checkmark color="green" />}
        actions={
          <Box align="center" gap="small">
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
        icon={<Checkmark color="green" />}
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
