// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  Analytics,
  Cpu,
  Cubes,
  Database,
  Favorite,
  Monitor,
  Network,
  Performance,
  Servers,
  Storage,
  Target,
  Tree,
  VirtualMachine,
  Wifi,
} from '@hpe-design/icons-grommet';

// A service owns its local navigation. The platform ("HPE GreenLake") is the
// service you are in when at the GreenLake home; it has no local nav because
// the platform's own management pages are exposed as capabilities in the rail.
const genericNav = {
  primaryAction: 'Add resource',
  groups: [
    [
      { id: 'overview', label: 'Overview' },
      {
        id: 'resources',
        label: 'Resources',
        children: [
          { id: 'resources-all', label: 'All resources' },
          { id: 'resources-groups', label: 'Groups' },
        ],
      },
      {
        id: 'activity',
        label: 'Activity',
        children: [
          { id: 'activity-log', label: 'Activity log' },
          { id: 'activity-jobs', label: 'Jobs' },
        ],
      },
    ],
    [
      { id: 'settings', label: 'Settings' },
      { id: 'help', label: 'Help & support' },
    ],
  ],
};

const computeNav = {
  primaryAction: 'Add resource',
  groups: [
    [
      { id: 'overview', label: 'Overview' },
      {
        id: 'servers',
        label: 'Servers',
        children: [
          { id: 'servers-all', label: 'All servers' },
          { id: 'servers-groups', label: 'Groups' },
          { id: 'servers-settings', label: 'Server settings' },
        ],
      },
      {
        id: 'manage',
        label: 'Manage',
        children: [
          { id: 'manage-appliances', label: 'Appliances' },
          { id: 'manage-baselines', label: 'Firmware baselines' },
          { id: 'manage-settings', label: 'Settings' },
        ],
      },
      {
        id: 'firmware',
        label: 'Firmware',
        children: [
          { id: 'firmware-baselines', label: 'Baselines' },
          { id: 'firmware-updates', label: 'Updates' },
        ],
      },
      {
        id: 'ai-insights',
        label: 'AI insights',
        children: [
          { id: 'ai-insights-overview', label: 'Insights' },
          { id: 'ai-insights-recommendations', label: 'Recommendations' },
        ],
      },
      {
        id: 'activity',
        label: 'Activity',
        children: [
          { id: 'activity-log', label: 'Activity log' },
          { id: 'activity-jobs', label: 'Jobs' },
        ],
      },
    ],
    [
      {
        id: 'devices',
        label: 'Devices',
        children: [
          { id: 'devices-inventory', label: 'Inventory' },
          { id: 'devices-locations', label: 'Locations' },
        ],
      },
      {
        id: 'subscriptions',
        label: 'Subscriptions',
        children: [
          { id: 'subscriptions-active', label: 'Active' },
          { id: 'subscriptions-expiring', label: 'Expiring' },
        ],
      },
      {
        id: 'sustainability',
        label: 'Sustainability',
        children: [
          { id: 'sustainability-emissions', label: 'Carbon emissions' },
          { id: 'sustainability-energy', label: 'Energy' },
        ],
      },
      {
        id: 'wellness',
        label: 'Wellness',
        children: [
          { id: 'wellness-dashboard', label: 'Dashboard' },
          { id: 'wellness-cases', label: 'Support cases' },
        ],
      },
    ],
  ],
};

