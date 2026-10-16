// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// Figures for the fictional storage service shown in the mixed-actions view.

export const targets = {
  availability: 99.9, // percent
  capacityWarning: 80, // percent used
  capacityCritical: 90,
};

export const driveFailure = {
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

export const volumesStatus = ({ total, protectedCount }) =>
  protectedCount === total ? 'ok' : 'warning';

// For "good is zero" counts: any non-zero value takes the given severity.
export const countStatus = (count, severity = 'warning') =>
  count ? severity : 'ok';
