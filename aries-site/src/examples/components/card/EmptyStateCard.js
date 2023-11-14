import PropTypes from 'prop-types';
import { Box, Button, Heading, Text } from 'grommet';
import { StatusWarning } from 'grommet-icons';
import { DashboardCardTemplate } from './DashboardCardTemplate';

const EmptyStateBody = ({ level }) => {
  return (
    <DashboardCardTemplate
      level={level}
      title="Card Heading"
      subtitle="Optional subtitle"
    >
      <Box gap="medium" align="center">
        <StatusWarning size="xlarge" color="status-warning" />
        <Box>
          <Heading alignSelf="center" margin="none" level={3}>
            Unable to retrieve data
          </Heading>
          <Text textAlign="center">
            {' '}
            Try refreshing the browser window. If the problem persists, please
            submit a support request.
          </Text>
        </Box>
        <Button label="Submit support request" secondary />
      </Box>
    </DashboardCardTemplate>
  );
};

export const EmptyStateCard = () => <EmptyStateBody level={3} />;

EmptyStateBody.propTypes = {
    level: PropTypes.object,
};