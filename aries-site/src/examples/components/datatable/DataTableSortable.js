import React from 'react';
import {
  Box,
  DataTable,
  Heading,
  Meter,
  Text,
  ResponsiveContext,
} from 'grommet';
import {
  StatusGoodSmall,
  StatusWarningSmall,
  StatusCriticalSmall,
} from 'grommet-icons';

const data = [
  {
    id: 1,
    string: 'durian',
    numeric: 42,
    date: '01/25/1915',
    percent: 5,
    status: 'ok',
  },
  {
    id: 2,
    string: 'cherimoya',
    numeric: 3.14159,
    date: '12/07/1941',
    percent: 99,
    status: 'ok',
  },
  {
    id: 3,
    string: 'mangosteen',
    numeric: 3,
    date: '03/21/1965',
    percent: 33,
    status: 'warning',
  },
  {
    id: 4,
    string: 'jackfruit',
    numeric: 2.7182,
    date: '12/15/1791',
    percent: 25,
    status: 'ok',
  },
  {
    id: 5,
    string: 'kiwi',
    numeric: 1.618,
    date: '11/03/2020',
    percent: 67,
    status: 'critical',
  },
  {
    id: 6,
    string: 'lemon',
    numeric: 182282,
    date: '07/20/1969',
    percent: 75,
    status: 'warning',
  },
  {
    id: 7,
    string: 'rambutan',
    numeric: 73,
    date: '08/06/1991',
    percent: 50,
    status: 'ok',
  },
];

const columns = [
  { property: 'string', header: 'Fruits' },
  {
    property: 'numeric',
    header: 'Favorite Numbers',
    align: 'end',
  },
  {
    property: 'date',
    header: 'Significant Dates',
    render: datum =>
      datum.date && new Date(datum.date).toLocaleDateString('en-US'),
    align: 'end',
  },
  {
    property: 'percent',
    header: '% Complete',
    render: datum => (
      <Box gap="xsmall" direction="row">
        <Box pad={{ vertical: 'xsmall' }}>
          <Meter
            alignSelf="center"
            values={[{ value: datum.percent, color: 'graph-2' }]}
            thickness="small"
            size="small"
          />
        </Box>
        <Text>{datum.percent.toFixed(0)}%</Text>
      </Box>
    ),
  },
  {
    property: 'status.value',
    header: 'Status',
    render: datum => (
      <Box direction="row" align="center" gap="xsmall">
        <datum.status.icon color={datum.status.color} size="small" />
        <Text>{datum.status.label}</Text>
      </Box>
    ),
  },
];

const formatData = dataSet =>
  dataSet.map(datum => {
    const adjustedDatum = { ...datum };
    adjustedDatum.date = new Date(datum.date);
    switch (datum.status) {
      case 'ok':
        adjustedDatum.status = {
          label: datum.status,
          icon: StatusGoodSmall,
          value: 0,
          color: 'status-ok',
        };
        break;
      case 'warning':
        adjustedDatum.status = {
          label: datum.status,
          icon: StatusWarningSmall,
          value: 1,
          color: 'status-warning',
        };
        break;
      case 'critical':
        adjustedDatum.status = {
          label: datum.status,
          icon: StatusCriticalSmall,
          value: 2,
          color: 'status-critical',
        };
        break;
      default:
        adjustedDatum.status = {
          label: datum.status,
        };
    }
    return adjustedDatum;
  });

export function DataTableSortable() {
  const size = React.useContext(ResponsiveContext);

  return (
    <>
      <Heading
        id="sortable-heading"
        level={3}
        margin={{ bottom: 'small', top: 'none' }}
      >
        Sortable Items
      </Heading>
      <Box align="start" margin={{ right: 'auto' }} overflow="auto">
        <DataTable
          aria-describedby="sortable-heading"
          data={formatData(data)}
          columns={[
            {
              property: 'id',
              header: 'Id',
              primary: true,
              pin: ['xsmall', 'small'].includes(size),
            },
            ...columns,
          ]}
          pin={['xsmall', 'small'].includes(size)}
          sort={{ property: 'numeric', direction: 'desc' }}
          sortable
        />
      </Box>
    </>
  );
}
