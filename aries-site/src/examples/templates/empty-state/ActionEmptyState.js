import React from 'react';
import { EmptyState } from 'aries-core';
import { Anchor, Box, Button, Grid } from 'grommet';
import { Checkmark, Search } from 'grommet-icons';

export const ActionEmptyState = () => {
  return (
    <Grid columns={{ count: 2, size: 'small' }} gap="xlarge" fill>
      <EmptyState
        title="Success"
        description="Your message was successfully delivered."
        icon={<Checkmark size="xlarge" color="green" />}
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
        for you to vie.`}
        icon={<Checkmark size="xlarge" color="green" />}
        level={2}
      />
      <EmptyState
        title="No results found"
        description={`Please refine your search and 
        try again.`}
        icon={<Search size="xlarge" />}
        level={2}
      />
    </Grid>
  );
};
