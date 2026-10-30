// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Children, useContext } from 'react';
import PropTypes from 'prop-types';
import { Anchor, Box, Grid, Heading, ResponsiveContext } from 'grommet';
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
// healthy, is it current, is it busy, will it keep running. Only genuine
// exceptions get a status row; informational counts are linked from the
// description so one tile stands out instead of four (mixed-actions
// variant of the overview dashboard template).
export const HealthOverview = () => {
  const { dispatch } = useShell();
  const { servers, firmware, utilization, subscriptions } = health;

  const status = {
    servers: serversStatus(servers),
    firmware: firmwareStatus(firmware),
    utilization: utilizationStatus(utilization),
    subscriptions: countStatus(subscriptions.expiringSoon),
  };
  const attention = servers.critical + servers.warning;
  const compliance = firmwarePercent(firmware);
  const pending = firmware.total - firmware.compliant;

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
          description={
            <>
              {pending ? (
                <>
                  <Anchor
                    size="inherit"
                    onClick={openCompute('firmware-baselines')}
                  >
                    {pending} {pending === 1 ? 'server' : 'servers'}
                  </Anchor>{' '}
                  pending {firmware.baseline}.
                </>
              ) : (
                `All servers on ${firmware.baseline}.`
              )}{' '}
              {firmware.updatesAvailable} {firmware.generation} updates
              available.
            </>
          }
        >
          <MetricValue value={compliance} unit="%" />
          <StatusBar
            alignToText
            label={`${firmware.compliant} of ${firmware.total} servers on ${firmware.baseline}`}
            max={100}
            value={compliance}
            status={status.firmware}
          />
          {status.firmware !== 'ok' && (
            <QuietStatusRow
              status={status.firmware}
              onClick={openCompute('firmware-baselines')}
            >
              Below {targets.firmwareWarning}% compliance target
            </QuietStatusRow>
          )}
        </MetricTile>
        <MetricTile
          title="Utilization"
          description={
            <>
              {utilization.alerts ? (
                <Anchor
                  size="inherit"
                  onClick={openCompute('ai-insights-overview')}
                >
                  {utilization.alerts} utilization alerts
                </Anchor>
              ) : (
                'No utilization alerts'
              )}{' '}
              this week; peak {utilization.peakCpu}% on {utilization.peakServer}
              .
            </>
          }
        >
          <MetricValue value={utilization.averageCpu} unit="% avg CPU" />
          <StatusBar
            alignToText
            label={`${utilization.averageCpu}% average CPU utilization`}
            max={100}
            value={utilization.averageCpu}
            status={status.utilization}
          />
          {status.utilization !== 'ok' && (
            <QuietStatusRow
              status={status.utilization}
              onClick={openCompute('ai-insights-overview')}
            >
              Above {targets.utilizationWarning}% average
            </QuietStatusRow>
          )}
        </MetricTile>
        <MetricTile
          title="Subscriptions"
          description={
            <>
              <Anchor
                size="inherit"
                onClick={openPlatform('service-subscriptions')}
              >
                {subscriptions.renewalsDue} renewals
              </Anchor>{' '}
              due by {subscriptions.nextRenewal} ·{' '}
              {formatCount(subscriptions.devices)} device subscriptions.
            </>
          }
        >
          <MetricValue
            value={subscriptions.total - subscriptions.expiringSoon}
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
            {subscriptions.expiringSoon
              ? `${subscriptions.expiringSoon} expire within ${targets.renewalWarning} days`
              : 'All active'}
          </QuietStatusRow>
        </MetricTile>
      </MetricGroup>
    </Box>
  );
};
