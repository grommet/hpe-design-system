import React from 'react';
import { Box, DataTable, Text } from 'grommet';

const data = [
  {
    id: 1,
    poolName: 'Asup-array01-lvs (default)',
    groupName: 'Asup',
    arrays: 'asup-array01-lvs',
    size: { value: 204.2, unit: 'TiB' },
    pinnable: { value: 0.0, unit: 'B' },
    pinned: { value: 0.0, unit: 'B' },
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
    size: { value: 204.2, unit: 'TiB' },
    pinnable: { value: 0.0, unit: 'B' },
    pinned: { value: 0.0, unit: 'B' },
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
    size: { value: 173.4, unit: 'TiB' },
    pinnable: { value: 0.0, unit: 'B' },
    pinned: { value: 0.0, unit: 'B' },
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
    size: { value: 173.4, unit: 'TiB' },
    pinnable: { value: 0.0, unit: 'B' },
    pinned: { value: 0.0, unit: 'B' },
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
    size: { value: 153.7, unit: 'TiB' },
    pinnable: { value: 2.9, unit: 'TiB' },
    pinned: { value: 0.0, unit: 'B' },
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
    size: { value: 173.4, unit: 'TiB' },
    pinnable: { value: 10.1, unit: 'TiB' },
    pinned: { value: 0.0, unit: 'B' },
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
    size: { value: 92.0, unit: 'TiB' },
    pinnable: { value: 2.9, unit: 'TiB' },
    pinned: { value: 0.0, unit: 'B' },
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
    size: { value: 7.2, unit: 'TiB' },
    pinnable: { value: 2.9, unit: 'TiB' },
    pinned: { value: 0.0, unit: 'B' },
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
    size: { value: 173.4, unit: 'TiB' },
    pinnable: { value: 0.0, unit: 'B' },
    pinned: { value: 0.0, unit: 'B' },
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
    size: { value: 173.4, unit: 'TiB' },
    pinnable: { value: 10.1, unit: 'TiB' },
    pinned: { value: 0.0, unit: 'B' },
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
    size: { value: 92.6, unit: 'TiB' },
    pinnable: { value: 1.3, unit: 'TiB' },
    pinned: { value: 0.0, unit: 'B' },
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
    size: { value: 42.5, unit: 'TiB' },
    pinnable: { value: 2.9, unit: 'TiB' },
    pinned: { value: 0.0, unit: 'B' },
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
    size: { value: 173.4, unit: 'TiB' },
    pinnable: { value: 3.0, unit: 'TiB' },
    pinned: { value: 0.0, unit: 'B' },
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
    size: 'small',
  },
  {
    property: 'groupName',
    header: 'Group Name',
  },
  {
    property: 'arrays',
    header: 'Arrays',
    render: datum => <Text truncate>{datum.arrays}</Text>,
    size: 'xsmall',
    sortable: false,
  },
  {
    property: 'size',
    header: 'Size',
    render: datum => (
      <Text truncate>{`${datum.size.value} ${datum.size.unit}`}</Text>
    ),
    align: 'end',
  },
  {
    property: 'pinnable',
    header: 'Pinnable',
    render: datum => (
      <Text truncate>{`${datum.pinnable.value} ${datum.pinnable.unit}`}</Text>
    ),
    align: 'end',
    sortable: false,
  },
  {
    property: 'pinned',
    header: 'Pinned',
    render: datum => (
      <Text truncate>{`${datum.pinned.value} ${datum.pinned.unit}`}</Text>
    ),
    align: 'end',
    sortable: false,
  },
  {
    property: 'savings',
    header: 'Savings',
    align: 'end',
    render: datum => (
      <Text truncate>
        {datum.savings[0] &&
          `${datum.savings[0].value} ${datum.savings[0].unit}`}
        {datum.savings[0] && datum.savings[1] && ' | '}
        {datum.savings[1] &&
          `${datum.savings[1].value} ${datum.savings[1].unit}`}
      </Text>
    ),
    size: 'small',
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
