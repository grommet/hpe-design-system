import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Card, CardBody, CardFooter, Chart, Text } from 'grommet';
import { Wifi } from 'grommet-icons';

const mockData = Array(30)
  .fill()
  .map((_, index) => {
    return {
      value: [index, Math.random() * 100],
    };
  });

const capacityWarnings = mockData.filter(datum => datum.value[1] >= 50).length;

const gradient = [
  { value: 0, color: 'status-ok' },
  { value: 33, color: 'status-ok' },
  { value: 67, color: 'status-warning' },
  { value: 85, color: 'status-critical' },
];

const StyledCard = styled(Card)`
  transition: all 0.3s ease-in-out;
  :focus,
  :hover {
    transform: scale(1.01, 1.01);
  }
`;

export const CardsExample = () => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <Box
      align="center"
      justify="center"
      background="background-back"
      overflow="auto"
      pad="medium"
      fill
    >
      <StyledCard
        elevation={isFocused ? 'medium' : 'small'}
        onClick={() => {
          // eslint-disable-next-line no-alert
          alert(
            `Typically a click would route to a view with 
            greater detail behind this summary information.`,
          );
        }}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
        onMouseOut={() => setIsFocused(false)}
        onMouseOver={() => setIsFocused(true)}
      >
        <CardBody>
          <Identifier
            title="Network Traffic"
            subtitle="Capacity Utilization - Last 30 Days"
            icon={<Wifi size="large" />}
          />
          <Box margin={{ top: 'medium' }}>
            <KPIChart data={mockData} />
          </Box>
        </CardBody>
        <CardFooter>
          <KPISummary
            instances={capacityWarnings}
            statusColor="status-warning"
          />
        </CardFooter>
      </StyledCard>
    </Box>
  );
};

const Identifier = ({ title, subtitle, icon }) => (
  <Box direction="row" gap="small" align="center">
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

const KPIChart = ({ data }) => (
  <Chart
    aria-label="Card displaying network traffic"
    type="line"
    thickness="xxsmall"
    values={data}
    color={gradient}
    size={{ height: 'xsmall' }}
  />
);

KPIChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.array,
    }),
  ),
};

const KPISummary = ({ instances, statusColor }) => {
  return (
    <Box direction="row" align="center" gap="small">
      <Box background={statusColor} height="12px" width="12px" round />
      <Text>{instances} instances above utilization target</Text>
    </Box>
  );
};

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
