import React from 'react';
import {
  Box,
  DataTable,
  Heading,
  Meter,
  Text,
  ResponsiveContext,
} from 'grommet';

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
      <Box gap="xxsmall" direction="row" pad={{ vertical: 'xsmall' }}>
        <Meter
          alignSelf="center"
          values={[{ value: datum.percent, color: 'graph-2' }]}
          thickness="small"
          size="small"
        />
        <Text>{(datum.percent).toFixed(0)}%</Text>
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

export const TableSortable = () => {
  const size = React.useContext(ResponsiveContext);

  return (
    <>
      <Heading level={3} margin={{ bottom: 'small', top: 'none' }}>
        Sortable Items
      </Heading>
      <Box align="start" margin={{ right: 'auto' }} overflow="auto">
        <DataTable
          data={formatData(data)}
          columns={[
            {
              property: 'id',
              header: 'Id',
              primary: true,
              pin: size === 'small',
            },
            ...columns,
          ]}
          pin={size === 'small'}
          sort={{ property: 'numeric', direction: 'desc' }}
          sortable
        />
      </Box>
    </>
  );
};