export const services = {
  greenlake: {
    id: 'greenlake',
    name: 'HPE GreenLake',
    icon: Target,
    kind: 'platform',
    region: 'GLP platform',
  },
  compute: {
    id: 'compute',
    name: 'HPE Compute Ops Management',
    icon: Cpu,
    category: 'Compute',
    region: 'US West',
    description:
      'Cloud-based management for HPE ProLiant servers across every site.',
    nav: computeNav,
  },
  'compute-eu': {
    id: 'compute-eu',
    name: 'HPE Compute Ops Management',
    icon: Cpu,
    category: 'Compute',
    region: 'EU-west',
    description:
      'Cloud-based management for HPE ProLiant servers across every site.',
    nav: computeNav,
  },
  networking: {
    id: 'networking',
    name: 'Mist AI',
    icon: Network,
    category: 'Networking',
    region: 'US-east',
    description:
      'AI-driven wired and wireless network operations from HPE Networking.',
    // Marvis™ is the service's landing page rather than a generic overview.
    defaultPage: 'marvis',
    nav: {
      primaryAction: 'Add resource',
      groups: [
        [
          { id: 'monitor', label: 'Monitor' },
          { id: 'marvis', label: 'Marvis™' },
          { id: 'clients', label: 'Clients' },
          { id: 'access-points', label: 'Access Points' },
          { id: 'switches', label: 'Switches' },
          { id: 'locations', label: 'Locations' },
          { id: 'analytics', label: 'Analytics' },
          { id: 'network', label: 'Network' },
          { id: 'organization', label: 'Organization' },
        ],
      ],
    },
  },
  opsramp: {
    id: 'opsramp',
    name: 'OpsRamp',
    icon: Performance,
    category: 'Management & Governance',
    region: 'EU-west',
    description: 'Hybrid observability and IT operations management.',
    nav: genericNav,
  },
  'opsramp-us': {
    id: 'opsramp-us',
    name: 'OpsRamp',
    icon: Performance,
    category: 'Management & Governance',
    region: 'US-east',
    description: 'Hybrid observability and IT operations management.',
    nav: genericNav,
  },
  'consumption-analytics': {
    id: 'consumption-analytics',
    name: 'Consumption Analytics',
    icon: Analytics,
    category: 'Management & Governance',
    region: 'EU-west',
    description: 'Usage, cost, and capacity insights for metered services.',
    nav: genericNav,
  },
  vmware: {
    id: 'vmware',
    name: 'VMware Cloud Foundation, Managed for you',
    icon: VirtualMachine,
    category: 'Private Cloud',
    region: 'US-east',
    description: 'A managed private cloud running VMware Cloud Foundation.',
    nav: genericNav,
  },
  wellness: {
    id: 'wellness',
    name: 'Wellness Dashboard',
    icon: Favorite,
    category: 'Management & Governance',
    region: 'US West',
    description: 'Proactive health and support insights for your estate.',
    nav: genericNav,
  },
  'data-services': {
    id: 'data-services',
    name: 'Data Services',
    icon: Storage,
    category: 'Storage',
    region: 'AP NorthEast- Tokyo',
    description: 'Unified data management for block, file, and backup.',
    nav: genericNav,
  },
  backup: {
    id: 'backup',
    name: 'Backup and recovery',
    icon: Database,
    category: 'Data Protection',
    region: 'GLP platform',
    description: 'Policy-driven protection for on-prem and cloud workloads.',
    nav: genericNav,
  },
  fleetpoc3: {
    id: 'fleetpoc3',
    name: 'FLEETPOC3',
    icon: Servers,
    category: 'Management & Governance',
    region: 'US West',
    description: 'Proof-of-concept fleet for server lifecycle automation.',
    nav: genericNav,
  },
  'aruba-central-aqa': {
    id: 'aruba-central-aqa',
    name: 'HPE Aruba Networking Central AQA',
    icon: Wifi,
    category: 'Management & Governance',
    region: 'US West',
    description: 'Cloud-managed wired and wireless networking (AQA tenant).',
    nav: genericNav,
  },
  hcipoc: {
    id: 'hcipoc',
    name: 'HCIPOC',
    icon: Cubes,
    category: 'Management & Governance',
    region: 'US West',
    description: 'Hyperconverged infrastructure proof of concept.',
    nav: genericNav,
  },
  'opsramp-us-west': {
    id: 'opsramp-us-west',
    name: 'OpsRamp',
    icon: Performance,
    category: 'Management & Governance',
    region: 'US West',
    description: 'Hybrid observability and IT operations management.',
    nav: genericNav,
  },
  'user-experience-insight': {
    id: 'user-experience-insight',
    name: 'User Experience Insight',
    icon: Monitor,
    category: 'Networking',
    region: 'US West',
    description: 'Sensor-based monitoring of the end-user network experience.',
    nav: genericNav,
  },
  'aruba-central-ppk': {
    id: 'aruba-central-ppk',
    name: 'HPE Aruba Networking Central PPK',
    icon: Wifi,
    category: 'Management & Governance',
    region: 'US West',
    description: 'Cloud-managed wired and wireless networking (PPK tenant).',
    nav: genericNav,
  },
  sustainability: {
    id: 'sustainability',
    name: 'Sustainability Insight Center',
    icon: Tree,
    category: 'Management & Governance',
    region: 'US West',
    description: 'Energy and carbon reporting across your IT estate.',
    nav: genericNav,
  },
};

export const getService = id => services[id] || services.greenlake;

// Region codes as used in the capability menus, with display labels for
// grouping in the catalog.
export const regionLabels = {
  'US West': 'US West',
  'US-east': 'US East',
  'EU-west': 'EU West',
  'AP NorthEast- Tokyo': 'AP Northeast (Tokyo)',
  'GLP platform': 'Platform',
};
export const regionLabel = region => regionLabels[region] || region;

// Service instances (everything but the platform itself).
export const serviceInstances = Object.values(services).filter(
  service => service.kind !== 'platform',
);

// The page a service opens on: its landing page if it declares one.
export const defaultPageFor = service => service.defaultPage || 'overview';

export const findNavItem = (nav, id) => {
  if (!nav) return undefined;
  for (const group of nav.groups) {
    for (const item of group) {
      if (item.id === id) return { item, parent: undefined };
      const child = item.children?.find(c => c.id === id);
      if (child) return { item: child, parent: item };
    }
  }
  return undefined;
};
