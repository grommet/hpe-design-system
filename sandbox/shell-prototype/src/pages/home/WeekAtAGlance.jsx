// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Anchor,
  Box,
  Button,
  Chart,
  Grid,
  Heading,
  List,
  ResponsiveContext,
  Stack,
  Tag,
  Text,
  ThemeContext,
  WorldMap,
} from 'grommet';
import { Info, LinkNext } from '@hpe-design/icons-grommet';
import { useShell } from '../../contexts/ShellContext';
import {
  MetricValue,
  ShellCard,
  StatusCount,
  useElementWidth,
} from '../../components/common';
import {
  attentionItems,
  budget,
  costTrend,
  devicesByLocation,
  slaStats,
} from '../../data/home';

// ---------------------------------------------------------------------------
// Cost trend
// ---------------------------------------------------------------------------
const formatCost = value => `$${value}K`;
const first = costTrend[0];
const last = costTrend[costTrend.length - 1];

const actual = costTrend.map(({ actual: value }, index) => ({
  value: [index, value],
  label: `${costTrend[index].month}: ${formatCost(value)}`,
}));
const budgetLine = costTrend.map((_, index) => ({ value: [index, budget] }));

// Bound the y-axis to the data so the trend fills the chart rather than
// being compressed against the top by a zero baseline.
const costs = costTrend.flatMap(({ actual: a, budget: b }) => [a, b]);
const range = Math.max(...costs) - Math.min(...costs);
const bounds = {
  x: { min: 0, max: costTrend.length - 1 },
  y: { min: Math.min(...costs) - range * 1.5, max: Math.max(...costs) },
};

const series = { color: 'dataVis-categorical-10', thickness: '5xsmall' };

const legendValues = [{ value: [0, 0.5] }, { value: [1, 0.5] }];
const legendBounds = { x: { min: 0, max: 1 }, y: { min: 0, max: 1 } };

// Legend swatches are miniature charts so their strokes match the plot.
const LegendItem = ({ dash, label }) => {
  const theme = useContext(ThemeContext);
  return (
    <Box direction="row" align="center" gap="3xsmall">
      <Chart
        type="line"
        values={legendValues}
        bounds={legendBounds}
        size={{
          width: theme.global.edgeSize.small,
          height: theme.global.edgeSize[series.thickness],
        }}
        dash={dash}
        round
        overflow
        aria-hidden="true"
        {...series}
      />
      <Text size="small">{label}</Text>
    </Box>
  );
};

