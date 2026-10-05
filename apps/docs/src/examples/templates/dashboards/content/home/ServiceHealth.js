// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Meter, Text } from 'grommet';
import { ShieldCheck } from '@hpe-design/icons-grommet';
import { TextEmphasis } from '@shared/aries-core';
import {
  DashboardCardHeader,
  MetricGroup,
  MetricTile,
  MetricValue,
} from '../../components';
import {
  capacity,
  serviceHealthSummary,
  systemHealth,
  uptimeDays,
} from './data';

// Quantitative fills, such as Meter values, take foreground-* tokens.
const STATUS_FILL = {
  critical: 'foreground-critical',
  warning: 'foreground-warning',
  ok: 'foreground-ok',
  unknown: 'foreground-unknown',
};

const capacityUsed = Math.round((capacity.used / capacity.total) * 100);
const capacityDescription =
  `${capacity.used} of ${capacity.total} ${capacity.unit} used, ` +
  'on track to reach 90% capacity within 9 months.';

export const ServiceHealth = () => (
  <Box as="section" gap="medium">
    <DashboardCardHeader
      title="Service health"
      level={2}
      subtitle={<Text size="small">{serviceHealthSummary}</Text>}
    />
    <MetricGroup>
      <MetricTile
        title="Uptime"
        description="2 incidents, 9 min downtime in 28 days. Target is 99.9%."
      >
        <MetricValue value="99.98" unit="%" trend="0.03%" />
        <Meter
          a11yTitle={`Daily status for the last ${uptimeDays.length} days`}
          type="bar"
          thickness="3xsmall"
          size="full"
          max={uptimeDays.length}
          values={uptimeDays.map((status, day) => ({
            label: `Day ${day + 1}: ${status}`,
            value: 1,
            color: STATUS_FILL[status],
          }))}
        />
      </MetricTile>
      <MetricTile
        title="System health"
        description="Both critical systems are in Frankfurt-DC2."
      >
        <MetricValue
          value={systemHealth.healthy}
          unit={`of ${systemHealth.total}`}
          trend="3%"
        />
        <Meter
          a11yTitle="Systems by health status"
          type="bar"
          thickness="3xsmall"
          size="full"
          round
          max={systemHealth.total}
          values={systemHealth.values.map(({ label, status, value }) => ({
            label,
            value,
            color: STATUS_FILL[status],
          }))}
        />
      </MetricTile>
      <MetricTile title="Capacity used" description={capacityDescription}>
        <MetricValue value={capacityUsed} unit="%" trend="2%" />
        <Meter
          a11yTitle={`${capacityUsed}% of capacity used`}
          type="bar"
          thickness="3xsmall"
          size="full"
          round
          max={100}
          values={[{ label: 'Capacity used', value: capacityUsed }]}
        />
      </MetricTile>
      <MetricTile
        title="Volume protection"
        description="1,842 volumes, 0 unprotected. Policies verified 4 min ago."
      >
        <Box direction="row" align="center" gap="xsmall">
          <ShieldCheck size="xxlarge" color="icon-default" aria-hidden />
          <TextEmphasis size="xxlarge">All protected</TextEmphasis>
        </Box>
      </MetricTile>
    </MetricGroup>
  </Box>
);
