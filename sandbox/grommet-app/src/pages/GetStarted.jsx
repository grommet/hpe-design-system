import PropTypes from 'prop-types';
import { Anchor, Box, Grid, Heading, ResponsiveContext } from 'grommet';
import { DashboardCard } from '../components';
import { AppsRounded, UserAdd } from 'grommet-icons';
import { useContext } from 'react';

export const GetStarted = ({ heading = true, kind }) => {
  const size = useContext(ResponsiveContext);

  let kindStyles = {};
  if (kind === 'next')
    kindStyles = {
      container: {
        background: { color: 'background-contrast' },
        pad: 'xsmall',
        border: true,
        round: 'xsmall',
      },
      icon: {
        size: 'xlarge',
        color: 'primary',
      },
    };
  return (
    <Box gap="medium">
      {heading && (
        <Box direction="row" justify="between">
          <Heading level={1} size="small" margin="none">
            Get started
          </Heading>
          {/* TO DO this should semantically be a button */}
          <Anchor label="Dismiss" />
        </Box>
      )}
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
            <Box background={{ dark: true }} {...kindStyles.container}>
              <AppsRounded
                size="xxlarge"
                color="primary"
                {...kindStyles.icon}
              />
            </Box>
          }
          level={3}
        />
        <DashboardCard
          title="Manage workspace"
          level={3}
          subtitle="Set up this workspace, users, access, and more."
          icon={
            <Box {...kindStyles.container}>
              <UserAdd color="purple" size="xxlarge" {...kindStyles.icon} />
            </Box>
          }
        />
      </Grid>
    </Box>
  );
};

GetStarted.propTypes = {
  heading: PropTypes.bool,
  kind: PropTypes.oneOfType(['next', 'push']),
};
