// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Button, Chart, Stack, Text } from 'grommet';
import { LinkNext } from '@hpe-design/icons-grommet';
import { useShell } from '../../contexts/ShellContext';
import {
  ChartGuides,
  ChartLegendItem,
  ChartYAxis,
  MetricValue,
  ShellCard,
  useElementWidth,
} from '../../components/common';
import { cpuDemand, health, targets } from '../../data/home';

// CPU demand this week: daily fleet average against the busiest server's
// peak, so bursts hidden by the fleet average are visible. Summaries
// reconcile with the Health overview utilization tile.
const ComputeAction = ({ label, pageId }) => {
  const { dispatch } = useShell();
  return (
    <Button
      icon={<LinkNext aria-hidden="true" />}
      a11yTitle={label}
      tip={label}
      onClick={() =>
        dispatch({ type: 'OPEN_SERVICE', serviceId: 'compute', pageId })
      }
    />
  );
};

ComputeAction.propTypes = {
  label: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
};

const cpuAverage = Math.round(
  cpuDemand.reduce((sum, day) => sum + day.average, 0) / cpuDemand.length,
);
const peakDay = cpuDemand.reduce((top, day) =>
  day.peak > top.peak ? day : top,
);
const cpuPeak = peakDay.peak;
const bounds = {
  x: { min: 0, max: cpuDemand.length - 1 },
  y: { min: 0, max: 100 },
};
const yLabels = ['100%', '50%', '0%'];

const series = {
  average: { color: 'dataVis-categorical-10', label: 'Fleet average' },
  peak: { color: 'dataVis-categorical-20', label: 'Busiest server peak' },
  // The CPU analogue of Cost trend's budget line: a dashed reference.
  threshold: {
    color: 'border-strong',
    label: `Warning threshold ${targets.utilizationWarning}%`,
  },
};
const thickness = '5xsmall';

const averageValues = cpuDemand.map(({ day, average }, index) => ({
  value: [index, average],
  label: `${day}: fleet average ${average}%`,
}));
const peakValues = cpuDemand.map(({ day, peak }, index) => ({
  value: [index, peak],
  label: `${day}: busiest server peak ${peak}%`,
}));
const thresholdValues = cpuDemand.map((_, index) => ({
  value: [index, targets.utilizationWarning],
}));

export const CpuDemand = props => {
  // Grommet Chart only re-measures a 'full' width on window resize, so the
  // plot is measured and the width passed explicitly.
  const [plotRef, plotWidth] = useElementWidth();
  const chartProps = {
    type: 'line',
    bounds,
    size: { width: `${plotWidth}px`, height: 'xsmall' },
    thickness,
    round: true,
  };
  return (
    <ShellCard
      title="CPU demand"
      subtitle={`Daily · ${health.servers.total} servers`}
      action={
        <ComputeAction
          label="Review compute utilization"
          pageId="ai-insights-overview"
        />
      }
      {...props}
    >
      <Box gap="small" flex justify="between">
        <Box direction="row" gap="medium" wrap>
          <Box>
            <MetricValue value={cpuAverage} unit="%" />
            <Text size="small">Fleet average</Text>
          </Box>
          <Box>
            <MetricValue value={cpuPeak} unit="%" />
            <Text size="small">Busiest server peak</Text>
          </Box>
        </Box>
        <Box gap="xxsmall">
          <Box direction="row" gap="xsmall">
            <ChartYAxis labels={yLabels} height="xsmall" />
            <Box flex gap="xxsmall">
              <Box ref={plotRef} height="xsmall">
                {plotWidth > 0 && (
                  <Stack guidingChild="first" fill>
                    <ChartGuides count={yLabels.length} />
                    <Chart
                      a11yTitle={`Fleet average CPU by day. ${averageValues.map(d => d.label).join('. ')}`}
                      color={series.average.color}
                      values={averageValues}
                      {...chartProps}
                    />
                    <Chart
                      a11yTitle={`Busiest server peak CPU by day. ${peakValues.map(d => d.label).join('. ')}`}
                      color={series.peak.color}
                      values={peakValues}
                      {...chartProps}
                    />
                    <Chart
                      a11yTitle={series.threshold.label}
                      color={series.threshold.color}
                      values={thresholdValues}
                      dash
                      {...chartProps}
                      thickness="hair"
                    />
                  </Stack>
                )}
              </Box>
              <Box direction="row" justify="between">
                {cpuDemand.map(({ day }) => (
                  <Text key={day} size="xsmall" weight={500}>
                    {day}
                  </Text>
                ))}
              </Box>
            </Box>
          </Box>
          <Box direction="row" gap="small" wrap>
            <ChartLegendItem
              color={series.average.color}
              label={series.average.label}
            />
            <ChartLegendItem
              color={series.peak.color}
              label={series.peak.label}
            />
            <ChartLegendItem
              color={series.threshold.color}
              label={series.threshold.label}
              thickness="hair"
              dash
            />
          </Box>
        </Box>
        <Text size="small">
          {peakDay.day} peaked at {cpuPeak}% on {health.utilization.peakServer}.
          Review {health.utilization.alerts} utilization alerts before placing
          workloads.
        </Text>
      </Box>
    </ShellCard>
  );
};
