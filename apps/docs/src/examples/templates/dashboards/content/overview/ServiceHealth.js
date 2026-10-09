// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Box, Heading, Meter, Text } from 'grommet';
import {
  ShieldCheck,
  StatusCritical,
  StatusGood,
  StatusUnknown,
  StatusWarning,
} from '@hpe-design/icons-grommet';
import { TextEmphasis } from '@shared/aries-core';
import { MetricGroup, MetricTile, MetricValue } from '../../components';
import { capacity, systemHealth } from './data';

// Quantitative fills, such as Meter values, take foreground-* tokens; the
// matching status icon lets the legend convey status without relying on
// color alone.
const STATUS = {
  critical: {
    fill: 'foreground-critical',
    icon: <StatusCritical size="small" color="icon-critical" aria-hidden />,
  },
  warning: {
    fill: 'foreground-warning',
    icon: <StatusWarning size="small" color="icon-warning" aria-hidden />,
  },
  ok: {
    fill: 'foreground-ok',
    icon: <StatusGood size="small" color="icon-ok" aria-hidden />,
  },
  unknown: {
    fill: 'foreground-unknown',
    icon: <StatusUnknown size="small" color="icon-unknown" aria-hidden />,
  },
};

// Grommet's Meter only exposes a single aria-label (values[].label is not
// announced), so the status breakdown is composed into one description.
const describe = counts =>
  counts
    .map(({ label, value }) => `${value} ${label.toLowerCase()}`)
    .join(', ');

const capacityUsed = Math.round((capacity.used / capacity.total) * 100);
const capacityDescription =
  `${capacity.used} of ${capacity.total} ${capacity.unit} used, ` +
  'on track to reach 90% capacity within 9 months.';

const systemHealthLabel = `${systemHealth.total} systems: ${describe(
  systemHealth.values,
)}`;
const capacityLabel = `${capacityUsed}% of ${capacity.total} ${
  capacity.unit
} used`;

export const ServiceHealth = () => (
  <Box as="section" gap="small">
    <Heading level={2} margin="none">
      Health overview
    </Heading>
    <MetricGroup>
      <MetricTile
        title="Availability"
        description="2 incidents, 9 min downtime in 28 days."
      >
        <MetricValue value="99.98" unit="%" trend="0.03%" />
        <Box direction="row" align="center" gap="3xsmall">
          <StatusGood color="icon-ok" aria-hidden />
          <Text>Above 99.9% target</Text>
        </Box>
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
          role="img"
          aria-label={systemHealthLabel}
          type="bar"
          thickness="3xsmall"
          size="full"
          round
          max={systemHealth.total}
          values={systemHealth.values.map(({ status, value }) => ({
            value,
            color: STATUS[status].fill,
          }))}
        />
        <Box direction="row" gap="small" wrap aria-hidden>
          {systemHealth.values.map(({ label, status, value }) => (
            <Box key={status} direction="row" align="center" gap="3xsmall">
              {STATUS[status].icon}
              <Text size="small">
                {value} {label}
              </Text>
            </Box>
          ))}
        </Box>
      </MetricTile>
      <MetricTile title="Capacity used" description={capacityDescription}>
        <MetricValue value={capacityUsed} unit="%" trend="2%" />
        <Meter
          role="img"
          aria-label={capacityLabel}
          type="bar"
          thickness="3xsmall"
          size="full"
          round
          max={100}
          values={[{ value: capacityUsed }]}
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
