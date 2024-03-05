import { Box, Heading } from 'grommet';
import PropTypes from 'prop-types';
import { DashboardCard } from '../../components';
import { Tree, History, Robot } from 'grommet-icons';

export const Recommended = ({ inline }) => {
  return (
    <Box gap="medium">
      <Heading level={2} margin="none">
        Recommended for you
      </Heading>
      <DashboardCard
        title="Machine Learning"
        icon={<Robot size="xxlarge" />}
        subtitle="Bring DevOps features to the machine learning lifecycle."
        level={3}
        inline={inline}
      />
      <DashboardCard
        title="Backup & Recovery"
        icon={<History size="xxlarge" />}
        subtitle="Data protection as a service that’s secure & reliable."
        level={3}
        inline={inline}
      />
      <DashboardCard
        title="Data Fabric"
        icon={<Tree size="xxlarge" />}
        subtitle="Accelerate configuring, monitoring, and managing storage fabrics."
        level={3}
        inline={inline}
      />
    </Box>
  );
};

Recommended.propTypes = {
  inline: PropTypes.bool,
};
