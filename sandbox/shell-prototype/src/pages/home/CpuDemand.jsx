// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Button, Chart, Stack, Text } from 'grommet';
import { LinkNext } from '@hpe-design/icons-grommet';
import { useShell } from '../../contexts/ShellContext';
import {
  MetricValue,
  ShellCard,
  useElementWidth,
} from '../../components/common';
import { cpuDemand, health } from '../../data/home';

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
const cpuBounds = {
  x: { min: 0, max: cpuDemand.length - 1 },
  y: { min: 0, max: 100 },
};
const averageValues = cpuDemand.map(({ day, average }, index) => ({
  value: [index, average],
  label: `${day}: fleet average ${average}% CPU`,
}));
const peakValues = cpuDemand.map(({ day, peak }, index) => ({
  value: [index, peak],
  label: `${day}: busiest server peak ${peak}% CPU`,
}));

export const CpuDemand = props => {
  const [plotRef, plotWidth] = useElementWidth();
  const chartProps = {
    bounds: cpuBounds,
    size: { width: `${plotWidth}px`, height: 'xsmall' },
    thickness: '5xsmall',
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
          <Box ref={plotRef} border={{ side: 'bottom', color: 'border-weak' }}>
            {plotWidth > 0 && (
              <Stack>
                <Chart
                  type="line"
                  color="dataVis-categorical-10"
                  values={averageValues}
                  a11yTitle={`Fleet average CPU by day. ${averageValues.map(d => d.label).join('. ')}`}
                  {...chartProps}
                />
                <Chart
                  type="line"
                  color="dataVis-categorical-20"
                  dash
                  values={peakValues}
                  a11yTitle={`Busiest server peak CPU by day. ${peakValues.map(d => d.label).join('. ')}`}
                  {...chartProps}
                />
              </Stack>
            )}
          </Box>
          <Box direction="row" justify="between">
            {cpuDemand.map(({ day }) => (
              <Text key={day} size="xsmall">
                {day}
              </Text>
            ))}
          </Box>
          <Text size="small">
            Solid: fleet average · Dashed: busiest server peak
          </Text>
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
