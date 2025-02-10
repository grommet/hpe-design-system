import { Box, Heading } from 'grommet';
import PropTypes from 'prop-types';
import { DashboardCard } from '../components';
import { Tree, History, Robot } from 'grommet-icons';
import { useContext } from 'react';
import { SkeletonContext } from '../components';

export const Recommended = ({ inline }) => {
  const skeleton = useContext(SkeletonContext);
  return (
    <Box gap="medium">
      <Heading level={2} margin="none">
        Recommended for you
      </Heading>
      <Box gap="medium" skeleton={skeleton}>
        <DashboardCard
          title="Machine Learning"
          icon={<Robot size="xlarge" />}
          subtitle="Bring DevOps features to the machine learning lifecycle."
          level={3}
          inline={inline}
          hideCta={inline}
        />
        <DashboardCard
          title="Backup & Recovery"
          icon={<History size="xlarge" />}
          subtitle="Data protection as a service that’s secure & reliable."
          level={3}
          inline={inline}
          hideCta={inline}
        />
        <DashboardCard
          title="Data Fabric"
          icon={<Tree size="xlarge" />}
          subtitle="Accelerate configuring, monitoring, and managing storage fabrics."
          level={3}
          inline={inline}
          hideCta={inline}
        />
      </Box>
    </Box>
  );
};

Recommended.propTypes = {
  inline: PropTypes.bool,
};
