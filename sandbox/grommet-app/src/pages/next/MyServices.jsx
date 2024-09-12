import { List, Box, Text } from 'grommet';
import { DashboardCard } from '../../components';
import services from '../../mockData/services.json';

export const MyServices = () => {
  return (
    <DashboardCard title="My services" level={2}>
      <List
        data={services.services.slice(0, 5)}
        defaultItemProps={{
          pad: { horizontal: 'none', vertical: 'small' },
        }}
      >
        {datum => (
          <Box>
            <Text>{datum.name}</Text>
            <Text size="xsmall">{datum.category}</Text>
          </Box>
        )}
      </List>
    </DashboardCard>
  );
};
