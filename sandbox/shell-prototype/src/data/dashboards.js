// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import {
  Analytics,
  Bulb,
  Compliance,
  Cpu,
  Device,
  Info,
  Location,
  Secure,
  Tree,
} from '@hpe-design/icons-grommet';

// ---------------------------------------------------------------------------
// HPE Compute Ops Management
// ---------------------------------------------------------------------------
export const serversHealth = {
  icon: Analytics,
  title: 'Servers health status',
  total: 23,
  unit: 'Servers',
  values: [
    {
      label: 'Critical',
      value: 3,
      color: 'status-critical',
      status: 'critical',
    },
    { label: 'Warning', value: 3, color: 'status-warning', status: 'warning' },
    { label: 'Ok', value: 15, color: 'status-ok', status: 'ok' },
    { label: 'Unknown', value: 2, color: 'status-unknown', status: 'unknown' },
    { label: 'Disabled', value: 0, color: 'text-weak', status: 'disabled' },
  ],
};

export const iloSecurity = {
  icon: Secure,
  title: 'iLO security status',
  total: 23,
  unit: 'Servers',
  values: [
    {
      label: 'Critical',
      value: 1,
      color: 'status-critical',
      status: 'critical',
    },
    { label: 'Warning', value: 2, color: 'status-warning', status: 'warning' },
    { label: 'Ok', value: 18, color: 'status-ok', status: 'ok' },
    { label: 'Unknown', value: 2, color: 'status-unknown', status: 'unknown' },
    { label: 'Unsupported', value: 0, color: 'text-weak', status: 'disabled' },
  ],
};

export const groupsCompliance = {
  icon: Compliance,
  title: 'Groups compliance',
  nonCompliant: 0,
  percent: 100,
  values: [
    {
      label: 'Not compliant',
      value: 0,
      color: 'status-critical',
      status: 'critical',
    },
    { label: 'Compliant', value: 2, color: 'status-ok', status: 'ok' },
    { label: 'Unknown', value: 0, color: 'status-unknown', status: 'unknown' },
    {
      label: 'Not applicable',
      value: 0,
      color: 'text-weak',
      status: 'disabled',
    },
  ],
};

export const needsAttention = {
  icon: Info,
  title: 'Needs attention',
  items: [
    { label: 'Servers not connected', value: 1, icon: Cpu },
    { label: 'Servers inactive', value: 0, icon: Device },
    { label: 'Utilization alerts', value: 2, icon: Analytics },
  ],
};

export const sustainabilityInsights = {
  icon: Tree,
  title: 'Sustainability insights',
  emissions: '8.97',
  emissionsUnit: 'MtCO2e',
  emissionsLabel: 'avg last 7 days',
  trend: '+17%',
  trendLabel: 'week to week',
  tag: 'Estimated carbon emissions',
};

export const recommendedActions = {
  icon: Bulb,
  title: 'Recommended actions',
  items: [
    {
      id: 'ra1',
      text: '2023.09.00.05 + SPP 2023.09.00.00 (09 May 2024) is available for 5 Gen10/+ servers.',
      tag: 'Firmware Patch',
    },
    {
      id: 'ra2',
      text: 'SPP 2025.03.00.00 (30 Oct 2025) is available for 12 Gen11 servers.',
    },
    {
      id: 'ra3',
      text: 'HPE OneView 9.30.00 is available for 11 appliances.',
    },
  ],
};

export const serverMap = {
  icon: Location,
  title: 'Compute server map',
  banner:
    '2 servers do not have an assigned location or have a location that cannot be correctly mapped. Additionally, location is required for auto HPE support case creation.',
  places: [
    {
      name: 'Houston',
      location: [29.76, -95.37],
      count: 13,
      status: 'warning',
    },
    { name: 'Chicago', location: [41.88, -87.63], count: 1, status: 'warning' },
    { name: 'Toronto', location: [43.65, -79.38], count: 8, status: 'warning' },
  ],
};
