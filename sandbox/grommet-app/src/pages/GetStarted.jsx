import { Anchor, Box, Grid, Heading, ResponsiveContext } from 'grommet';
import { DashboardCard } from '../components';
import { AppsRounded, UserAdd } from 'grommet-icons';
import { useContext } from 'react';

export const GetStarted = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Box gap="medium">
      <Box direction="row" justify="between">
        {/* TO DO is this the h1? */}
        <Heading level={2} margin="none">
          Get started
        </Heading>
        {/* TO DO this should semantically be a button */}
        <Anchor label="Dismiss" />
      </Box>
      <Grid
        columns={
          ['medium', 'small', 'xsmall'].includes(size)
            ? ['auto']
            : ['flex', 'flex']
        }
        gap="medium"
      >
        <DashboardCard
          title="Find services"
          subtitle="Discover and launch services from our catalog."
          icon={
            // TO DO is this override fine?
            <Box background={{ dark: true }}>
              <AppsRounded size="xxlarge" color="green" />
            </Box>
          }
          level={3}
        />
        <DashboardCard
          title="Manage workspace"
          level={3}
          subtitle="Set up this workspace, users, access, and more."
          icon={<UserAdd color="purple" size="xxlarge" />}
        />
      </Grid>
    </Box>
  );
};
