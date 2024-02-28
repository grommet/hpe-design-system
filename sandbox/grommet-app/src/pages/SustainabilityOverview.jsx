import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Box, DataChart, Grid, Notification, Text } from 'grommet';
import { DashboardCard } from '../components';
import sustainability from '../mockData/sustainability.json';

const SustainabilityMetric = ({ label, value, unit, options }) => (
  <Box>
    <Text size="small">{label}</Text>
    <Text size="xsmall">
      <Text size="xlarge" weight={500} color="text-strong">
        {Intl.NumberFormat(undefined, options).format(value)}
      </Text>{' '}
      {unit}
    </Text>
  </Box>
);

SustainabilityMetric.propTypes = {
  label: PropTypes.string,
  value: PropTypes.number,
  unit: PropTypes.string,
  options: PropTypes.shape({}),
};

export const SustainabilityOverview = () => {
  return (
    <Link to="/sustainability" style={{ textDecoration: 'none' }}>
      <DashboardCard title="Sustainability overview" level={2}>
        <Grid columns={[['min-content', 'auto'], 'flex']} gap="medium">
          <>
            <SustainabilityMetric
              label="Carbon emissions"
              unit="MTCO2e"
              value={132000}
            />
            <DataChart
              data={sustainability.sustainability.slice(0, 10)}
              series={['date', 'emissions']}
              chart={[
                {
                  property: 'emissions',
                  type: 'area',
                  thickness: 'xsmall',
                  color: 'graph-4',
                  opacity: 'medium',
                },
                {
                  property: 'emissions',
                  type: 'line',
                  thickness: 'xxsmall',
                  color: 'graph-4',
                  round: true,
                },
              ]}
              axis={{
                x: false,
                y: false,
              }}
              size={{ height: 'xxsmall' }}
            />
          </>
          <>
            <SustainabilityMetric
              label="Energy consumption"
              unit="kWh"
              value={325000}
            />
            <DataChart
              data={sustainability.sustainability.slice(0, 10)}
              series={['date', 'energy']}
              chart={[
                {
                  property: 'energy',
                  type: 'area',
                  thickness: 'xsmall',
                  color: 'graph-0',
                  opacity: 'medium',
                },
                {
                  property: 'energy',
                  type: 'line',
                  thickness: 'xxsmall',
                  color: 'graph-0',
                  round: true,
                },
              ]}
              axis={{
                x: false,
                y: false,
              }}
              size={{ height: 'xxsmall' }}
            />
          </>
          <>
            <SustainabilityMetric
              label="Energy cost"
              unit="USD"
              value={48750}
            />
            <DataChart
              data={sustainability.sustainability.slice(0, 10)}
              series={['date', 'cost']}
              chart={[
                {
                  property: 'cost',
                  type: 'area',
                  thickness: 'xsmall',
                  color: 'graph-2',
                  opacity: 'medium',
                },
                {
                  property: 'cost',
                  type: 'line',
                  thickness: 'xxsmall',
                  color: 'graph-2',
                  round: true,
                },
              ]}
              axis={{
                x: false,
                y: false,
              }}
              size={{ height: 'xxsmall' }}
            />
          </>
        </Grid>
        <Notification
          status="warning"
          message="Your carbon emissions have increased by 83% in the past month."
          margin={{ top: 'medium' }}
        />
      </DashboardCard>
    </Link>
  );
};
