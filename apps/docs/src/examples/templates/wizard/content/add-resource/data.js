// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// Temporary hard-coded surface colors. The page is white and the form
// sections are light grey, which inverts the current theme's
// background-back/background-front relationship. Replace these with the
// official theme colors when they are released.
export const pageBackground = '#ffffff';
export const surfaceBackground = '#f7f7f7';

export const wizardTitle = 'Add resource';

export const resourceTypes = [
  {
    value: 'virtual-machines',
    title: 'Virtual machines',
    description: 'Deploy and manage cloud instances',
  },
  {
    value: 'containers',
    title: 'Containers',
    description: 'Run workloads in managed clusters',
  },
  {
    value: 'bare-metal',
    title: 'Bare metal',
    description: 'Provision dedicated physical servers',
  },
];

export const deploymentModels = [
  {
    value: 'on-premises',
    title: 'On-premises',
    description: 'Run within your own data center',
  },
  {
    value: 'public-cloud',
    title: 'Public cloud',
    description: 'Deploy to a managed cloud provider',
  },
];

export const regions = [
  'US East (Virginia)',
  'US West (Oregon)',
  'EU West (London)',
  'Asia Pacific (Singapore)',
];

export const defaultFormValues = {
  resourceType: 'containers',
  deploymentModel: 'public-cloud',
  resources: [
    { id: 'RES-7291XKVM', location: 'prod-us-east' },
    { id: 'RES-3845PCTR', location: 'staging-eu-west' },
    { id: 'RES-91827364KVMLONGID', location: 'analytics-us-central-extended' },
  ],
  region: '',
  networkName: '',
  publicAccess: false,
  autoScaling: true,
};

export const getLabel = (options, value) =>
  options.find(option => option.value === value)?.title || '—';
