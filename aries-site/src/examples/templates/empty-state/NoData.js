import React, { useContext } from 'react';
import { EmptyState } from 'aries-core';
import { Anchor, Box, Button, Grid, ResponsiveContext } from 'grommet';
import { AccessDenied, ListingEmptyState } from '.';

export const NoData = () => {
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
      <ListingEmptyState />
      <AccessDenied />
      <EmptyState
        title="No branches found"
        description={`Let’s get started by creating a branch 
        in this repository.`}
        actions={
          <Box align="center" gap="xsmall">
            <Button label="New branch" primary />
            <Anchor label="What is a branch?" />
          </Box>
        }
        level={2}
      />
      <EmptyState
        title="No namespaces found"
        description={`There are no user created namespaces. 
        Once you have created one, it will be displayed here.`}
        level={2}
      />
    </Grid>
  );
};
