import { MapLocation, Table } from 'grommet-icons';

import rawData from './mock-data/devices_03.json';

const defaultData = rawData.map((datum) => {
  const tier = datum.subscription.tier;
  const expirationDate = new Date(datum.subscription.expiration_date).getTime();
  return { ...datum, expiration_date: expirationDate, tier: tier };
});

const defaultViews = [
  {
    name: 'All devices',
    step: defaultData.length,
    page: 1,
    properties: {}
  },
  {
    name: 'Expiring soon',
    properties: {
      expiration_date: {
        min: new Date().getTime(),
        max: new Date().getTime() + 1000 * 60 * 60 * 24 * 30
      }
    },
    page: 1,
    step: 10
  }
];

const visualizationOptions = [
  {
    icon: <Table a11yTitle="Map view" />,
    value: 'table',
  },
  {
    icon: <MapLocation a11yTitle="Map view" />,
    value: 'map',
  },
];

const defaultVisualization = 'table';

const defaultProperties = {
  serial_number: { label: 'Serial number', filter: false },
  account: {
    label: 'Account',
    options: defaultData.map((datum) => datum.account)
      .reduce<string[]>((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], [])
      .sort()
  },
  location_name: {
    label: 'Location',
    options: defaultData.map((datum) => datum.location_name)
      .reduce<string[]>((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], [])
      .sort().map((location) => location || 'No location assigned')
  },
  device_type: {
    label: 'Device type', options: defaultData.map((datum) => datum.device_type)
      .reduce<string[]>((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], [])
      .sort()
  },
  tier: {
    label: 'Subscription tier', options: defaultData.map((datum) => datum.tier)
      .reduce<string[]>((acc, cur) => acc.includes(cur) ? acc : [...acc, cur], [])
      .sort()
  },
  expiration_date: { label: 'Expiration date' },
  tags: { label: 'Tags' },
}

const defaultView = {
  search: '',
  page: 1,
  step: 10,
  sort: { property: 'serial_number', direction: 'asc' },
};

export {
  defaultData,
  defaultProperties,
  defaultView,
  defaultViews,
  defaultVisualization,
  visualizationOptions,
};