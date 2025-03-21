import React, { useContext } from 'react';
import {
  Box,
  DataTable,
  Heading,
  Meter,
  Text,
  ResponsiveContext,
} from 'grommet';
import { ContentPane } from '../../../layouts';

const data = [
  {
    id: 'mjbpiclthh8y',
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
    id: 'hx5f2e57phfb',
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
    id: 'om2hy2z79kyz',
    poolName: 'Dev36-erray01 (default)',
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
    id: '6d9u4hv95xjq',
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
    id: 'qpsidi3ccnpr',
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
    id: 'l3d8xkm0knx4',
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
    id: 'jsjas87qeqgj',
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
    id: '1jrnzxds9419',
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
    id: 'lva18ol56t7a',
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
    id: 'g9v1104koten',
    poolName: 'asup-array2 (default)',
    groupName: 'Asup',
    arrays: 'ds-array02',
    size: 5655321234567,
    pinnable: 12529511627776,
    pinned: 0,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 3955.2 },
    ],
  },
  {
    id: 'ny13xepj8wyc',
    poolName: 'Dev36-varray02 (default)',
    groupName: 'Dev',
    arrays: 'ds-array01',
    size: 655321234567,
    pinnable: 1329511627776,
    pinned: 0,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'bmvmd8219',
    poolName: 'DevHarmCs2R39',
    groupName: 'Dev',
    arrays: 'harm-stage-array03',
    size: 52655321234567,
    pinnable: 2529511627776,
    pinned: 0,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'djfksd9211sf',
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'dndn2219dsf9',
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'jkljd9ssd9',
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'dfjk32118cs9',
    poolName: 'DevHarmCs2R39',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'djf921jkfs90',
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'dfbs7281kdsl',
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'harm-stage-array01',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'sldkfj991jdklj',
    poolName: 'DevHarmCs2R39',
    groupName: 'Dev',
    arrays: 'harm-stage-array01',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'jdkf92h18d',
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'harm-stage-array01',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'lala9asd8v',
    poolName: 'DevHarmCs2R39',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'kl92kdjfs9',
    poolName: 'DevHarmCs2R39',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'kljsf8sdf8',
    poolName: 'DevHarmCs2R39',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: '99dsak92nsak',
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'harm-stage-array01',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'djfk921saj',
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'harm-stage-array01',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'sfj7dkslw9',
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'harm-stage-array01',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'as82lfu2ybjilj',
    poolName: 'DevHarmCs2R39',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'jklsf92ybzf3',
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'ds98sabzf3',
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'sf8762aybzf3',
    poolName: 'DevHarmCs2R39',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'ghj6u2ybzf3',
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'rtp-array198',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'f1cu2yjkljbzf3',
    poolName: 'DevStageSymR31 (default)',
    groupName: 'Dev',
    arrays: 'harm-stage-array01',
    size: 30655321234567,
    pinnable: 22529511627776,
    pinned: 7529511627776,
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
    primary: true,
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
    header: 'Size',
    units: 'TiB',
    render: datum =>
      // bytes to tebibytes
      (datum.size / 2 ** 40).toFixed([1]),
    align: 'end',
  },
  {
    property: 'pinnable',
    header: 'Pinnable',
    units: 'B',
    render: datum =>
      // bytes to tebibytes
      (datum.pinnable / 2 ** 40).toFixed([1]),
    align: 'end',
  },
  {
    property: 'pinned',
    header: 'Pinned',
    units: '%',
    render: datum => (
      <Box gap="xsmall" direction="row">
        <Box pad={{ vertical: 'xsmall' }}>
          <Meter
            alignSelf="center"
            values={[
              { value: datum.pinned / datum.pinnable, color: 'graph-2' },
            ]}
            max={1}
            thickness="small"
            size="small"
          />
        </Box>
        <Text>{((datum.pinned / datum.pinnable) * 100).toFixed(0)}%</Text>
      </Box>
    ),
    sortable: false,
  },
  {
    property: 'savings',
    header: 'Savings',
    units: 'xGHz',
    align: 'end',
    render: datum => (
      <Text truncate>{datum.savings[1] && `${datum.savings[1].value}`}</Text>
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

export const PaginationTableExample = () => {
  const size = useContext(ResponsiveContext);

  return (
    <ContentPane gap="medium">
      <Heading id="storage-pools-heading" level={3} margin="none">
        Storage pools
      </Heading>
      <DataTable
        aria-describedby="storage-pools-heading"
        data={data}
        columns={[
          {
            property: 'id',
            header: 'Id',
            primary: true,
            render: datum => datum.id.slice(datum.id.length - 5),
            pin: ['xsmall', 'small'].includes(size),
          },
          ...columns,
        ]}
        fill
        onClickRow={({ datum }) => handleClickRow(datum)}
        paginate={{
          border: 'top',
          direction: 'row',
          fill: 'horizontal',
          flex: false,
          justify: !['xsmall', 'small'].includes(size) ? 'end' : 'center',
          pad: { top: 'xsmall' },
        }}
        step={10}
        sortable
      />
    </ContentPane>
  );
};
