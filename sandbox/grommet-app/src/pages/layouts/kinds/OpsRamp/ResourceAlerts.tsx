import React from 'react';
import { Box, Text } from 'grommet';
import { Metric, metricSizes } from '../../../../components';
import {
  StatusGoodSmall,
  StatusCriticalSmall,
  StatusWarningSmall,
  StatusInfo,
  StatusPlaceholderSmall,
} from 'grommet-icons';

const AlertItem = ({ label, Icon, color, value, size }) => (
  <AlertMetric
    size={size}
    label={label}
    value={
      <Box direction="row" align="center" gap="xsmall">
        <Icon color={color} />
        <Text size={metricSizes[size].value} color="text-strong" weight={500}>
          {value}
        </Text>
      </Box>
    }
  />
);

const AlertMetric = ({ label, size, value }) => (
  <Metric
    align="center"
    label={label}
    value={value}
    unit={null}
    options={{}}
    reverse
    size={size}
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

export const ResourceAlerts = ({ size }) => {
  const alertData = [
    { label: 'All', Icon: StatusGoodSmall, color: 'status-ok', value: 12 },
    {
      label: 'Critical',
      Icon: StatusCriticalSmall,
      color: 'status-critical',
      value: 4,
    },
    {
      label: 'Warning',
      Icon: StatusWarningSmall,
      color: 'status-warning',
      value: 2,
    },
    { label: 'OK', Icon: StatusGoodSmall, color: 'status-ok', value: 0 },
    { label: 'Info', Icon: StatusInfo, value: 4 },
    {
      label: 'Observed',
      Icon: StatusPlaceholderSmall,
      value: 2,
    },
  ];

  return (
    <Box>
      <Text>Resource Alerts</Text>
      {/* // probably need a grid for responsive layout */}
      <Box justify="between" direction="row">
        {alertData.map(({ label, Icon, color, value }) => (
          <AlertItem
            key={label}
            label={label}
            Icon={Icon}
            color={color}
            value={value}
            size={size}
          />
        ))}
      </Box>
      <TicketNotesSummary />
    </Box>
  );
};
