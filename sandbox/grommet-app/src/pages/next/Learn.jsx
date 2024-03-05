import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import { DashboardCard } from '../../components';

export const Learn = ({ inline }) => {
  return (
    <Box gap="medium">
      <Heading level={2} margin="none">
        Learn
      </Heading>
      <DashboardCard
        title="Explore GreenLake"
        level={3}
        subtitle="Learn more about what the GreenLake platform has to offer."
        inline={inline}
      />
      <DashboardCard
        title="HPE GreenLake Developer Portal"
        level={3}
        subtitle="Integrate apps and services."
        inline={inline}
      />
    </Box>
  );
};

Learn.propTypes = {
  inline: PropTypes.bool,
};
