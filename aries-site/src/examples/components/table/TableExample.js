import React from 'react';
import { Box, DataTable, Meter, Text } from 'grommet';

const data = [
  {
    id: 1,
    poolName: 'Asup-array01-lvs (default)',
    groupName: 'Asup',
    arrays: 'asup-array01-lvs',
    size: 16099511627776,
    pinnable: 2099511627776,
    pinned: 699511627776,
    savings: [
      { unit: 'TiB', value: 12.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 2,
    poolName: 'Dev-K8-Sym-R5-3 (default)',
    groupName: 'Dev',
    arrays: 'harm-stage-array01',
    size: 224520271234567,
    pinnable: 5099511627776,
    pinned: 2699511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 3,
    poolName: 'Dev36-erray01 ( default)',
    groupName: 'Dev',
    arrays: 'harm-stage-array02',
    size: 190655321234567,
    pinnable: 4099511627776,
    pinned: 2699511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 3955.2 },
    ],
  },
  {
    id: 4,
    poolName: 'asup-array1 (default)',
    groupName: 'Asup',
    arrays: 'harm-stage-array04',
    size: 130655321234567,
    pinnable: 3099511627776,
    pinned: 699511627776,
    savings: [
      { unit: 'TiB', value: 110.6 },
      { unit: 'xGHz', value: 3.9 },
    ],
  },
  {
    id: 5,
    poolName: 'Dev-K8-Sym-R5-3 (default)',
    groupName: 'Dev',
    arrays: 'Harm-cs-stage-R4-5',
    size: 68994941234567,
    pinnable: 3199511627776,
    pinned: 2699511627776,
    savings: [
      { unit: 'TiB', value: 128.5 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 6,
    poolName: 'asup-array2 (default)',
    groupName: 'Asup',
    arrays: 'ds-array02',
    size: 90655321234567,
    pinnable: 11199511627776,
    pinned: 0,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 3955.2 },
    ],
  },
  {
    id: 7,
    poolName: 'Dev36-varray02 (default)',
    groupName: 'Dev',
    arrays: 'ds-array01',
    size: 101655321234567,
    pinnable: 12399511627776,
    pinned: 0,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 8,
    poolName: 'DevHarmCs2R39',
    groupName: 'Dev',
    arrays: 'harm-stage-array03',
    size: 7900321234567,
    pinnable: 129511627776,
    pinned: 7804321432,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 9,
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 70655321234567,
    pinnable: 1529511627776,
    pinned: 0,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 10,
    poolName: 'asup-array2 (default)',
    groupName: 'Asup',
    arrays: 'ds-array02',
    size: 5655321234567,
    // pinnable: { value: 10.1, unit: 'TiB' },
    // pinned: { value: 0.0, unit: 'B' },
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 3955.2 },
    ],
  },
  {
    id: 11,
    poolName: 'Dev36-varray02 (default)',
    groupName: 'Dev',
    arrays: 'ds-array01',
    size: 655321234567,
    // pinnable: { value: 1.3, unit: 'TiB' },
    // pinned: { value: 0.0, unit: 'B' },
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 12,
    poolName: 'DevHarmCs2R39',
    groupName: 'Dev',
    arrays: 'harm-stage-array03',
    size: 52655321234567,
    // pinnable: { value: 2.9, unit: 'TiB' },
    // pinned: { value: 0.0, unit: 'B' },
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 13,
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 30655321234567,
    // pinnable: { value: 3.0, unit: 'TiB' },
    // pinned: { value: 0.0, unit: 'B' },
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
];

const columns = [
  {
    property: 'poolName',
    header: 'Pool Name',
    render: datum => <Text truncate>{datum.poolName}</Text>,
  },
  {
    property: 'groupName',
    header: 'Group Name',
  },
  {
    property: 'arrays',
    header: 'Arrays',
    render: datum => <Text truncate>{datum.arrays}</Text>,
    sortable: false,
  },
  {
    property: 'size',
    header: 'Size (TiB)',
    render: datum =>
      // bytes to tebibytes
      (datum.size / 2 ** 40).toFixed([1]),
    align: 'end',
  },
  {
    property: 'pinnable',
    header: 'Pinnable (TiB)',
    render: datum =>
      // bytes to tebibytes
      (datum.pinnable / 2 ** 40).toFixed([1]),
    align: 'end',
    sortable: false,
  },
  {
    property: 'pinned',
    header: 'Pinned %',
    render: datum => (
      <Box pad={{ vertical: 'xsmall' }}>
        <Meter
          values={[{ value: datum.pinned / datum.pinnable, color: 'graph-2' }]}
          max={1}
          thickness="small"
          size="small"
        />
      </Box>
    ),
  },
  {
    property: 'savings',
    header: 'Savings (TiB | xGHz)',
    align: 'end',
    render: datum => (
      <Text truncate>
        {datum.savings[0] && `${datum.savings[0].value}`}
        {datum.savings[0] && datum.savings[1] && ' | '}
        {datum.savings[1] && `${datum.savings[1].value}`}
      </Text>
    ),
  },
];

const handleClickRow = obj => {
  // eslint-disable-next-line no-alert
  alert(`
  Record was clicked:
  { 
      id: ${obj.id},
      poolName: ${obj.poolName}
  }
  
  You can use onClickRow() to navigate to a record's detail
  page, open a panel or modal to edit the record, or perform 
  other actions as you see fit.
  `);
};

export const TableExample = () => (
  <Box height="medium" overflow="auto">
    <DataTable
      data={data}
      primaryKey="id"
      columns={columns}
      fill
      onClickRow={({ datum }) => handleClickRow(datum)}
      pin
      sortable
    />
  </Box>
);
