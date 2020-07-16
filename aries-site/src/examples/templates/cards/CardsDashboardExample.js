import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Chart,
  Grid,
  Meter,
  Stack,
  Text,
} from 'grommet';
import { Wifi } from 'grommet-icons';

import { cardSize } from './cardVariants';

const mockData = Array(30)
  .fill()
  .map((_, index) => {
    return {
      value: [index, Math.random() * 100],
    };
  });

const capacityWarnings = mockData.filter(datum => datum.value[1] >= 50).length;

const mockAvailability = 0.958;

const gradient = [
  { value: 0, color: 'status-ok' },
  { value: 33, color: 'status-ok' },
  { value: 67, color: 'status-warning' },
  { value: 85, color: 'status-critical' },
];

const dashboardItems = [
  {
    identfier: {
      title: 'Network Traffic',
      subtitle: 'Bandwidth Utilization - Last 30 Days',
      icon: <Wifi size="large" />,
    },
    body: () => (
      <Box margin={{ top: 'medium' }}>
        <KPIChart id="metric-10" data={mockData} type="line" color={gradient} />
      </Box>
    ),
    footer: () => (
      <KPISummary
        message={`${capacityWarnings} instances exceeding target`}
        statusColor="status-warning"
      />
    ),
  },
  {
    identfier: {
      title: 'Availability',
      subtitle: 'Uptime - Last 30 Days',
      icon: <Wifi size="large" />,
    },
    body: () => (
      <Box flex align="center" justify="center">
        <KPIMeter
          id="metric-11"
          values={[
            {
              value: mockAvailability,
              color: 'graph-1',
              highlight: false,
              label: 'availability',
              onClick: '() => {}',
              onHover: '(true) => {}',
            },
          ]}
          max={1}
          type="bar"
          thickness="large"
          background="background-back"
        />
      </Box>
    ),
    footer: () => (
      <KPISummary
        message={`${mockAvailability * 100}% vs. SLA 99.5%`}
        statusColor="status-critical"
      />
    ),
  },
  {
    identfier: {
      title: 'Throughput',
      subtitle: '% Delivery - Last 30 Days',
      icon: <Wifi size="large" />,
    },
    body: () => (
      <Box flex align="center" justify="center">
        <KPIChart
          id="metric-12"
          data={mockData}
          type="bar"
          thickness="small"
          color="graph-2"
        />
      </Box>
    ),
    footer: () => <KPISummary statusColor="status-ok" />,
  },
];

export const CardsDashboardExample = () => {
  return (
    <Box background="background-back" overflow="auto" pad="medium" fill>
      <Grid columns={{ count: 'fit', size: cardSize }} gap="medium">
        {dashboardItems &&
          dashboardItems.map((item, index) => {
            const { identfier, body, footer } = item;

            return (
              <Card
                key={index}
                onClick={() => {
                  // eslint-disable-next-line no-alert
                  alert(
                    `Typically a click would route to a view with 
                  greater detail behind this summary information.`,
                  );
                }}
              >
                <CardBody>
                  <Identifier
                    title={identfier.title}
                    subtitle={identfier.subtitle}
                    icon={identfier.icon}
                  />
                  {body()}
                </CardBody>
                <CardFooter>{footer()}</CardFooter>
              </Card>
            );
          })}
      </Grid>
    </Box>
  );
};

const Identifier = ({ title, subtitle, icon }) => (
  <Box direction="row" gap="small">
    <Box pad={{ vertical: 'xsmall' }}>{icon}</Box>
    <Box>
      <Text color="text-strong" size="xlarge" weight="bold">
        {title}
      </Text>
      <Text>{subtitle}</Text>
    </Box>
  </Box>
);

Identifier.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  icon: PropTypes.node,
};

const KPIChart = ({ data, ...rest }) => (
  <Chart
    a11yTitle="Chart displaying network traffic"
    type="line"
    thickness="xxsmall"
    values={data}
    size={{ height: 'xsmall' }}
    {...rest}
  />
);

KPIChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.array,
    }),
  ),
};

const KPIMeter = ({ values, ...rest }) => {
  const { value } = values[0];

  return (
    <Stack anchor="right">
      <Box pad={{ right: 'xlarge' }}>
        <Meter
          a11yTitle="Meter displaying network availability"
          values={values}
          {...rest}
        />
      </Box>
      <Box margin="small">
        <Text size="xlarge" weight="bold">
          {value * 100}%
        </Text>
      </Box>
    </Stack>
  );
};

KPIMeter.propTypes = {
  values: PropTypes.arrayOf(PropTypes.object),
};

const KPISummary = ({ message, statusColor }) => {
  return (
    <Box direction="row" align="center" gap="small">
      <Box background={statusColor} height="12px" width="12px" round />
      <Text>{message}</Text>
    </Box>
  );
};

KPISummary.propTypes = {
  message: PropTypes.string,
  statusColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string,
    }),
  ]),
};
