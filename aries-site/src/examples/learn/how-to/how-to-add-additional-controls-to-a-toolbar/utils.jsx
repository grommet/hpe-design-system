import { Text } from 'grommet';

const buildQuery = view => {
  const query = {};
  const properties = view?.properties || [];
  Object.keys(properties).forEach(property => {
    switch (property) {
      case 'mass_lbs':
        query[property] = {
          $gt: properties[property].min,
          $lt: properties[property].max,
        };
        break;
      default:
        query[property] = properties[property];
    }
  });
  if (view?.search) query.$text = { $search: view.search };
  return query;
};

export const fetchPayloads = async (page, view) => {
  const query = buildQuery(view);
  const payloads = await fetch('https://api.spacexdata.com/v4/payloads/query', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      options: {
        // only fetch these attributes
        select: [
          'name',
          'type',
          'mass_lbs',
          'orbit',
          'customers',
          'nationalities',
          'manufacturers',
          'inclination_deg',
        ],
        limit: view?.step || 10,
        page: view?.page ?? page ?? 1,
      },
      query,
    }),
  }).then(res => res.json());

  return payloads;
};

export const columns = [
  { property: 'name', header: 'Name', size: 'small' },
  { property: 'type', header: 'Type' },
  {
    property: 'mass_lbs',
    header: 'Mass',
    units: 'lbs',
    align: 'end',
    render: datum => (
      <Text a11yTitle={!datum.mass_lbs ? 'No value' : undefined}>
        {datum.mass_lbs || '--'}
      </Text>
    ),
  },
  {
    property: 'orbit',
    header: 'Orbit',
  },
  {
    property: 'customers',
    header: 'Customers',
    render: datum =>
      datum.customers?.length ? datum.customers.join(', ') : '--',
    size: 'xsmall',
  },
  {
    property: 'nationalities',
    header: 'Nationalities',
    render: datum =>
      datum.nationalities?.length ? datum.nationalities.join(', ') : '--',
  },
  {
    property: 'manufacturers',
    header: 'Manufacturers',
    render: datum =>
      datum.manufacturers?.length ? datum.manufacturers.join(', ') : '--',
  },
  {
    property: 'inclination_deg',
    header: 'Inclination',
    units: 'deg',
    align: 'end',
  },
];

export const options = columns.map(column => ({
  property: column.property,
  label: column.header,
}));
