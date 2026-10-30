// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  AIGen,
  Alert,
  Connect,
  Connectivity,
  Group,
  Network,
  Secure,
  StatusGood,
  Switch,
  Wifi,
} from '@hpe-design/icons-grommet';

// Mist AI › Marvis™ — data reinterpreted from the "Mist AI" Figma frame.

// Topology nodes radiating from the Marvis action count in the centre.
// `status` drives the value icon: 'warning' shows an alert, 'ok' a check.
export const marvisActions = 17;

export const topologyNodes = [
  {
    id: 'switch',
    label: 'Switch',
    value: '8',
    status: 'warning',
    icon: Switch,
  },
  { id: 'clients', label: 'Clients', value: '1,309', icon: Group },
  { id: 'ap', label: 'Access Point', value: '4', icon: Wifi },
  {
    id: 'security',
    label: 'Security',
    value: 'Enabled',
    status: 'ok',
    icon: Secure,
  },
  {
    id: 'auth',
    label: 'Authentication',
    value: 'Active',
    status: 'ok',
    icon: Connect,
  },
  {
    id: 'dhcp',
    label: 'DHCP, DNS',
    value: 'Configured',
    status: 'ok',
    icon: Network,
  },
  {
    id: 'rf',
    label: 'Radio Frequency',
    value: 'Good',
    status: 'ok',
    icon: Connectivity,
  },
];

export const cableBanner = {
  title: 'Test and replace cable.',
  message:
    'Based on errors seen, the below ports have a bad cable connected to them. Please test and replace the cable if needed.',
};

export const affectedFilters = [
  { id: 'port', label: 'Port', count: 1 },
  { id: 'ap', label: 'Access Point', count: 1 },
  { id: 'clients', label: 'Clients', count: 78 },
];

export const affectedPorts = {
  port: [
    {
      id: 'BC-09',
      site: 'Live Demo',
      switch: 'Abhi-Switch-Desk',
      port: 'ge-0/0/10',
      date: 'March 19, 2026 – 10:36 pm',
    },
  ],
  ap: [
    {
      id: 'AP-14',
      site: 'Live Demo',
      switch: 'LD Mesh-Relay',
      port: 'ge-0/0/4',
      date: 'March 19, 2026 – 09:12 pm',
    },
  ],
  clients: Array.from({ length: 6 }, (_, index) => ({
    id: `CL-${String(index + 1).padStart(2, '0')}`,
    site: 'Live Demo',
    switch: index % 2 ? 'Abhi-Switch-Desk' : 'NearPrinter',
    port: `ge-0/0/${index + 11}`,
    date: `March 19, 2026 – ${8 + index}:${index % 2 ? '45' : '10'} pm`,
  })),
};

export const latestUpdates = [
  {
    group: 'Today',
    items: [
      {
        id: 'u1',
        kind: 'ai',
        title: 'AI validated',
        subtitle: 'Missing VLAN (ID: MV-24)',
        details: [
          'Site: Live Demo',
          'Switch: NA',
          'Port: NA',
          'AP: LD Mesh-Relay',
          'VLAN: 1, 222, 223',
        ],
        when: 'March 23, 2026 – 10:36 pm',
      },
    ],
  },
  {
    group: 'Yesterday',
    items: [
      {
        id: 'u2',
        kind: 'issue',
        title: 'Reoccurring issue',
        subtitle: 'Layer 1 Issues (ID: EE-10)',
        details: [
          'Site: Live Demo',
          'Switch: NearPrinter',
          'Port: 525',
          'AP: LD_HR',
        ],
        when: 'March 23, 2026 – 10:36 pm',
      },
    ],
  },
  {
    group: 'Last week',
    items: [
      {
        id: 'u3',
        kind: 'resolved',
        title: 'Resolved action',
        subtitle: 'AP Health (ID: HC-11)',
        details: ['Site: Live Demo', 'AP: 5c:5b:35:2f:56:f8'],
        when: 'March 23, 2026 – 10:36 pm',
      },
      {
        id: 'u4',
        kind: 'ai',
        title: 'AI validated',
        subtitle: 'Missing VLAN (ID: MV-09)',
        details: [
          'Site: Live Demo',
          'Switch: switch9a9bea',
          'AP: MeshRelay-Desk-A',
          'VLAN: 102',
        ],
        when: 'March 23, 2026 – 10:36 pm',
      },
    ],
  },
];

export const updateKinds = {
  ai: { icon: AIGen, color: 'icon-info', background: 'background-info' },
  issue: {
    icon: Alert,
    color: 'icon-warning',
    background: 'background-warning',
  },
  resolved: { icon: StatusGood, color: 'icon-ok', background: 'background-ok' },
};
