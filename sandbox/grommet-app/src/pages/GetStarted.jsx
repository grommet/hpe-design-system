import PropTypes from 'prop-types';
import { Box, Grid, ResponsiveContext, Heading } from 'grommet';
import { DashboardCard } from '../components';
import { AppsRounded, UserAdd } from 'grommet-icons';
import { useContext } from 'react';
import { skeleton as skeletonAnimation, useLoading } from '../utils/skeleton';

export const GetStarted = ({ kind, heading }) => {
  const size = useContext(ResponsiveContext);
  const skeleton = useLoading(150);
  let kindStyles = {};
  if (kind === 'next')
    kindStyles = {
      container: {
        background: { color: 'background-primary-weak-default' },
        pad: 'xsmall',
        border: true,
        round: 'xsmall',
      },
      icon: {
        size: 'xlarge',
        color: 'icon-primary',
      },
    };
  return (
    <Box gap="medium" skeleton={skeleton ? skeletonAnimation : undefined}>
      {heading ? (
        <Heading level={1} size="small" margin="none">
          Get started
        </Heading>
      ) : undefined}
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
            !skeleton ? (
              <Box {...kindStyles.container}>
                <AppsRounded
                  size="xxlarge"
                  color="brand"
                  {...kindStyles.icon}
                />
              </Box>
            ) : undefined
          }
          level={2}
        />
        <DashboardCard
          title="Manage workspace"
          level={2}
          subtitle="Set up this workspace, users, access, and more."
          icon={
            !skeleton ? (
              <Box {...kindStyles.container}>
                <UserAdd color="purple" size="xxlarge" {...kindStyles.icon} />
              </Box>
            ) : undefined
          }
        />
      </Grid>
    </Box>
  );
};

GetStarted.propTypes = {
  heading: PropTypes.bool,
  kind: PropTypes.oneOf(['next', 'push']),
};
