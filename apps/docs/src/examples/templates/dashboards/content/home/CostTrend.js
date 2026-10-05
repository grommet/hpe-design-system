// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Chart, Stack, Text } from 'grommet';
import { ChartCard, MetricValue } from '../../components';
import { budget, costTrend, surfaceBackground } from './data';

const formatCost = value => `$${value}K`;

const latest = costTrend[costTrend.length - 1].actual;
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

const chartProps = {
  bounds,
  size: { width: 'full', height: 'xsmall' },
  ...series,
};

export const CostTrend = ({ ...rest }) => (
  <ChartCard
    title="Cost trend"
    level={3}
    subtitle={<Text size="small">Monthly · all services</Text>}
    background={surfaceBackground}
    {...rest}
  >
    <Box gap="xxsmall">
      <MetricValue value={formatCost(latest)} unit="USD" trend="2%" />
      <Box gap="xxsmall">
        <Box border={{ side: 'bottom', color: 'border-weak' }}>
          <Stack guidingChild="first">
            <Chart
              a11yTitle="Monthly cost, December to September"
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
              {...chartProps}
            />
            <Chart type="line" values={actual} round {...chartProps} />
          </Stack>
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
  </ChartCard>
);

// Legend swatches mirror the strokes in the chart: a solid line for actual
// cost and a dashed line for the budget.
const LegendItem = ({ dash, label }) => (
  <Box direction="row" align="center" gap="3xsmall">
    <Box
      pad={{ horizontal: 'xxsmall' }}
      border={{
        side: 'top',
        size: 'small',
        color: series.color,
        style: dash ? 'dashed' : 'solid',
      }}
      flex={false}
      aria-hidden
    />
    <Text size="small">{label}</Text>
  </Box>
);

LegendItem.propTypes = {
  dash: PropTypes.bool,
  label: PropTypes.string.isRequired,
};
