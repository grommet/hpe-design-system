import { Grid, DataChart, Box, Data } from 'grommet';
import { Card, Legend, Metric } from '../../components';
import mockData from '../../mockData/sustainability.json';

const CarbonEmissions = () => (
  <Card title="Carbon emissions" level={2}>
    <Box gap="medium" pad={{ top: 'small' }}>
      <Metric value={132000} unit="MTCO2e" />
      <Legend label="MTCO2e" color="chart-qualitative-70" />
      <DataChart
        data={mockData.sustainability.slice(0, 10)}
        series={[
          {
            property: 'date',
            render: value =>
              Intl.DateTimeFormat(undefined, {
                month: 'short',
                day: 'numeric',
              }).format(new Date(value)),
          },
          'emissions',
        ]}
        chart={[
          {
            property: 'emissions',
            type: 'area',
            thickness: 'xsmall',
            color: 'chart-qualitative-70-weak',
          },
          {
            property: 'emissions',
            type: 'line',
            thickness: 'xxsmall',
            color: 'chart-qualitative-70',
            round: true,
          },
        ]}
        axis={{
          x: { property: 'date', granularity: 'medium' },
          y: { property: 'emissions', granularity: 'fine' },
        }}
        guide={{ y: true }}
      />
    </Box>
  </Card>
);

const EnergyConsumption = () => (
  <Card title="Energy consumption" level={2}>
    <Box gap="medium" pad={{ top: 'medium' }}>
      <Metric value={325000} unit="kWh" />
      <Legend label="Energy consumption (kWh)" color="chart-qualitative-20" />
      <DataChart
        data={mockData.sustainability.slice(0, 10)}
        series={[
          {
            property: 'date',
            render: value =>
              Intl.DateTimeFormat(undefined, {
                month: 'short',
                day: 'numeric',
              }).format(new Date(value)),
          },
          'energy',
        ]}
        chart={[
          {
            property: 'energy',
            type: 'area',
            thickness: 'xsmall',
            color: 'chart-qualitative-20-weak',
          },
          {
            property: 'energy',
            type: 'line',
            thickness: 'xxsmall',
            color: 'chart-qualitative-20',
            round: true,
          },
        ]}
        axis={{
          x: { property: 'date', granularity: 'medium' },
          y: { property: 'energy', granularity: 'fine' },
        }}
        guide={{ y: true }}
      />
    </Box>
  </Card>
);

const EnergyCost = () => (
  <Card title="Energy cost" level={2}>
    <Box gap="medium" pad={{ top: 'medium' }}>
      <Metric
        value={48750}
        unit="USD"
        options={{ style: 'currency', currency: 'USD' }}
      />
      <Legend label="Energy cost (USD)" color="chart-qualitative-30" />
      <DataChart
        data={mockData.sustainability.slice(0, 10)}
        series={[
          {
            property: 'date',
            render: value =>
              Intl.DateTimeFormat(undefined, {
                month: 'short',
                day: 'numeric',
              }).format(new Date(value)),
          },
          'cost',
        ]}
        chart={[
          {
            property: 'cost',
            type: 'area',
            thickness: 'xsmall',
            color: 'chart-qualitative-30-weak',
          },
          {
            property: 'cost',
            type: 'line',
            thickness: 'xxsmall',
            color: 'chart-qualitative-30',
            round: true,
          },
        ]}
        axis={{
          x: { property: 'date', granularity: 'medium' },
          y: { property: 'cost', granularity: 'fine' },
        }}
        guide={{ y: true }}
      />
    </Box>
  </Card>
);

export const SustainabilityInsights = () => {
  return (
    <Data data={mockData.sustainability}>
      <Grid columns="medium" gap="medium" pad={{ vertical: 'small' }}>
        <CarbonEmissions />
        <EnergyConsumption />
        <EnergyCost />
      </Grid>
    </Data>
  );
};
