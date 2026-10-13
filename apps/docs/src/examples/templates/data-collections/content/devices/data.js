// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import serversData from '../../../../../data/mockData/servers.json';

// The incoming theme update inverts today's layered background approach:
// the page is white and content surfaces are light grey. Until the official
// tokens are released these two surfaces are hard-coded here, in one place,
// so they can be swapped for `background-back`/`background-front` later.
export const pageBackground = '#ffffff';
export const surfaceBackground = '#f7f7f7';

// Devices are sourced from the shared servers dataset. Fields the dataset
// does not carry (site, device type, subscription window, energy) are derived
// deterministically from each record's id so the table is stable across
// renders and no new mock data is added to the system.
const hash = value =>
  Array.from(value).reduce(
    (acc, char) => (acc * 31 + char.charCodeAt(0)) % 2 ** 32,
    7,
  );
const pick = (list, seed, shift = 0) =>
  list[Math.floor(seed / 2 ** shift) % list.length];

// Weighted so a handful of major sites carry most of the fleet.
const sites = [
  ...Array(5).fill('San Jose Data Center'),
  ...Array(4).fill('Austin SOC'),
  ...Array(3).fill('Chicago NOC'),
  ...Array(3).fill('Seattle Data Center'),
  ...Array(2).fill('Denver Colo Facility'),
  'Atlanta SOC',
  'Phoenix Data Center',
  'Portland Edge Site',
  'Dallas Data Center',
  'Miami NOC',
  'Raleigh Data Center',
  'Kansas City Data Center',
  'Houston SOC',
  'Boston Edge Site',
  'Las Vegas Data Center',
  'Minneapolis NOC',
  'Salt Lake City Data Center',
  'Detroit SOC',
  'Nashville Colo Facility',
];

const types = ['Compute', 'Compute', 'Compute', 'Networking', 'Storage'];

const fallbackModels = [
  'ProLiant DL20 Gen11',
  'ProLiant DL360 Gen11',
  'ProLiant DL380 Gen11',
  'ProLiant DL380a Gen11',
  'ProLiant DL360 Gen9',
  'ProLiant DL380 Gen9',
];

export const subscriptionStatuses = [
  'Expired',
  'Expiring soon',
  'Active',
  'Unknown',
];
const subscriptionWeights = [
  'Active',
  'Active',
  'Expiring soon',
  'Expiring soon',
  'Expired',
  'Unknown',
];
const subscriptionFromState = {
  Expired: 'Expired',
  Subscribed: 'Active',
  Required: 'Unknown',
};

const ageFromModel = model => {
  if (/Gen9/.test(model)) return '5+ years';
  if (/Gen10 Plus|Gen11/.test(model)) return '< 3 years';
  return '3-5 years';
};

// Subscription dates are relative to a fixed reference so the example reads
// the same on every visit.
const referenceDate = new Date(2026, 7, 15);
const dayInMs = 24 * 60 * 60 * 1000;
const subscriptionDate = (status, seed) => {
  if (status === 'Unknown') return undefined;
  const offsets = {
    Expired: -(1 + (seed % 90)),
    'Expiring soon': 1 + (seed % 45),
    Active: 180 + (seed % 540),
  };
  return new Date(referenceDate.getTime() + offsets[status] * dayInMs);
};

