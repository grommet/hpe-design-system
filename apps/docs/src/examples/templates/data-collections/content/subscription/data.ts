// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import serversData from '../../../../../data/mockData/servers.json';

// The incoming theme update inverts today's layered background approach:
// the page is white and content surfaces are light grey, with a white
// surface again for anything raised on top of a grey one (a chat bubble or
// a card inside the assistant panel). Until the official tokens are released
// these surfaces are hard-coded here, in one place, so they can be swapped
// for the released tokens later.
export const pageBackground = '#ffffff';
export const surfaceBackground = '#f7f7f7';
export const raisedBackground = '#ffffff';

export const subscription = {
  key: 'K386551201',
  tier: 'Enhanced-ProLiant',
  product: 'CENTRAL_COMPUTE',
  started: new Date(2021, 11, 13),
  renewal: new Date(2026, 11, 13),
  // Days remaining is fixed, rather than computed from today, so the
  // example reads the same on every visit.
  daysRemaining: 59,
  deviceCount: 47,
};

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

// Devices are sourced from the shared servers dataset. Fields it does not
// carry (device type, site, support status) are derived deterministically
// from each record's id so the list is stable across renders and no new
// mock data is added to the system.
const hash = (value: string) =>
  Array.from(value).reduce(
    (acc, char) => (acc * 31 + char.charCodeAt(0)) % 2 ** 32,
    7,
  );
const pick = <T,>(list: readonly T[], seed: number, shift = 0): T =>
  list[Math.floor(seed / 2 ** shift) % list.length];

// A 12 character alphanumeric serial in the style of the design.
const serialFromSeed = (seed: number) =>
  `${seed.toString(36)}${hash(String(seed)).toString(36)}`
    .toUpperCase()
    .slice(0, 12);

const types = [
  'Rack Server',
  'Rack Server',
  'Storage Array',
  'Web Server',
  'Hyper-V VM',
  'RKE2 Control Plane',
  'Virtual Machine',
  'Hypervisor Host',
];

// Weighted so one site carries most of the subscription.
const sites: string[] = [
  ...Array(6).fill('Seattle Data Center'),
  'Portland Edge Site',
  'San Jose Data Center',
];

const models = [
  'ProLiant DL20 Gen11',
  'ProLiant DL360 Gen9',
  'ProLiant DL360 Gen11',
  'ProLiant DL380 Gen9',
  'ProLiant DL380 Gen11',
  'ProLiant DL380a Gen11',
];

export const supportStatuses = ['Expired support', 'Supported'] as const;

export type SupportStatus = (typeof supportStatuses)[number];

export type SubscribedDevice = {
  id: string;
  serialNumber: string;
  model: string;
  type: string;
  location: string;
  support: SupportStatus;
};

export const devices: SubscribedDevice[] = serversData.servers.items
  .slice(0, subscription.deviceCount)
  .map(server => {
    const seed = hash(`${server.id}:${server.hardware.serialNumber}`);
    return {
      id: server.id,
      serialNumber: serialFromSeed(seed),
      model: pick(models, seed, 2),
      type: pick(types, seed, 6),
      location: pick(sites, seed, 10),
      // Roughly one device in four has let its support lapse.
      support: seed % 4 === 0 ? supportStatuses[0] : supportStatuses[1],
    };
  });

// The assistant's answer about refreshing the subscribed fleet.
export const refreshSavings = {
  title: 'What refreshing to Gen12 saves',
  scope: `${subscription.deviceCount} devices over 3 years`,
  emissions: {
    label: 'Reduced emissions',
    value: '58',
    unit: 't CO₂',
    change: '34%',
    from: '171 t',
    to: '113 t',
  },
  cost: {
    label: 'Reduced cost',
    value: '$27K',
    unit: 'USD',
    change: '34% saved',
    from: '$145K',
    to: '$118K',
    hardware: '$42K',
    breakEven: 'month 22',
  },
};

export const followUpPrompts = [
  'Compare Gen12 vs Gen13 savings',
  'Break down costs by device group',
];

export const composerActions = [
  { label: 'Summarize this subscription' },
  { label: 'Draft a renewal request' },
  { label: 'Export device list' },
];
