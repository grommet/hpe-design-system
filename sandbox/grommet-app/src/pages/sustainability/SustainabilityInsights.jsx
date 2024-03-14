import { createContext, useContext, useState } from 'react';
import {
  Grid,
  DataChart,
  DateInput,
  Box,
  Data,
  Collapsible,
  Toolbar,
  Text,
  DataFilters,
  DataFilter,
} from 'grommet';
import { Hide, FormView } from 'grommet-icons';
import { Card, Legend, Metric, ToggleGroup } from '../../components';
import mockData from '../../mockData/sustainability.json';

const DisplayContext = createContext({});

const CarbonEmissions = () => {
  const { open } = useContext(DisplayContext);
  return (
    <Card
      title="Carbon emissions"
      level={2}
      border={{
        side: 'top',
        color: 'chart-qualitative-70',
        size: !open ? 'medium' : 'none',
      }}
    >
      <Box gap="medium" pad={{ top: 'small' }}>
        <Metric value={132000} unit="MTCO2e" />

        <Collapsible open={open}>
          <Box gap="medium">
            <Legend
              label="Carbon emissions (MTCO2e)"
              color="chart-qualitative-70"
            />
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
        </Collapsible>
      </Box>
    </Card>
  );
};

const EnergyConsumption = () => {
  const { open } = useContext(DisplayContext);

  return (
    <Card
      title="Energy consumption"
      level={2}
      border={{
        side: 'top',
        color: 'chart-qualitative-20',
        size: !open ? 'medium' : 'none',
      }}
    >
      <Box gap="medium" pad={{ top: 'medium' }}>
        <Metric value={325000} unit="kWh" />
        <Collapsible open={open}>
          <Box gap="medium">
            <Legend
              label="Energy consumption (kWh)"
              color="chart-qualitative-20"
            />
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
        </Collapsible>
      </Box>
    </Card>
  );
};

const EnergyCost = () => {
  const { open } = useContext(DisplayContext);
  return (
    <Card
      title="Energy cost"
      level={2}
      border={{
        side: 'top',
        color: 'chart-qualitative-30',
        size: !open ? 'medium' : 'none',
      }}
    >
      <Box gap="medium" pad={{ top: 'medium' }}>
        <Metric
          value={48750}
          unit="USD"
          options={{ style: 'currency', currency: 'USD' }}
        />
        <Collapsible open={open}>
          <Box gap="medium">
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
          <DataFilters layer />
          <Toolbar align="center" flex="grow" justify="end">
            <Text>Charts</Text>
            <ToggleGroup
              options={[
                { id: '0', label: <FormView />, value: true },
                { id: '1', label: <Hide />, value: false },
              ]}
              value={open}
              setValue={setOpen}
            />
          </Toolbar>
        </Toolbar>
        <Grid
          columns="medium"
          gap="medium"
          pad={{ vertical: 'medium' }}
          // helps to smooth collapse transition, but causes layout issues?
          // style={{ maxHeight: '450px' }}
        >
          <CarbonEmissions />
          <EnergyConsumption />
          <EnergyCost />
        </Grid>
      </Data>
    </DisplayContext.Provider>
  );
};
