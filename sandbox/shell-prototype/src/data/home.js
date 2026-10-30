// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// Figures for the GreenLake home, following the overview dashboard template
// (apps/docs templates/dashboards). Thresholds live here so every tile
// agrees on what counts as a warning.

// Health overview — a compute user's view of the platform. Figures
// reconcile with the Compute Ops Management overview (23 servers: 3
// critical, 3 warning, 2 utilization alerts, SPP 2025.03 recommended) and
// the subscription summaries. Only genuine exceptions take a status; the
// rest is stated quietly so the one thing that needs attention stands out.
export const targets = {
  firmwareWarning: 95, // percent compliant
  firmwareCritical: 80,
  utilizationWarning: 80, // percent average CPU
  utilizationCritical: 90,
  renewalWarning: 30, // days
};

export const health = {
  servers: {
    total: 23,
    critical: 3,
    warning: 3,
    locations: ['Houston', 'Chicago'],
  },
  firmware: {
    total: 23,
    compliant: 22,
    baseline: 'SPP 2025.03',
    updatesAvailable: 12,
    generation: 'Gen11',
  },
  utilization: {
    averageCpu: 62,
    alerts: 2, // informational; the estate still has headroom
    peakCpu: 91,
    peakServer: 'hou-esx-02',
  },
  subscriptions: {
    total: 31,
    renewalsDue: 3, // upcoming, outside the warning window
    expiringSoon: 0, // within targets.renewalWarning days
    nextRenewal: 'Aug 1, 2026',
    devices: 161,
  },
};

export const formatCount = count => count.toLocaleString('en-US');

export const healthyServers = ({ total, critical, warning }) =>
  total - critical - warning;

export const serversStatus = ({ critical, warning }) => {
  if (critical) return 'critical';
  if (warning) return 'warning';
  return 'ok';
};

export const firmwarePercent = ({ compliant, total }) =>
  Math.round((compliant / total) * 100);

export const firmwareStatus = firmware => {
  const percent = firmwarePercent(firmware);
  if (percent < targets.firmwareCritical) return 'critical';
  if (percent < targets.firmwareWarning) return 'warning';
  return 'ok';
};

export const utilizationStatus = ({ averageCpu }) => {
  if (averageCpu >= targets.utilizationCritical) return 'critical';
  if (averageCpu >= targets.utilizationWarning) return 'warning';
  return 'ok';
};

// For "good is zero" counts: any non-zero value takes the given severity.
export const countStatus = (count, severity = 'warning') =>
  count ? severity : 'ok';

// This week at a glance
export const budget = 265;

// Monthly spend in thousands of USD.
export const costTrend = [
  { month: 'December', actual: 243 },
  { month: 'January', actual: 241 },
  { month: 'February', actual: 247 },
  { month: 'March', actual: 250 },
  { month: 'April', actual: 252 },
  { month: 'May', actual: 257 },
  { month: 'June', actual: 261 },
  { month: 'July', actual: 265 },
  { month: 'August', actual: 270 },
  { month: 'September', actual: 284 },
].map(datum => ({ ...datum, budget }));

export const attentionItems = [
  { status: 'critical', label: 'Act now', count: 3 },
  { status: 'warning', label: 'Fix this week', count: 26 },
  { status: 'unknown', label: 'Plan ahead', count: 260 },
];

export const slaStats = [
  { name: 'Sev 1 response time', value: '14', unit: 'min', status: 'ok' },
  { name: 'Sev 2 response time', value: '1.7', unit: 'hr', status: 'ok' },
  { name: 'Resolved within SLA', value: '91', unit: '%', status: 'warning' },
];

export const devicesByLocation = [
  { name: 'Houston', location: [29.76, -95.37], count: 44 },
  { name: 'San Jose', location: [37.34, -121.89], count: 26 },
  { name: 'Chicago', location: [41.88, -87.63], count: 12 },
];

// Discover services
export const serviceGroups = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'networking', label: 'Networking' },
  { id: 'storage', label: 'Storage' },
  { id: 'private-cloud', label: 'Private Cloud' },
  { id: 'compute', label: 'Compute' },
];

// `serviceId` links a catalog entry to a service in this prototype; the
// rest would route to their own pages.
export const catalog = [
  {
    category: 'Storage',
    title: 'Block Storage',
    description:
      'Low-latency block storage for databases and virtualized workloads.',
    groups: ['recommended', 'storage', 'private-cloud'],
    serviceId: 'data-services',
  },
  {
    category: 'Data Storage',
    title: 'Object Storage',
    description: 'Store and retrieve unlimited unstructured data securely.',
    groups: ['recommended', 'storage'],
  },
  {
    category: 'Storage',
    title: 'File Storage',
    description:
      'Scale-out file storage for AI, analytics, and unstructured data.',
    groups: ['recommended', 'storage'],
  },
  {
    category: 'Data protection',
    title: 'Disaster Recovery',
    description: 'Orchestrated failover and failback across sites and clouds.',
    groups: ['recommended', 'storage', 'private-cloud'],
    serviceId: 'backup',
  },
  {
    category: 'Networking',
    title: 'Global Load Balancer',
    description: 'Distribute traffic across regions for high availability.',
    groups: ['recommended', 'networking'],
    tag: 'New',
  },
  {
    category: 'Networking',
    title: 'Mist AI',
    description: 'AI-driven wired and wireless network operations.',
    groups: ['networking'],
    serviceId: 'networking',
  },
  {
    category: 'Security',
    title: 'Identity Access Manager',
    description: 'Centralized authentication and role-based access control.',
    groups: ['recommended', 'networking', 'private-cloud'],
  },
  {
    category: 'Observability',
    title: 'Infrastructure Monitor',
    description: 'Real-time metrics, logs, and alerts across your stack.',
    groups: ['recommended', 'compute', 'private-cloud'],
    serviceId: 'opsramp',
  },
  {
    category: 'Cloud Computing',
    title: 'Elastic Compute',
    description: 'On-demand scalable virtual machines for any workload.',
    groups: ['recommended', 'compute'],
    tag: 'New',
  },
  {
    category: 'Compute',
    title: 'Compute Ops Management',
    description:
      'Cloud-based management for HPE ProLiant servers across every site.',
    groups: ['compute'],
    serviceId: 'compute',
  },
];
