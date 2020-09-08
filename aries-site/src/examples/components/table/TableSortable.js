import React from 'react';
import { Box, DataTable, Meter, Text } from 'grommet';

const data = [
  {
    string: 'durian',
    numeric: 42,
    date: '01/25/1915',
    percent: 5,
    status: 'ok',
  },
  {
    string: 'cherimoya',
    numeric: 3.14159,
    date: '12/07/1941',
    percent: 99,
    status: 'ok',
  },
  {
    string: 'mangosteen',
    numeric: 3,
    date: '03/21/1965',
    percent: 33,
    status: 'warning',
  },
  {
    string: 'jackfruit',
    numeric: 2.7182,
    date: '12/15/1791',
    percent: 25,
    status: 'ok',
  },
  {
    string: 'kiwi',
    numeric: 1.618,
    date: '11/03/2020',
    percent: 67,
    status: 'critical',
  },
  {
    string: 'lemon',
    numeric: 182282,
    date: '07/20/1969',
    percent: 75,
    status: 'warning',
  },
  {
    string: 'rambutan',
    numeric: 73,
    date: '08/06/1991',
    percent: 50,
    status: 'ok',
  },
];

const columns = [
  { property: 'string', header: 'Fruits' },
  { property: 'numeric', header: 'Favorite Numbers', align: 'end' },
  {
    property: 'date',
    header: 'Significant Dates',
    render: datum =>
      datum.date && new Date(datum.date).toLocaleDateString('en-US'),
    align: 'end',
  },
  {
    property: 'percent',
    header: 'Percent Complete',
    render: datum => (
      <Box pad={{ vertical: 'xsmall' }}>
        <Meter
          values={[{ value: datum.percent, color: 'graph-2' }]}
          thickness="small"
          size="small"
        />
      </Box>
    ),
  },
  {
    property: 'status.value',
    header: 'Status',
    render: datum => (
      <Box direction="row" align="center" gap="xsmall">
        <Box
          height="12px"
          width="12px"
          background={datum.status.color}
          round="100%"
        />
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
          value: 0,
          color: 'status-ok',
        };
        break;
      case 'warning':
        adjustedDatum.status = {
          label: datum.status,
          value: 1,
          color: 'status-warning',
        };
        break;
      case 'critical':
        adjustedDatum.status = {
          label: datum.status,
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

export const TableSortable = () => (
  <DataTable
    data={formatData(data)}
    primaryKey="id"
    columns={columns}
    sort={{ property: 'numeric', direction: 'desc' }}
    sortable
  />
);
