// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
export interface Service {
  name: string;
  href: string;
}

export interface Region {
  name: string;
  services: Service[];
}

const slugify = (value: string) => value.toLowerCase().replace(/ /g, '-');

const region = (name: string, services: string[]): Region => ({
  name,
  services: services.map(service => ({
    name: service,
    href: `/services/${slugify(service)}?region=${slugify(name)}`,
  })),
});

export const regions: Region[] = [
  region('US West', [
    'File Storage',
    'HPE Sustainability Insight Center',
    'Zerto',
  ]),
  region('EU Central', [
    'File Storage',
    'HPE Sustainability Insight Center',
    'Zerto',
  ]),
  region('US East', ['Block Storage', 'Zerto']),
  region('Japan', ['Compute Ops Manager', 'HPE Sustainability Insight Center']),
  region('Galway', ['Object Storage']),
  region('Delhi', ['Zerto']),
];

export const serviceCount = regions.reduce(
  (sum, { services }) => sum + services.length,
  0,
);

// Keep only the first `limit` service instances, preserving region grouping.
export const limitRegions = (limit = Infinity): Region[] => {
  let remaining = limit;
  return regions.reduce<Region[]>((acc, current) => {
    if (remaining <= 0) return acc;
    const services = current.services.slice(0, remaining);
    remaining -= services.length;
    acc.push({ ...current, services });
    return acc;
  }, []);
};

/**
 * Split `items` into `count` ordered columns, balancing by `weight`.
 * Mirrors how a dashboard widget flows grouped content when it is widened.
 */
export const distribute = <T,>(
  items: T[],
  count: number,
  weight: (item: T) => number = () => 1,
): T[][] => {
  if (count <= 1) return [items];
  let remaining = items.reduce((sum, item) => sum + weight(item), 0);
  const columns: T[][] = [[]];
  let current = 0;
  let target = remaining / count;
  items.forEach(item => {
    const w = weight(item);
    const overshoots =
      Math.abs(current + w - target) >= Math.abs(current - target);
    if (current > 0 && overshoots && columns.length < count) {
      columns.push([]);
      current = 0;
      target = remaining / (count - columns.length + 1);
    }
    columns[columns.length - 1].push(item);
    current += w;
    remaining -= w;
  });
  return columns;
};
