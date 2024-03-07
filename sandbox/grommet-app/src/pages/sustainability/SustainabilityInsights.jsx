import { createContext, useContext, useState } from 'react';
import {
  Grid,
  DataChart,
  DateInput,
  Box,
  Data,
  Collapsible,
  Button,
  Toolbar,
  Text,
  DataFilters,
  DataFilter,
} from 'grommet';
import { Hide, FormView } from 'grommet-icons';
import { Card, Legend, Metric } from '../../components';
import mockData from '../../mockData/sustainability.json';

const DisplayContext = createContext({});

const CarbonEmissions = () => {
  const { open } = useContext(DisplayContext);
  return (
    <Card title="Carbon emissions" level={2}>
      <Box gap="medium" pad={{ top: 'small' }}>
        <Metric value={132000} unit="MTCO2e" />
        <Legend
          label="Carbon emissions (MTCO2e)"
          color="chart-qualitative-70"
        />
        <Collapsible open={open}>
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
        </Collapsible>
      </Box>
    </Card>
  );
};

const EnergyConsumption = () => {
  const { open } = useContext(DisplayContext);

  return (
    <Card title="Energy consumption" level={2}>
      <Box gap="medium" pad={{ top: 'medium' }}>
        <Metric value={325000} unit="kWh" />
        <Legend label="Energy consumption (kWh)" color="chart-qualitative-20" />
        <Collapsible open={open}>
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
        </Collapsible>
      </Box>
    </Card>
  );
};

const EnergyCost = () => {
  const { open } = useContext(DisplayContext);
  return (
    <Card title="Energy cost" level={2}>
      <Box gap="medium" pad={{ top: 'medium' }}>
        <Metric
          value={48750}
          unit="USD"
          options={{ style: 'currency', currency: 'USD' }}
        />
        <Legend label="Energy cost (USD)" color="chart-qualitative-30" />
        <Collapsible open={open}>
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
        </Collapsible>
      </Box>
    </Card>
  );
};

export const SustainabilityInsights = () => {
  const [open, setOpen] = useState(true);
  return (
    <DisplayContext.Provider value={{ open }}>
      <Data
        data={mockData.sustainability}
        properties={{
          date: { label: 'Date range' },
        }}
      >
        <Toolbar align="end">
          <DataFilters updateOn="change">
            <DataFilter
              contentProps={{
                width: 'medium',
                margin: { bottom: 'none', top: 'xsmall' },
              }}
              property="date"
            >
              <DateInput
                format="mm/dd/yyyy-mm/dd/yyyy"
                value={['2023-12-31', '2024-01-09']}
              />
            </DataFilter>
          </DataFilters>
          <Toolbar align="center" flex="grow" justify="end">
            <Text>Charts</Text>
            <Button
              icon={open ? <Hide /> : <FormView />}
              // tip={open ? 'Hide charts' : 'Show charts'}
              onClick={() => setOpen(!open)}
              kind="toolbar"
            />
          </Toolbar>
        </Toolbar>
        <Grid columns="medium" gap="medium" pad={{ vertical: 'medium' }}>
          <CarbonEmissions />
          <EnergyConsumption />
          <EnergyCost />
        </Grid>
      </Data>
    </DisplayContext.Provider>
  );
};
