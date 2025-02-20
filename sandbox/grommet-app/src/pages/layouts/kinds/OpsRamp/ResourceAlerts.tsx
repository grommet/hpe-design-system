import React from 'react';
import { Box, Text } from 'grommet';
import { Metric } from '../../../../components';

const AlertMetric = ({ label, value }) => (
  <Metric
    align="center"
    label={label}
    unit={null}
    value={value}
    options={{}}
    reverse
    size="small"
  />
);

const TicketNotesSummary = () => (
  <Box pad={{ vertical: 'small' }} direction="row" gap="small">
    <Text>
      Tickets: <Text weight="bold">1</Text>
    </Text>
    <Text>
      Notes: <Text weight="bold">2</Text>
    </Text>
  </Box>
);

export const ResourceAlerts = () => (
  <>
    <Box pad={{ vertical: 'small' }}>
      <Text>Resource Alerts</Text>
    </Box>

    <Box
      pad={{ vertical: 'small', horizontal: 'medium' }}
      direction="row"
      gap="medium"
      alignSelf="center"
    >
      <AlertMetric label="All" value={12} />
      <AlertMetric label="Critical" value={4} />
      <AlertMetric label="Warning" value={2} />
      <AlertMetric label="OK" value={0} />
      <AlertMetric label="Info" value={4} />
      <AlertMetric label="Observed" value={2} />
    </Box>
    <TicketNotesSummary />
  </>
);
