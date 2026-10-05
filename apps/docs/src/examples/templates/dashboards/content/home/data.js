// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// The incoming theme update inverts today's layered background approach:
// the page is white and content surfaces are light grey. Until the official
// tokens are released these two surfaces are hard-coded here, in one place,
// so they can be swapped for `background-back`/`background-front` later.
export const pageBackground = '#ffffff';
export const surfaceBackground = '#f7f7f7';

// Service health
export const serviceHealthSummary = '128 systems · 4 regions · 1,842 volumes';

// Daily status for the last 28 days, oldest first.
export const uptimeDays = Array.from({ length: 28 }, (_, day) => {
  if (day === 7) return 'warning';
  if (day === 24 || day === 25) return 'critical';
  return 'ok';
});

export const systemHealth = {
  total: 128,
  healthy: 116,
  values: [
    { status: 'critical', label: 'Critical', value: 2 },
    { status: 'warning', label: 'Warning', value: 4 },
    { status: 'ok', label: 'Okay', value: 116 },
    { status: 'unknown', label: 'Unknown', value: 6 },
  ],
};

export const capacity = { used: 3.4, total: 4.8, unit: 'PB' };

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

// Discover services
export const serviceGroups = [
  { id: 'recommended', label: 'Recommended' },
  { id: 'networking', label: 'Networking' },
  { id: 'storage', label: 'Storage' },
  { id: 'private-cloud', label: 'Private Cloud' },
  { id: 'compute', label: 'Compute' },
];

export const services = [
  {
    category: 'Storage',
    title: 'Block Storage',
    description:
      'Low-latency block storage for databases and virtualized workloads.',
    groups: ['recommended', 'storage', 'private-cloud'],
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
  },
  {
    category: 'Networking',
    title: 'Global Load Balancer',
    description: 'Distribute traffic across regions for high availability.',
    groups: ['recommended', 'networking'],
    tag: 'New',
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
  },
  {
    category: 'Cloud Computing',
    title: 'Elastic Compute',
    description: 'On-demand scalable virtual machines for any workload.',
    groups: ['recommended', 'compute'],
    tag: 'New',
  },
];
