// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Children, useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Heading, ResponsiveContext } from 'grommet';
import { Certificate, Cpu } from '@hpe-design/icons-grommet';
import { useShell } from '../../contexts/ShellContext';
import {
  MetricTile,
  MetricValue,
  QuietStatusRow,
  StatusBar,
} from '../../components/common';
import {
  countStatus,
  firmwarePercent,
  firmwareStatus,
  formatCount,
  health,
  healthyServers,
  serversStatus,
  targets,
  utilizationStatus,
} from '../../data/home';

const columnCount = { xsmall: 1, small: 1, medium: 2, large: 4, xlarge: 4 };

// Equal-width metric tiles: four across, two at medium, stacked when small.
const MetricGroup = ({ children, ...rest }) => {
  const size = useContext(ResponsiveContext);
  const items = Children.toArray(children);
  const count = Math.min(columnCount[size] || columnCount.large, items.length);
  return (
    <Grid columns={Array(count).fill('flex')} gap="small" {...rest}>
      {items}
    </Grid>
  );
};

MetricGroup.propTypes = {
  children: PropTypes.node,
};

// Health overview — a compute user's four questions: is the estate
// healthy, is it current, is it busy, will it keep running. Exceptions link
// to the place to deal with them (mixed-actions variant).
export const HealthOverview = () => {
  const { dispatch } = useShell();
  const { servers, firmware, utilization, subscriptions } = health;

  const status = {
    servers: serversStatus(servers),
    firmware: firmwareStatus(firmware),
    utilization: utilizationStatus(utilization),
    subscriptions: countStatus(subscriptions.expiring),
  };
  const attention = servers.critical + servers.warning;
  const compliance = firmwarePercent(firmware);

  const openCompute = pageId => () =>
    dispatch({ type: 'OPEN_SERVICE', serviceId: 'compute', pageId });
  const openPlatform = pageId => () =>
    dispatch({ type: 'OPEN_PLATFORM_PAGE', pageId });
  const linkIf = (value, onClick) => (value === 'ok' ? undefined : onClick);

  return (
    <Box as="section" gap="small" flex={false}>
      <Heading level={2} margin="none">
        Health overview
      </Heading>
      <MetricGroup>
        <MetricTile
          title="Server health"
          description={`${servers.critical} critical, ${servers.warning} warning across ${servers.locations.join(' and ')}.`}
        >
          <MetricValue
            value={healthyServers(servers)}
            unit={`of ${servers.total} healthy`}
          />
          <QuietStatusRow
            status={status.servers}
            onClick={linkIf(status.servers, openCompute('servers-all'))}
            icon={<Cpu aria-hidden="true" />}
          >
            {attention
              ? `${attention} servers need attention`
              : 'All servers healthy'}
          </QuietStatusRow>
        </MetricTile>
        <MetricTile
          title="Firmware compliance"
          description={`Updates available for ${firmware.updatesAvailable} ${firmware.generation} servers.`}
        >
          <MetricValue value={compliance} unit="%" />
          <StatusBar
            alignToText
            label={`${firmware.compliant} of ${firmware.total} servers on ${firmware.baseline}`}
            max={100}
            value={compliance}
            status={status.firmware}
          />
          <QuietStatusRow
            status={status.firmware}
            onClick={linkIf(status.firmware, openCompute('firmware-baselines'))}
          >
            {firmware.total - firmware.compliant
              ? `${firmware.total - firmware.compliant} servers below baseline ${firmware.baseline}`
              : `All servers on ${firmware.baseline}`}
          </QuietStatusRow>
        </MetricTile>
        <MetricTile
          title="Utilization"
          description={`Peak ${utilization.peakCpu}% on ${utilization.peakServer} this week.`}
        >
          <MetricValue value={utilization.averageCpu} unit="% avg CPU" />
          <StatusBar
            alignToText
            label={`${utilization.averageCpu}% average CPU utilization`}
            max={100}
            value={utilization.averageCpu}
            status={status.utilization}
          />
          <QuietStatusRow
            status={status.utilization}
            onClick={linkIf(
              status.utilization,
              openCompute('ai-insights-overview'),
            )}
          >
            {utilization.alerts
              ? `${utilization.alerts} utilization alerts`
              : 'Within capacity headroom'}
          </QuietStatusRow>
        </MetricTile>
        <MetricTile
          title="Subscriptions"
          description={`Next renewal ${subscriptions.nextRenewal} · ${formatCount(subscriptions.devices)} device subscriptions.`}
        >
          <MetricValue
            value={subscriptions.total - subscriptions.expiring}
            unit={`of ${subscriptions.total} active`}
          />
          <QuietStatusRow
            status={status.subscriptions}
            onClick={linkIf(
              status.subscriptions,
              openPlatform('service-subscriptions'),
            )}
            icon={<Certificate aria-hidden="true" />}
          >
            {subscriptions.expiring
              ? `${subscriptions.expiring} expire within ${targets.renewalWindow} days`
              : 'No renewals due'}
          </QuietStatusRow>
        </MetricTile>
      </MetricGroup>
    </Box>
  );
};
