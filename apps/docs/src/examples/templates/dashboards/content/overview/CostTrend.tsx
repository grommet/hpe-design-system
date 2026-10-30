// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { useContext } from 'react';
import type { ComponentProps, ComponentType } from 'react';
import { Box, Chart, Stack, Text, ThemeContext } from 'grommet';
import styled from 'styled-components';
import { ChartCard } from '../../components';
import { MetricValue } from '../../components/MetricValue';
import { budget, costTrend, surfaceBackground } from './data';

const TypedChartCard = ChartCard as ComponentType<
  Partial<ComponentProps<typeof ChartCard>>
>;

const formatCost = (value: number) => `$${value}K`;

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

type HpeThemeEdgeSizes = {
  global: { edgeSize: Record<string, string> };
};

// The design calls for an even dash and gap, which no Chart prop expresses.
// Grommet sets stroke-dasharray on each path, so the override targets paths,
// and round caps add one stroke width to every dash, so it is taken off the
// dash and added to the gap.
const DashedChart = styled(Chart)`
  g,
  g path {
    stroke-dasharray: ${({ theme }) => {
      const hpeTheme = theme as HpeThemeEdgeSizes;
      const dash = parseInt(hpeTheme.global.edgeSize['3xsmall'], 10);
      const cap = parseInt(hpeTheme.global.edgeSize[series.thickness], 10);
      return `${dash - cap}px ${dash + cap}px`;
    }};
  }
`;

const chartProps = {
  bounds,
  size: { width: 'full', height: 'xsmall' },
  ...series,
};

type CostTrendProps = {
  gridArea?: ComponentProps<typeof Box>['gridArea'];
};

const legendValues = [{ value: [0, 0.5] }, { value: [1, 0.5] }];
const legendBounds = { x: { min: 0, max: 1 }, y: { min: 0, max: 1 } };

// Legend swatches are miniature charts so their strokes and caps match the
// plot: a solid line for actual cost and a dashed line for the budget.
type LegendItemProps = {
  dash?: boolean;
  label: string;
};

function LegendItem({ dash, label }: LegendItemProps) {
  const theme = useContext(ThemeContext) as HpeThemeEdgeSizes;
  const SwatchChart = dash ? DashedChart : Chart;
  return (
    <Box direction="row" align="center" gap="3xsmall">
      <SwatchChart
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
        aria-hidden
        {...series}
      />
      <Text size="small">{label}</Text>
    </Box>
  );
}
export const CostTrend = ({ ...rest }: CostTrendProps) => (
  <TypedChartCard
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
            <DashedChart
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
              aria-hidden
              {...chartProps}
            />
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
  </TypedChartCard>
);
