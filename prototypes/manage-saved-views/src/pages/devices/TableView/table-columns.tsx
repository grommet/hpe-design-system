import { Box, Tag } from 'grommet';

const tableColumns = [
  {
    property: 'serial_number',
    header: 'Serial number',
    primary: true,
    pin: true,
  },
  {
    property: 'device_type',
    header: 'Device type',
  },
  {
    property: 'location_name',
    header: 'Location name',
    render: (datum: { location_name: string }) => datum.location_name || '--',
  },
  {
    property: 'service_region',
    header: 'Service region',
  },
  {
    property: 'tier',
    header: 'Subscription tier',
  },
  {
    property: 'account',
    header: 'Account',
  },
  {
    property: 'expiration_date',
    header: 'Expiration date',
    align: 'end',
    render: (datum: { expiration_date: string }) =>
      new Intl.DateTimeFormat(undefined, { month: 'short', day: '2-digit', year: 'numeric' }).
        format(new Date(datum.expiration_date)),
  },
  {
    property: 'tags',
    header: 'Tags',
    render: (datum: { tags: { name: string, value: string }[] }) =>
      <Box direction='row' gap='xsmall' width={{ min: 'small', max: 'medium' }}>
        {
          datum.tags.map(tag =>
            <Tag
              key={`${tag.name}${tag.value}`}
              name={tag.name}
              value={tag.value}
              size='xsmall'
              alignSelf='start'
              flex={false}
            />
          )}
      </Box>,
    sortable: false,
    size: 'xsmall'
  }
];

const columnOptions = tableColumns.map((column, index) => ({
  label: column.header,
  property: column.property,
  pinned: index === 0,
}));

export { tableColumns, columnOptions };