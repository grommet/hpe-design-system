// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { DashboardStatus } from '../../../../components/helpers/Dashboard/StatusCount';
import type { TrendDirection } from '../../../../components/helpers/Dashboard/MetricValue';

export type OperationalStatus = Exclude<DashboardStatus, 'unknown'>;
export type HealthScenario = {
  checked: string;
  availability: {
    percent: number;
    trend?: string;
    trendDirection?: TrendDirection;
    incidents: number;
    downtime: number;
  };
  capacity: {
    used: number;
    total: number;
    unit: string;
    trend?: string;
    monthsTo90: number;
  };
  volumes: { total: number; protectedCount: number; verified: string };
  drives: { total: number; failed: number; spares: number };
};
// Figures for the fictional storage service shown in the mixed-actions view.
export const targets = {
  availability: 99.9, // percent
  capacityWarning: 80, // percent used
  capacityCritical: 90,
};

export const driveFailure: HealthScenario = {
  checked: '2 min ago',
  availability: {
    percent: 99.98,
    trend: '0.03%',
    trendDirection: 'up',
    incidents: 2,
    downtime: 9,
  },
  capacity: { used: 3.4, total: 4.8, unit: 'PB', trend: '2%', monthsTo90: 9 },
  volumes: { total: 1842, protectedCount: 1842, verified: '4 min ago' },
  drives: { total: 1104, failed: 2, spares: 4 },
};

export const formatCount = (count: number) => count.toLocaleString('en-US');

export const capacityPercent = ({
  used,
  total,
}: Pick<HealthScenario['capacity'], 'used' | 'total'>) =>
  Math.round((used / total) * 100);

// Status derivations keep thresholds in one place so every variant agrees on
// what counts as a warning.
export const availabilityStatus = ({
  percent,
}: Pick<HealthScenario['availability'], 'percent'>): OperationalStatus =>
  percent >= targets.availability ? 'ok' : 'warning';

export const capacityStatus = (
  capacity: Pick<HealthScenario['capacity'], 'used' | 'total'>,
): OperationalStatus => {
  const percent = capacityPercent(capacity);
  if (percent >= targets.capacityCritical) return 'critical';
  if (percent >= targets.capacityWarning) return 'warning';
  return 'ok';
};

// The capacity threshold a non-ok status has crossed, for verdict copy.
export const capacityThreshold = (status: OperationalStatus) =>
  status === 'critical' ? targets.capacityCritical : targets.capacityWarning;

export const volumesStatus = ({
  total,
  protectedCount,
}: Pick<
  HealthScenario['volumes'],
  'total' | 'protectedCount'
>): OperationalStatus => (protectedCount === total ? 'ok' : 'warning');

// For "good is zero" counts: any non-zero value takes the given severity.
export const countStatus = (
  count: number,
  severity: DashboardStatus = 'warning',
): DashboardStatus => (count ? severity : 'ok');
