// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export type Resource = {
  id: string;
  location: string;
};

export type ResourceFormValues = {
  resourceType: string;
  deploymentModel: string;
  resources: Resource[];
  region: string;
  networkName: string;
  publicAccess: boolean;
  autoScaling: boolean;
};

type ResourceOption = {
  value: string;
  title: string;
  description: string;
};

// Temporary hard-coded surface colors. The page is white and the form
// sections are light grey, which inverts the current theme's
// background-back/background-front relationship. Replace these with the
// official theme colors when they are released.
export const pageBackground = '#ffffff';
export const surfaceBackground = '#f7f7f7';

export const wizardTitle = 'Add resource';

export const resourceTypes: ResourceOption[] = [
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

export const deploymentModels: ResourceOption[] = [
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

export const defaultFormValues: ResourceFormValues = {
  // Deliberate choices: left unselected so the user must pick them. The
  // step's validate() blocks navigation until both are chosen.
  resourceType: '',
  deploymentModel: '',
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

export const getLabel = (options: ResourceOption[], value: string) =>
  options.find(option => option.value === value)?.title || '—';
