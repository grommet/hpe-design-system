// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// Two snapshots of the same fictional storage service so each health
// overview variant can be judged on a quiet day and on a bad one. Only the
// figures a storage admin checks at a glance are modelled here.

export const targets = {
  availability: 99.9, // percent
  latency: 1, // ms, P95 read
  capacityWarning: 80, // percent used
  capacityCritical: 90,
  nearFull: 80, // an array over this is "near full"
};

export const scenarios = {
  healthy: {
    label: 'All healthy',
    checked: '2 min ago',
    availability: {
      percent: 99.98,
      trend: '0.03%',
      trendDirection: 'up',
      incidents: 2,
      downtime: 9,
    },
    capacity: { used: 3.4, total: 4.8, unit: 'PB', trend: '2%', monthsTo90: 9 },
    latency: { p95: 0.8, trend: '0.1 ms', trendDirection: 'down' },
    arrays: { total: 12, critical: 0, warning: 0, unknown: 0 },
    volumes: { total: 1842, protectedCount: 1842, verified: '4 min ago' },
    snapshots: { total: 362, failed: 0, failedOn: null },
    drives: { total: 1104, failed: 0, spares: 6 },
    alerts: { critical: 0, warning: 3, lastCleared: '6 days ago', on: null },
    nearFull: { count: 0, highest: 76, highestOn: 'fra-dc1-03' },
  },
  degraded: {
    label: 'Needs attention',
    checked: '2 min ago',
    availability: {
      percent: 99.87,
      trend: '0.11%',
      trendDirection: 'down',
      incidents: 3,
      downtime: 54,
    },
    capacity: { used: 4.2, total: 4.8, unit: 'PB', trend: '6%', monthsTo90: 2 },
    latency: { p95: 1.6, trend: '0.7 ms', trendDirection: 'up' },
    arrays: { total: 12, critical: 1, warning: 1, unknown: 0 },
    volumes: { total: 1842, protectedCount: 1840, verified: '4 min ago' },
    snapshots: { total: 362, failed: 4, failedOn: 'fra-dc2-01' },
    drives: { total: 1104, failed: 2, spares: 4 },
    alerts: { critical: 2, warning: 7, lastCleared: null, on: 'fra-dc2-01' },
    nearFull: { count: 3, highest: 94, highestOn: 'fra-dc2-01' },
  },
};

// A quiet day with one thing wrong, for judging how a single exception reads
// against three healthy tiles. Kept out of `scenarios` so the paired
// healthy/degraded previews are unchanged.
export const driveFailure = {
  ...scenarios.healthy,
  label: 'Two failed drives',
  drives: { total: 1104, failed: 2, spares: 4 },
};

export const formatCount = count => count.toLocaleString('en-US');

export const capacityPercent = ({ used, total }) =>
  Math.round((used / total) * 100);

// Status derivations keep thresholds in one place so every variant agrees on
// what counts as a warning.
export const availabilityStatus = ({ percent }) =>
  percent >= targets.availability ? 'ok' : 'warning';

export const capacityStatus = capacity => {
  const percent = capacityPercent(capacity);
  if (percent >= targets.capacityCritical) return 'critical';
  if (percent >= targets.capacityWarning) return 'warning';
  return 'ok';
};

// The capacity threshold a non-ok status has crossed, for verdict copy.
export const capacityThreshold = status =>
  status === 'critical' ? targets.capacityCritical : targets.capacityWarning;

export const latencyStatus = ({ p95 }) =>
  p95 <= targets.latency ? 'ok' : 'warning';

export const arraysStatus = ({ critical, warning }) => {
  if (critical) return 'critical';
  if (warning) return 'warning';
  return 'ok';
};

export const volumesStatus = ({ total, protectedCount }) =>
  protectedCount === total ? 'ok' : 'warning';

// For "good is zero" counts: any non-zero value takes the given severity.
export const countStatus = (count, severity = 'warning') =>
  count ? severity : 'ok';
