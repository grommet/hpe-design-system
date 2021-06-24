import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Card, CardBody, CardFooter, Chart, Text, Stack } from 'grommet';
import { Wifi } from 'grommet-icons';

const mockData = Array(30)
  .fill()
  .map((_, index) => ({
    value: [index, Math.random() * 100],
  }));

const capacityWarnings = mockData.filter(datum => datum.value[1] >= 50).length;

const gradient = [
  { value: 0, color: 'status-ok' },
  { value: 33, color: 'status-ok' },
  { value: 67, color: 'status-warning' },
  { value: 85, color: 'status-critical' },
];

const StyledCard = styled(Card)`
  transition: all 0.3s ease-in-out;
`;

export const CardExample = () => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <StyledCard
      background="background-front"
      elevation={isFocused ? 'medium' : 'small'}
      onClick={() => {
        // eslint-disable-next-line no-alert
        alert(`
        Typically a click would route to a view with 
        greater detail behind this summary information.
        `);
      }}
      onBlur={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onMouseOut={() => setIsFocused(false)}
      onMouseOver={() => setIsFocused(true)}
      width="medium"
    >
      <CardBody pad="none">
        <Identifier
          title="Network Traffic"
          subtitle="Bandwidth Utilization - Last 30 Days"
          icon={<Wifi size="large" color="text-strong" />}
        />
        <Box margin={{ top: 'medium' }}>
          <KPIChart id="metric-0" data={mockData} />
        </Box>
      </CardBody>
      <CardFooter background="background-back">
        <KPISummary instances={capacityWarnings} statusColor="status-warning" />
      </CardFooter>
    </StyledCard>
  );
};

const Identifier = ({ title, subtitle, icon }) => (
  <Box
    direction="row"
    gap="medium"
    align="center"
    pad={{ horizontal: 'medium', top: 'medium' }}
  >
    <Box pad={{ vertical: 'xsmall' }}>{icon}</Box>
    <Box>
      <Text color="text-strong" size="xxlarge" weight="bold">
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
  <Stack>
    <Chart
      type="area"
      thickness="xxsmall"
      values={data}
      color="background-back"
      size={{ height: 'xsmall' }}
      {...rest}
    />
    <Chart
      a11yTitle="Card displaying network traffic"
      type="line"
      thickness="xxsmall"
      values={data}
      color={gradient}
      size={{ height: 'xsmall' }}
      {...rest}
    />
  </Stack>
);

KPIChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.array,
    }),
  ),
};

const KPISummary = ({ instances, statusColor }) => (
  <Box direction="row" align="center" gap="small">
    <Box background={statusColor} height="12px" width="12px" round />
    <Text>{instances} instances above utilization target</Text>
  </Box>
);

KPISummary.propTypes = {
  instances: PropTypes.number,
  statusColor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      dark: PropTypes.string,
      light: PropTypes.string,
    }),
  ]),
};
