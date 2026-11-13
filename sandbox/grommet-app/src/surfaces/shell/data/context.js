// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// Context constructs are platform-level: tenant → workspace → region.
// Services with finer-grained context reconcile up into these selectors.
export const regions = [
  'United States (Texas)',
  'United States (Oregon)',
  'EU Central (Frankfurt)',
  'EU West (Ireland)',
  'AP Northeast (Tokyo)',
];

export const tenants = [
  {
    id: 'acme',
    name: 'Acme Corporation',
    workspaces: [
      {
        id: 'na-it-ops',
        name: 'North America IT Ops',
        regions: ['United States (Texas)', 'United States (Oregon)'],
        services: 12,
      },
      {
        id: 'emea-ops',
        name: 'EMEA Operations',
        regions: ['EU Central (Frankfurt)', 'EU West (Ireland)'],
        services: 7,
      },
      {
        id: 'dev-sandbox',
        name: 'Dev & Test Sandbox',
        regions: ['United States (Oregon)'],
        services: 3,
      },
    ],
  },
  {
    id: 'globex',
    name: 'Globex Retail Group (managed)',
    workspaces: [
      {
        id: 'globex-stores',
        name: 'Globex Store Network',
        regions: ['United States (Texas)', 'AP Northeast (Tokyo)'],
        services: 5,
      },
      {
        id: 'globex-dc',
        name: 'Globex Data Centers',
        regions: ['EU Central (Frankfurt)'],
        services: 4,
      },
    ],
  },
];

export const findWorkspace = id => {
  for (const tenant of tenants) {
    const workspace = tenant.workspaces.find(w => w.id === id);
    if (workspace) return { tenant, workspace };
  }
  return undefined;
};

export const notifications = [
  {
    id: 'n1',
    status: 'warning',
    title: '2 device subscriptions expire in 14 days',
    message: 'North America IT Ops · Compute Ops Management',
    when: '12 min ago',
  },
  {
    id: 'n2',
    status: 'normal',
    title: 'Firmware baseline SPP 2025.03 is available',
    message: 'Applies to 12 Gen11 servers',
    when: '2 h ago',
  },
  {
    id: 'n3',
    status: 'critical',
    title: 'Server hou-esx-04 lost connectivity',
    message: 'Houston · Last seen 04:12 UTC',
    when: 'Yesterday',
  },
  {
    id: 'n4',
    status: 'normal',
    title: 'Jordan Reyes was granted Workspace administrator',
    message: 'Roles & permissions',
    when: 'Yesterday',
  },
];
