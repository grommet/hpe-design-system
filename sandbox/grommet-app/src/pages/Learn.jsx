import PropTypes from 'prop-types';
import { Box, Heading } from 'grommet';
import { DashboardCard } from '../components';
import { skeleton as skeletonAnimation, useLoading } from '../utils/skeleton';

const data = [
  {
    title: 'Explore GreenLake',
    subtitle: 'Learn more about what the GreenLake platform has to offer.',
  },
  {
    title: 'HPE GreenLake Developer Portal',
    subtitle: 'Integrate apps and services.',
    external: true,
  },
  {
    title: "What's New on HPE GreenLake",
    subtitle: 'See the latest release information and announcements.',
  },
  {
    title: 'Test Drive HPE GreenLake',
    subtitle: 'Experience the edge-to-cloud. Try before you buy.',
    external: true,
  },
];

export const Learn = ({ inline }) => {
  const skeleton = useLoading(200);
  return (
    <Box gap="medium">
      <Heading level={2} margin="none">
        Learn
      </Heading>
      <Box gap="medium" skeleton={skeleton ? skeletonAnimation : undefined}>
        {data.map(datum => (
          <DashboardCard
            key={datum.title}
            {...datum}
            level={3}
            inline={inline}
          />
        ))}
      </Box>
    </Box>
  );
};

Learn.propTypes = {
  inline: PropTypes.bool,
};
