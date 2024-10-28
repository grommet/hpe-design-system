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
  Skeleton,
  ToggleGroup,
} from 'grommet';
import { Hide, FormView } from 'grommet-icons';
import { Card, Legend, Metric } from '../../components';
import mockData from '../../mockData/sustainability.json';
import {
  useLoading,
  skeleton as skeletonAnimation,
} from '../../utils/skeleton';
import { SkeletonContext } from '../../components';

const DisplayContext = createContext({});

const skeletonProps = { elevation: 'none' };
const CarbonEmissions = () => {
  const { open } = useContext(DisplayContext);
  const skeleton = useContext(SkeletonContext);
  const animation = !skeleton ? 'fadeIn' : undefined;
  return (
    <Card
      title="Carbon emissions"
      level={2}
      border={{
        side: 'top',
        color: 'graph-0',
        size: !open ? 'medium' : 'none',
      }}
      {...(skeleton ? skeletonProps : {})}
    >
      <Box
        gap="medium"
        pad={{ top: 'small' }}
        flex={false}
        width="100%"
        animation={animation}
      >
        <Metric value={132000} unit="MTCO2e" />
        <Collapsible open={open}>
          <Box gap="medium">
            <Legend label="Carbon emissions (MTCO2e)" color="graph-0" />
            {!skeleton ? (
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
                    color: { color: 'graph-0', opacity: 'strong' },
                  },
                  {
                    property: 'emissions',
                    type: 'line',
                    thickness: 'xxsmall',
                    color: 'graph-0',
                    round: true,
                  },
                ]}
                axis={{
                  x: { property: 'date', granularity: 'medium' },
                  y: { property: 'emissions', granularity: 'fine' },
                }}
                guide={{ y: true }}
              />
            ) : (
              <Skeleton height="small" />
            )}
          </Box>
        </Collapsible>
      </Box>
    </Card>
  );
};

const EnergyConsumption = () => {
  const { open } = useContext(DisplayContext);
  const skeleton = useContext(SkeletonContext);
  const animation = !skeleton ? 'fadeIn' : undefined;
  return (
    <Card
      title="Energy consumption"
      level={2}
      border={{
        side: 'top',
        color: 'graph-2',
        size: !open ? 'medium' : 'none',
      }}
      {...(skeleton ? skeletonProps : {})}
    >
      <Box
        gap="medium"
        pad={{ top: 'medium' }}
        flex={false}
        width="100%"
        animation={animation}
      >
        <Metric value={325000} unit="kWh" />
        <Collapsible open={open}>
          <Box gap="medium">
            <Legend label="Energy consumption (kWh)" color="graph-2" />
            {!skeleton ? (
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
                    color: { color: 'graph-2', opacity: 'strong' },
                  },
                  {
                    property: 'energy',
                    type: 'line',
                    thickness: 'xxsmall',
                    color: 'graph-2',
                    round: true,
                  },
                ]}
                axis={{
                  x: { property: 'date', granularity: 'medium' },
                  y: { property: 'energy', granularity: 'fine' },
                }}
                guide={{ y: true }}
              />
            ) : (
              <Skeleton height="small" />
            )}
          </Box>
        </Collapsible>
      </Box>
    </Card>
  );
};

const EnergyCost = () => {
  const { open } = useContext(DisplayContext);
  const skeleton = useContext(SkeletonContext);
  const animation = !skeleton ? 'fadeIn' : undefined;
  return (
    <Card
      title="Energy cost"
      level={2}
      border={{
        side: 'top',
        color: 'graph-4',
        size: !open ? 'medium' : 'none',
      }}
      {...(skeleton ? skeletonProps : {})}
    >
      <Box
        gap="medium"
        pad={{ top: 'medium' }}
        flex={false}
        width="100%"
        animation={animation}
      >
        <Metric
          value={48750}
          unit="USD"
          options={{ style: 'currency', currency: 'USD' }}
        />
        <Collapsible open={open}>
          <Box gap="medium">
            <Legend label="Energy cost (USD)" color="graph-4" />
            {!skeleton ? (
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
                    color: { color: 'graph-4', opacity: 'strong' },
                  },
                  {
                    property: 'cost',
                    type: 'line',
                    thickness: 'xxsmall',
                    color: 'graph-4',
                    round: true,
                  },
                ]}
                axis={{
                  x: { property: 'date', granularity: 'medium' },
                  y: { property: 'cost', granularity: 'fine' },
                }}
                guide={{ y: true }}
              />
            ) : (
              <Skeleton height="small" />
            )}
          </Box>
        </Collapsible>
      </Box>
    </Card>
  );
};

export const SustainabilityInsights = () => {
  const [open, setOpen] = useState(true);
  const skeleton = useLoading(2000);
  return (
    <DisplayContext.Provider value={{ open }}>
      <SkeletonContext.Provider value={skeleton}>
        <Data
          data={mockData.sustainability}
          properties={{
            date: { label: 'Date range' },
          }}
        >
          <Toolbar
            align="end"
            skeleton={
              skeleton
                ? {
                    depth: 1,
                  }
                : undefined
            }
          >
            {!skeleton ? (
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
            ) : undefined}
            <DataFilters layer />
            {!skeleton ? (
              <Toolbar align="center" flex="grow" justify="end">
                <Text>Charts</Text>
                <ToggleGroup
                  options={[
                    {
                      icon: <FormView />,
                      tip: 'View charts',
                      value: true,
                    },
                    {
                      icon: <Hide />,
                      tip: 'Hide charts',
                      value: false,
                    },
                  ]}
                  value={open}
                  onToggle={e => {
                    if (e.value === true) setOpen(true);
                    else setOpen(false);
                  }}
                />
              </Toolbar>
            ) : undefined}
          </Toolbar>
          <Box skeleton={skeleton ? skeletonAnimation : undefined}>
            <Grid columns="medium" gap="medium" pad={{ vertical: 'medium' }}>
              <CarbonEmissions />
              <EnergyConsumption />
              <EnergyCost />
            </Grid>
          </Box>
        </Data>
      </SkeletonContext.Provider>
    </DisplayContext.Provider>
  );
};