export const formatDate = date =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export const formatNumber = (value, digits = 1) =>
  value.toLocaleString('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

export const devices = serversData.servers.items.map(server => {
  const seed = hash(`${server.id}:${server.hardware.serialNumber}`);
  const model = server.hardware.model || pick(fallbackModels, seed, 2);
  const subscriptionStatus =
    subscriptionFromState[server.state.subscriptionState] ||
    pick(subscriptionWeights, seed, 4);

  return {
    id: server.id,
    name: server.displayName,
    serialNumber: server.hardware.serialNumber,
    model,
    type: pick(types, seed, 6),
    subscriptionStatus,
    subscriptionDate: subscriptionDate(subscriptionStatus, seed),
    age: ageFromModel(model),
    location: pick(sites, seed, 8),
    // Lifetime energy in kWh, shown in the table.
    totalEnergy: 200 + (Math.floor(seed / 2 ** 10) % 90000) / 10,
    // Energy over the last 7 days in kWh, feeding the summary cards.
    weeklyEnergy: 120 + (Math.floor(seed / 2 ** 12) % 2600) / 10,
  };
});

// Power draw · fleet, last 24 hours (kW per hour starting at 00:00).
const hourlyPower = [
  65, 66, 68, 70, 72, 74, 78, 82, 85, 88, 90, 92, 94, 95, 96, 95, 94, 92, 89,
  86, 82, 78, 74, 70,
];
const formatHour = hour => `${String(hour).padStart(2, '0')}:00`;
const peakHour = hourlyPower.indexOf(Math.max(...hourlyPower));
const minHour = hourlyPower.indexOf(Math.min(...hourlyPower));
const averagePower = Math.round(
  hourlyPower.reduce((sum, kw) => sum + kw, 0) / hourlyPower.length,
);

export const power = {
  unit: 'kW',
  trend: '7% more',
  average: averagePower,
  hours: hourlyPower.map((kw, hour) => ({ hour: formatHour(hour), kw })),
  minimum: { kw: hourlyPower[minHour], hour: formatHour(minHour) },
  peak: { kw: hourlyPower[peakHour], hour: formatHour(peakHour) },
};

// Energy by location · last 7 days, aggregated from the devices.
const energyBySite = devices.reduce((acc, { location, weeklyEnergy }) => {
  acc[location] = (acc[location] || 0) + weeklyEnergy;
  return acc;
}, {});
const weeklyEnergyTotal = Object.values(energyBySite).reduce(
  (sum, kwh) => sum + kwh,
  0,
);
const rankedSites = Object.entries(energyBySite).sort(([, a], [, b]) => b - a);
const topSites = rankedSites.slice(0, 5);
const otherSites = rankedSites.slice(5);
const topSitesTotal = topSites.reduce((sum, [, kwh]) => sum + kwh, 0);

export const energy = {
  unit: 'MWh',
  trend: '5% higher',
  total: weeklyEnergyTotal / 1000,
  siteCount: rankedSites.length,
  sites: topSites.map(([name, kwh], index) => ({
    name,
    kwh,
    color: `dataVis-categorical-${(index + 1) * 10}`,
  })),
  // Remaining sites consolidated into one entry so the top sites can be
  // read against the whole fleet.
  other: {
    name: `Other sites (${otherSites.length})`,
    kwh: weeklyEnergyTotal - topSitesTotal,
  },
};

// Carbon emissions · last 7 days, derived from energy at a fixed grid
// intensity (kgCO₂e per kWh) and compared with the prior week and a target.
const carbonIntensity = 0.4;
const weeklyCarbonTotal = (weeklyEnergyTotal * carbonIntensity) / 1000;
const priorWeekFactor = 0.91;
const weeklyCarbonTarget = weeklyCarbonTotal * 0.9;
const dailyShare = [0.13, 0.15, 0.16, 0.14, 0.15, 0.14, 0.13];
const priorDailyShare = [0.14, 0.14, 0.15, 0.15, 0.14, 0.14, 0.14];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const dailyCarbonTarget = weeklyCarbonTarget / days.length;

export const carbon = {
  unit: 'tCO₂e',
  intensity: carbonIntensity,
  total: weeklyCarbonTotal,
  target: weeklyCarbonTarget,
  dailyTarget: dailyCarbonTarget,
  trend: `${Math.round((1 / priorWeekFactor - 1) * 100)}% higher`,
  aboveTarget: Math.round((weeklyCarbonTotal / weeklyCarbonTarget - 1) * 100),
  days: days.map((day, index) => ({
    day,
    current: weeklyCarbonTotal * dailyShare[index],
    prior: weeklyCarbonTotal * priorWeekFactor * priorDailyShare[index],
    target: dailyCarbonTarget,
  })),
};
