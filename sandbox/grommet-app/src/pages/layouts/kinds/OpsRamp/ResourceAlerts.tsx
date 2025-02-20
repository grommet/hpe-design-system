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

export const ResourceAlerts = ({ size }) => (
  <>
    <Box pad={{ vertical: 'small' }}>
      <Text>Resource Alerts</Text>
    </Box>

    <Box
      pad={{ vertical: 'small', horizontal: 'medium' }}
      direction="row"
      gap="medium"
    >
      <AlertMetric
        size={size}
        label="All"
        value={
          <Box direction="row" align="center" gap="xsmall">
            <StatusGoodSmall color="status-ok" />
            <Text
              size={metricSizes[size].value}
              color="text-strong"
              weight={500}
            >
              12
            </Text>
          </Box>
        }
      />
      <AlertMetric
        size={size}
        label="Critical"
        value={
          <Box direction="row" align="center" gap="xsmall">
            <StatusCriticalSmall color="status-critical" />
            <Text
              size={metricSizes[size].value}
              color="text-strong"
              weight={500}
            >
              4
            </Text>
          </Box>
        }
      />
      <AlertMetric
        size={size}
        label="Warning"
        value={
          <Box direction="row" align="center" gap="xsmall">
            <StatusWarningSmall color="status-warning" />
            <Text
              size={metricSizes[size].value}
              color="text-strong"
              weight={500}
            >
              2
            </Text>
          </Box>
        }
      />
      <AlertMetric
        size={size}
        label="OK"
        value={
          <Box direction="row" align="center" gap="xsmall">
            <StatusGoodSmall color="status-ok" />
            <Text
              size={metricSizes[size].value}
              color="text-strong"
              weight={500}
            >
              0
            </Text>
          </Box>
        }
      />
      <AlertMetric
        size={size}
        label="Info"
        value={
          <Box direction="row" align="center" gap="xsmall">
            <StatusInfo />
            <Text
              size={metricSizes[size].value}
              color="text-strong"
              weight={500}
            >
              4
            </Text>
          </Box>
        }
      />
      <AlertMetric
        size={size}
        label="Observed"
        value={
          <Box direction="row" align="center" gap="xsmall">
            <StatusPlaceholderSmall />
            <Text
              size={metricSizes[size].value}
              color="text-strong"
              weight={500}
            >
              2
            </Text>
          </Box>
        }
      />
    </Box>
    <TicketNotesSummary />
  </>
);
