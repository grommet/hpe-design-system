import React from 'react';
import PropTypes from 'prop-types';
import { Box, Card, CardBody, CardFooter, Meter, Stack, Text } from 'grommet';
import { Wifi } from 'grommet-icons';

const mockAvailability = 0.872;

export const CardMeterExample = () => (
  <Card
    background="background-front"
    onClick={() => {
      // eslint-disable-next-line no-alert
      alert(`
        Typically a click would route to a view with 
        greater detail behind this summary information.
        `);
    }}
    width="medium"
  >
    <CardBody gap="medium">
      <Identifier
        title="Availability"
        subtitle="Uptime - Last 30 Days"
        icon={<Wifi color="text-strong" size="large" />}
      />
      <Box flex align="center" justify="center">
        <KPIMeter
          id="metric-11"
          background="background-back"
          values={[
            {
              value: mockAvailability,
              color: 'graph-1',
              highlight: false,
              label: 'availability',
              onClick: '() => {}',
            },
          ]}
          max={1}
          type="bar"
          thickness="large"
        />
      </Box>
    </CardBody>
    <CardFooter>
      <KPISummary
        message={`${mockAvailability * 100}% vs. SLA 99.5%`}
        statusColor="status-critical"
      />
    </CardFooter>
  </Card>
);

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

const KPISummary = ({ message, statusColor }) => (
    <Box direction="row" align="center" gap="small">
      <Box background={statusColor} height="12px" width="12px" round />
      <Text>{message}</Text>
    </Box>
  );

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
