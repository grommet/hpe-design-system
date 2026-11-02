// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { OperationalStatus } from '../../../components/status';

export const targets = {
  availability: 99.9, // percent
  capacityWarning: 80, // percent used
  capacityCritical: 90,
};

export type HealthScenario = {
  availability: {
    percent: number;
    incidents: number;
    downtime: number;
  };
  capacity: {
    used: number;
    total: number;
    unit: string;
    monthsTo90: number;
  };
  volumes: {
    total: number;
    protectedCount: number;
    verified: string;
  };
  drives: {
    total: number;
    failed: number;
    spares: number;
  };
};

export const driveFailure: HealthScenario = {
  availability: {
    percent: 99.98,
    incidents: 2,
    downtime: 9,
  },
  capacity: { used: 3.4, total: 4.8, unit: 'PB', monthsTo90: 9 },
  volumes: { total: 1842, protectedCount: 1842, verified: '4 minutes ago' },
  drives: { total: 1104, failed: 2, spares: 4 },
};

export const capacityPercent = ({ used, total }: HealthScenario['capacity']) =>
  Math.round((used / total) * 100);

// Status derivations keep thresholds in one place.
export const availabilityStatus = (
  { percent }: HealthScenario['availability'],
): 'ok' | 'warning' =>
  percent >= targets.availability ? 'ok' : 'warning';

export const capacityStatus = (
  capacity: HealthScenario['capacity'],
): OperationalStatus => {
  const percent = capacityPercent(capacity);
  if (percent >= targets.capacityCritical) return 'critical';
  if (percent >= targets.capacityWarning) return 'warning';
  return 'ok';
};

// The capacity threshold a non-ok status has crossed, for verdict copy.
export const capacityThreshold = (status: 'critical' | 'warning') =>
  status === 'critical' ? targets.capacityCritical : targets.capacityWarning;

export const volumesStatus = ({
  total,
  protectedCount,
}: HealthScenario['volumes']): 'ok' | 'warning' =>
  protectedCount === total ? 'ok' : 'warning';

// For "good is zero" counts, any non-zero value is a warning.
export const countStatus = (count: number): 'ok' | 'warning' =>
  count > 0 ? 'warning' : 'ok';
