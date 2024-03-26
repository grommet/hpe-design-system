import PropTypes from 'prop-types';
import { Box, Grid, ResponsiveContext } from 'grommet';
import { DashboardCard } from '../components';
import { AppsRounded, UserAdd } from 'grommet-icons';
import { useContext } from 'react';
import { SkeletonContext } from '../components';

export const GetStarted = ({ kind }) => {
  const size = useContext(ResponsiveContext);
  const skeleton = useContext(SkeletonContext);
  let kindStyles = {};
  if (kind === 'next')
    kindStyles = {
      container: {
        background: { color: 'background-brand-weak' },
        pad: 'xsmall',
        border: true,
        round: 'xsmall',
      },
      icon: {
        size: 'xlarge',
        color: 'foreground-brand-default',
      },
    };
  return (
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
            <Box background={{ dark: true }} {...kindStyles.container}>
              <AppsRounded
                size="xxlarge"
                color="primary"
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
  );
};

GetStarted.propTypes = {
  kind: PropTypes.oneOf(['next', 'push']),
};
