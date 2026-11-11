// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { Anchor } from 'grommet';
import { ShieldCheck } from '@hpe-design/icons-grommet';
import {
  MetricValue,
} from '../../../../components/MetricValue';
import { formatCount } from '../utils';
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
  targets,
  volumesStatus,
} from './data';
import type {
  OperationalStatus,
} from '../../../../components/status';

export const HealthOverview = () => {
  const { availability, capacity, drives, volumes } = driveFailure;
  const used = capacityPercent(capacity);
  const unprotected = volumes.total - volumes.protectedCount;

  const status = {
    availability: availabilityStatus(availability),
    capacity: capacityStatus(capacity),
    volumes: volumesStatus(volumes),
    drives: countStatus(drives.failed),
  };
  const linkIf = (value: OperationalStatus) =>
    value === 'ok' ? undefined : '#';

  return (
    <HealthSection>
      <HealthTile
        title="Availability"
        description={
          <>
            {availability.incidents > 0 ? (
              <Anchor href="#" size="inherit">
                {availability.incidents} incidents
              </Anchor>
            ) : (
              `${availability.incidents} incidents`
            )}{' '}
            causing {availability.downtime} minutes downtime in 28 days.
          </>
        }
      >
        <MetricValue value={availability.percent.toFixed(2)} unit="%" />
        {status.availability !== 'ok' && (
          <QuietStatusRow
            status={status.availability}
            href={linkIf(status.availability)}
          >
            Below {targets.availability}% target
          </QuietStatusRow>
        )}
      </HealthTile>
      <HealthTile
        title="Capacity used"
        description={`90% capacity within ${capacity.monthsTo90} months.`}
      >
        <MetricValue value={used} unit="%" />
        <Bar
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
      </HealthTile>
      <HealthTile
        title="Volume protection"
        description={`Policies verified ${volumes.verified}.`}
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
      </HealthTile>
      <HealthTile
        title="Failed drives"
        description={`${drives.spares} hot spares available.`}
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
      </HealthTile>
    </HealthSection>
  );
};
