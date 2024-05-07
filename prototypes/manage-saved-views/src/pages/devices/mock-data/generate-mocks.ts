import { faker } from '@faker-js/faker';
import * as fs from 'fs';

type SubscriptionTier = 'Basic' | 'Foundation' | 'Advanced' | 'Security' | 'Mission Critical' | 'Value';
type DeviceType = 'Gateway' | 'Switch' | 'Server' | 'Access Point' | 'Router' | 'Storage';
type ServiceRegion = 'US-East' | 'US-West' | 'EU' | 'APAC' | 'LATAM';
type Account = 'Acme, Inc.' | 'Globex' | 'Initech' | 'Umbrella Corp' | 'Stark Industries' | 'Wayne Enterprises' | 'Tyrell Corp' | 'Cyberdyne Systems' | 'Buy-N-Large' | 'Virtucon';
type LocationName = 'HQ' | 'Branch' | 'Datacenter' | 'Colo' | 'Corporate' | '';
type Tag = {
  name: 'env', value: 'production' | 'staging' | 'QA' | 'dev'
} |
{ name: 'app', value: 'inventory' | 'analytics' };

interface Device {
  serial_number: string;
  part_number: string;
  device_type: DeviceType;
  mac: string;
  ip_address: string;
  name: string;
  location_name: LocationName;
  service_region: ServiceRegion;
  subscription: {
    tier: SubscriptionTier;
    expiration_date: string;
  };
  account: Account;
  tags: Tag[];
  geo: {
    location: {
      type: 'Point';
      coordinates: [number, number];
    },
    name: string;
    city: string;
    country: string;
    countryCode: string;
    region: string;
    postalCode: string;
  };
}

function generateDevice(): Device {
  return {
    serial_number: faker.string.alphanumeric(16).toUpperCase(),
    part_number: faker.string.alphanumeric(6).toUpperCase(),
    device_type: faker.helpers.arrayElement(['Gateway', 'Switch', 'Server', 'Access Point']),
    mac: faker.internet.mac(),
    ip_address: faker.internet.ipv4(),
    name: "",
    location_name: faker.helpers.arrayElement(['HQ', 'Corporate', 'Branch', 'Datacenter', 'Colo', '']),
    service_region: faker.helpers.arrayElement(['US-East', 'US-West', 'EU', 'APAC', 'LATAM']),
    geo: {
      location: {
        type: 'Point',
        coordinates: [faker.location.longitude(), faker.location.latitude()]
      },
      name: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
      countryCode: faker.location.countryCode(),
      region: faker.location.state(),
      postalCode: faker.location.zipCode()
    },
    subscription: {
      tier: faker.helpers.arrayElement(['Basic', 'Foundation', 'Advanced', 'Security', 'Mission Critical', 'Value']),
      expiration_date: faker.date.future().toISOString(),
    },
    account: faker.helpers.arrayElement(['Acme, Inc.', 'Globex', 'Initech', 'Umbrella Corp', 'Stark Industries', 'Wayne Enterprises', 'Tyrell Corp', 'Cyberdyne Systems', 'Buy-N-Large', 'Virtucon']),
    tags: faker.helpers.arrayElements([
      { name: 'env', value: 'production' },
      { name: 'env', value: 'dev' },
      { name: 'env', value: 'QA' },
      { name: 'env', value: 'staging' },
      { name: 'app', value: 'inventory' },
      { name: 'app', value: 'analytics' }
    ], { min: 0, max: 1 })
  }
}

function generateDevices(count: number): Device[] {
  return Array.from({ length: count }, generateDevice);
}

// const devices = generateDevices(127);
// fs.writeFileSync('devices.json', JSON.stringify(devices, null, 2));

export { generateDevice, generateDevices }