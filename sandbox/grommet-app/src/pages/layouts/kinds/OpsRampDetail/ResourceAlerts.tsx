import React from 'react';
import { Anchor, Grid, Box, Text, ResponsiveContext } from 'grommet';
import { Metric, metricSizes } from '../../../../components';
import {
  StatusGoodSmall,
  StatusCriticalSmall,
  StatusWarningSmall,
  StatusInfo,
  StatusPlaceholderSmall,
} from 'grommet-icons';

interface AlertItemProps {
  label: string;
  Icon: React.ComponentType<{ color?: string }>;
  color: string;
  value: number;
  size: string;
}

const AlertItem: React.FC<AlertItemProps> = ({
  label,
  Icon,
  color,
  value,
  size,
}) => (
  <AlertMetric
    size={size}
    label={label}
    value={
      <Box direction="row" align="center" gap='3xsmall'>
        <Icon color={color} />
        <Text size={metricSizes[size].value} color="text-strong" weight={500}>
          {value}
        </Text>
      </Box>
    }
  />
);

interface AlertMetricProps {
  label: string;
  size: string;
  value: JSX.Element;
}

const AlertMetric: React.FC<AlertMetricProps> = ({ label, size, value }) => (
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

const TicketNotesSummary: React.FC = () => (
  <Box pad={{ vertical: 'xsmall' }} direction="row" gap='xsmall'>
    <Text>
      Tickets: <Anchor href="#">1</Anchor>
    </Text>
    <Text>
      Notes: <Anchor href="#">2</Anchor>
    </Text>
  </Box>
);

interface ResourceAlertsProps {
  size: string;
}

export const ResourceAlerts: React.FC<ResourceAlertsProps> = ({ size }) => {
  const alertData = [
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

  let columns;
  const breakpoint = React.useContext(ResponsiveContext);
  if (
    breakpoint === 'xsmall' ||
    breakpoint === 'small' ||
    breakpoint === 'xlarge'
  ) {
    columns = {
      count: 5,
      size: 'auto',
    };
  } else if (breakpoint === 'large') {
    columns = {
      count: 3,
      size: 'auto',
    };
  } else {
    columns = 'xsmall';
  }

  return (
    <Box>
      <Text size="small">Resource Alerts</Text>
      {/* in design the pad is 18px */}
      <Grid pad='xsmall' columns={columns}>
        {alertData.map(({ label, Icon, color, value }) => (
          <AlertItem
            key={label}
            label={label}
            Icon={Icon}
            color={color || 'text-strong'}
            value={value}
            size={size}
          />
        ))}
      </Grid>
      <TicketNotesSummary />
    </Box>
  );
};