LegendItem.propTypes = {
  dash: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

const CostTrend = props => {
  // Measure the plot area so the chart tracks the card width as shell
  // panels open and close.
  const [plotRef, plotWidth] = useElementWidth();
  const chartProps = {
    bounds,
    size: { width: `${plotWidth}px`, height: 'xsmall' },
    ...series,
  };
  return (
    <ShellCard title="Cost trend" subtitle="Monthly · all services" {...props}>
      <Box gap="xxsmall">
        <MetricValue value={formatCost(last.actual)} unit="USD" trend="2%" />
        <Box gap="xxsmall">
          <Box ref={plotRef} border={{ side: 'bottom', color: 'border-weak' }}>
            {plotWidth > 0 && (
              <Stack guidingChild="first">
                <Chart
                  a11yTitle={`Monthly cost, ${first.month} to ${last.month}`}
                  type="area"
                  values={actual}
                  opacity="weak"
                  {...chartProps}
                />
                <Chart
                  a11yTitle={`Budget ${formatCost(budget)}`}
                  type="line"
                  values={budgetLine}
                  dash
                  round
                  {...chartProps}
                />
                <Chart
                  type="line"
                  values={actual}
                  round
                  aria-hidden="true"
                  {...chartProps}
                />
              </Stack>
            )}
          </Box>
          <Box direction="row" justify="between">
            <Text size="xsmall" weight={500}>
              {first.month}
            </Text>
            <Text size="xsmall" weight={500}>
              {last.month}
            </Text>
          </Box>
        </Box>
        <Box direction="row" gap="small" wrap>
          <LegendItem label="Actual" />
          <LegendItem label={`Budget ${formatCost(budget)}`} dash />
        </Box>
      </Box>
    </ShellCard>
  );
};

// ---------------------------------------------------------------------------
// Needs attention
// ---------------------------------------------------------------------------
const openItems = attentionItems.reduce((total, item) => total + item.count, 0);

const NeedsAttention = props => {
  const { dispatch } = useShell();
  return (
    <ShellCard
      title="Needs attention"
      subtitle={`${openItems.toLocaleString('en-US')} open items`}
      action={
        <Button
          icon={<LinkNext aria-hidden="true" />}
          a11yTitle="View all items needing attention"
          tip="View all"
          onClick={() =>
            dispatch({
              type: 'SHOW_TOAST',
              title: 'Needs attention',
              message: 'This would open the full list of open items.',
            })
          }
        />
      }
      {...props}
    >
      <Box flex justify="between" gap="medium">
        <Box gap="xxsmall">
          {attentionItems.map(({ count, label, status }) => (
            <StatusCount
              key={label}
              status={status}
              label={label}
              count={count}
            />
          ))}
        </Box>
        <Text size="small">
          Oldest critical item open 4 days. One pool in Frankfurt-DC2 is
          projected to fill in 3 weeks.
        </Text>
      </Box>
    </ShellCard>
  );
};

// ---------------------------------------------------------------------------
// SLA performance
// ---------------------------------------------------------------------------
const SLA_STATUS = {
  ok: { label: 'On target', background: 'background-contrast' },
  warning: { label: 'Degrading', background: 'background-warning' },
};

// Dividers between stats only; the first row has none.
const dividers = Object.fromEntries(
  slaStats.map((_, index) => [
    index,
    index > 0 ? { border: { side: 'top', color: 'border-weak' } } : {},
  ]),
);

const SlaPerformance = props => (
  <ShellCard title="SLA performance" {...props}>
    <List
      a11yTitle="SLA performance statistics"
      data={slaStats}
      border={false}
      itemProps={dividers}
      pad={{ vertical: 'xsmall', horizontal: 'none' }}
    >
      {({ name, status, unit, value }) => (
        <Box fill="horizontal">
          <Text>{name}</Text>
          <Box
            direction="row"
            align="center"
            justify="between"
            gap="xxsmall"
            wrap
          >
            <MetricValue value={value} unit={unit} />
            <Tag
              value={SLA_STATUS[status].label}
              size="xsmall"
              background={SLA_STATUS[status].background}
              border={false}
            />
          </Box>
        </Box>
      )}
    </List>
  </ShellCard>
);

// ---------------------------------------------------------------------------
// Devices by location
// ---------------------------------------------------------------------------
const totalDevices = devicesByLocation.reduce((sum, p) => sum + p.count, 0);

const DevicesByLocation = props => {
  const { dispatch } = useShell();
  const openInventory = () =>
    dispatch({ type: 'OPEN_PLATFORM_PAGE', pageId: 'device-inventory' });
  return (
    <ShellCard
      title="Devices"
      subtitle={`${totalDevices} assets by location`}
      action={
        <Button
          icon={<LinkNext aria-hidden="true" />}
          a11yTitle="Open device inventory"
          tip="Device inventory"
          onClick={openInventory}
        />
      }
      {...props}
    >
      <Box flex justify="between" gap="small">
        <Box
          background="shell-page"
          round="small"
          pad="small"
          align="center"
          justify="center"
          flex
        >
          {/* fill="horizontal" lets the map scale with the card width;
              without it Grommet keeps a fixed 460px height and the map sits
              small in the top-left of a tall box. */}
          <Box width={{ max: 'xlarge' }} fill="horizontal">
            <WorldMap
              fill="horizontal"
              color="border-weak"
              continents={[
                { name: 'North America', color: 'dataVis-categorical-10' },
              ]}
              // Places take the next categorical hue so they stand out
              // from the highlighted continent without implying status.
              places={devicesByLocation.map(place => ({
                name: `${place.name}: ${place.count} devices`,
                location: place.location,
                color: 'dataVis-categorical-50',
              }))}
              a11yTitle="Devices by location"
            />
          </Box>
        </Box>
        <Box direction="row" gap="xsmall" align="center">
          <Info size="small" color="icon-info" aria-hidden="true" />
          <Text size="small">
            4 devices have no location assigned.{' '}
            <Anchor
              label="Assign locations"
              size="small"
              onClick={openInventory}
            />
          </Text>
        </Box>
      </Box>
    </ShellCard>
  );
};

// ---------------------------------------------------------------------------
// Section
// ---------------------------------------------------------------------------
// Cost trend is twice the width of its peers and the device map spans two
// rows, so this region is laid out per breakpoint rather than as a fluid grid.
const stacked = {
  columns: ['flex'],
  rows: ['auto', 'auto', 'auto', 'auto'],
  areas: [['cost'], ['attention'], ['sla'], ['devices']],
};

const layout = {
  xsmall: stacked,
  small: stacked,
  medium: {
    columns: ['flex', 'flex'],
    rows: ['auto', 'auto', 'auto'],
    areas: [
      ['cost', 'cost'],
      ['attention', 'sla'],
      ['devices', 'devices'],
    ],
  },
  large: {
    columns: ['flex', 'flex', 'flex', 'flex'],
    rows: ['auto', 'auto'],
    areas: [
      ['cost', 'cost', 'devices', 'devices'],
      ['attention', 'sla', 'devices', 'devices'],
    ],
  },
};
layout.xlarge = layout.large;

export const WeekAtAGlance = () => {
  const size = useContext(ResponsiveContext);
  const { areas, columns, rows } = layout[size] || layout.large;

  return (
    <Box as="section" gap="small" flex={false}>
      <Heading level={2} margin="none">
        This week at a glance
      </Heading>
      <Grid columns={columns} rows={rows} areas={areas} gap="small">
        <CostTrend gridArea="cost" />
        <NeedsAttention gridArea="attention" />
        <SlaPerformance gridArea="sla" />
        <DevicesByLocation gridArea="devices" />
      </Grid>
    </Box>
  );
};
