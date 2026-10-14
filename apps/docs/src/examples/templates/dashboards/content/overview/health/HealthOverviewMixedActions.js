// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import PropTypes from 'prop-types';
import { Box, Button, Text } from 'grommet';
import { ShieldCheck } from '@hpe-design/icons-grommet';
import { MetricValue } from '../../../components';
import { Bar } from './Bar';
import { HealthSection, HealthTile } from './HealthSection';
import { QuietStatusRow } from './status';
import {
  availabilityStatus,
  capacityPercent,
  capacityStatus,
  capacityThreshold,
  countStatus,
  driveFailure,
  formatCount,
  targets,
  volumesStatus,
} from './data';

// Variant 7: mixed, actionable, with the heading counting the things that
// need attention rather than the tiles that hold them, so "2 need attention"
// agrees with the "2 of 1,104" failed drives beneath it. Each exception tile
// can carry one call to action. Without tileActions the verdict is the link,
// as in the mixed, actionable variant. With tileActions a secondary button is
// the only way in and the verdict stays plain text, so a tile never offers
// two routes to the same place. Buttons are named for what the admin does
// next, not for what the system cannot do: a failed drive is replaced, not
// fixed from a dashboard.
//
// Descriptions follow the content at the tile's normal gap rather than
// sitting on the bottom edge; one-line descriptions leave their spare room
// at the bottom of the tile, which reads better than a band in the middle.
const Tile = props => <HealthTile anchor={false} {...props} />;

export const HealthOverviewMixedActions = ({
  scenario = driveFailure,
  tileActions = false,
}) => {
  const { availability, capacity, checked, drives, volumes } = scenario;
  const used = capacityPercent(capacity);
  const unprotected = volumes.total - volumes.protectedCount;

  const status = {
    availability: availabilityStatus(availability),
    capacity: capacityStatus(capacity),
    volumes: volumesStatus(volumes),
    drives: countStatus(drives.failed),
  };
  // A breached target counts once; each unprotected volume or failed drive
  // counts on its own, which is how an admin would tally the work.
  const issues = {
    availability: status.availability === 'ok' ? 0 : 1,
    capacity: status.capacity === 'ok' ? 0 : 1,
    volumes: unprotected,
    drives: drives.failed,
  };
  const total = Object.values(issues).reduce((sum, count) => sum + count, 0);
  const worst = Object.values(status).includes('critical')
    ? 'critical'
    : 'warning';

  const linkIf = value => (value === 'ok' || tileActions ? undefined : '#');
  const actionIf = (value, label) =>
    tileActions && value !== 'ok' ? (
      <Button label={label} secondary href="#" />
    ) : undefined;

  const summary = (
    <Box direction="row" align="center" gap="small">
      {total ? (
        <QuietStatusRow status={worst} href="#">
          {total} need{total === 1 ? 's' : ''} attention
        </QuietStatusRow>
      ) : (
        <Text>All healthy</Text>
      )}
      <Text color="text-weak">Checked {checked}</Text>
    </Box>
  );

  return (
    <HealthSection summary={summary}>
      <Tile
        title="Availability"
        description={`${availability.incidents} incidents, ${
          availability.downtime
        } min downtime in 28 days.`}
        action={actionIf(status.availability, 'View incidents')}
      >
        <MetricValue
          value={availability.percent.toFixed(2)}
          unit="%"
          trend={availability.trend}
          trendDirection={availability.trendDirection}
        />
        <QuietStatusRow
          status={status.availability}
          href={linkIf(status.availability)}
        >
          {status.availability === 'ok' ? 'Above' : 'Below'}{' '}
          {targets.availability}% target
        </QuietStatusRow>
      </Tile>
      <Tile
        title="Capacity used"
        description={`${capacity.used} of ${capacity.total} ${
          capacity.unit
        } used. 90% in about ${capacity.monthsTo90} months.`}
        action={actionIf(status.capacity, 'Review capacity')}
      >
        <MetricValue value={used} unit="%" trend={capacity.trend} />
        <Bar
          alignToText
          label={`${used}% of ${capacity.total} ${capacity.unit} used`}
          max={100}
          value={used}
          status={status.capacity}
        />
        {status.capacity !== 'ok' && (
          <QuietStatusRow
            status={status.capacity}
            href={linkIf(status.capacity)}
          >
            Above {capacityThreshold(status.capacity)}% {status.capacity}{' '}
            threshold
          </QuietStatusRow>
        )}
      </Tile>
      <Tile
        title="Volume protection"
        description={`Policies verified ${volumes.verified}.`}
        action={actionIf(status.volumes, 'Protect volumes')}
      >
        <MetricValue
          value={formatCount(volumes.protectedCount)}
          unit={`of ${formatCount(volumes.total)}`}
        />
        <QuietStatusRow
          status={status.volumes}
          href={linkIf(status.volumes)}
          icon={<ShieldCheck aria-hidden />}
        >
          {unprotected ? `${unprotected} unprotected volumes` : 'All protected'}
        </QuietStatusRow>
      </Tile>
      <Tile
        title="Failed drives"
        description={`${drives.spares} hot spares available.`}
        action={actionIf(status.drives, 'Replace drives')}
      >
        <MetricValue
          value={drives.failed}
          unit={`of ${formatCount(drives.total)}`}
        />
        <QuietStatusRow status={status.drives} href={linkIf(status.drives)}>
          {drives.failed
            ? `${drives.failed} rebuilds in progress`
            : 'No rebuilds in progress'}
        </QuietStatusRow>
      </Tile>
    </HealthSection>
  );
};

HealthOverviewMixedActions.propTypes = {
  scenario: PropTypes.shape({}),
  tileActions: PropTypes.bool,
};
