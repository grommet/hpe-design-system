import React from 'react';
import PropTypes from 'prop-types';
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
    arrays: 'Asup',
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
    arrays: 'asup-array01-lvs',
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
    arrays: 'Harm-cs-stage-R4-5',
    size: 68994941234567,
    pinnable: 12529511627776,
    pinned: 2699511627776,
    savings: [],
  },
  {
    id: 'l3d8xkm0knx4',
    poolName: 'asup-array2 (default)',
    groupName: 'Asup',
    arrays: 'ds-array02',
    size: 90655321234567,
    pinnable: 11199511627776,
    pinned: 0,
    savings: [],
  },
  {
    id: 'jsjas87qeqgj',
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
    arrays: 'harm-stage-array03',
    pinnable: 12529511627776,
    pinned: 0,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'g9v1104koten',
    poolName: 'asup-array2 (default)',
    arrays: 'harm-stage-array03',
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
    size: 655321234567,
    pinnable: 1329511627776,
    pinned: 0,
    savings: [
      { unit: 'TiB', value: 8.0 },
      { unit: 'xGHz', value: 333.2 },
    ],
  },
  {
    id: 'vz86u3ll4ai2',
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
    id: 'f1iucu2ybzf3',
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
];

const columns = [
  {
    property: 'poolName',
    header: 'Pool Name',
    render: datum => (
      <Text a11yTitle={!datum.poolName ? 'No value' : undefined} truncate>
        {datum.poolName || '--'}
      </Text>
    ),
    primary: true,
  },
  {
    property: 'groupName',
    header: 'Group Name',
    render: datum => (
      <Text a11yTitle={!datum.groupName ? 'No value' : undefined} truncate>
        {datum.groupName || '--'}
      </Text>
    ),
  },
  {
    property: 'arrays',
    header: 'Arrays',
    render: datum => (
      <Text a11yTitle={!datum.arrays ? 'No value' : undefined} truncate>
        {datum.arrays || '--'}
      </Text>
    ),
    sortable: false,
  },
  {
    property: 'size',
    header: (
      <Text color="text-strong" weight="bold">
        Size{' '}
        <Text size="xsmall" weight="normal" color="text">
          (TiB)
        </Text>
      </Text>
    ),
    render: datum => (
      // bytes to tebibytes
      <Text a11yTitle={!datum.size ? 'No value' : undefined}>
        {datum.size ? (datum.size / 2 ** 40).toFixed([1]) : '--'}
      </Text>
    ),
    align: 'end',
  },
  {
    property: 'pinnable',
    header: (
      <Text color="text-strong" weight="bold">
        Pinnable{' '}
        <Text size="xsmall" weight="normal" color="text">
          (B)
        </Text>
      </Text>
    ),
    render: datum => (
      // bytes to tebibytes
      <Text a11yTitle={!datum.pinnable ? 'No value' : undefined}>
        {datum.pinnable ? (datum.pinnable / 2 ** 40).toFixed([1]) : '--'}
      </Text>
    ),
    align: 'end',
  },
  {
    property: 'pinned',
    header: (
      <Text color="text-strong" weight="bold">
        Pinned{' '}
        <Text size="xsmall" weight="normal" color="text">
          %
        </Text>
      </Text>
    ),
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
        <Text>{((datum.pinned / datum.pinnable) * 10).toFixed(0)}%</Text>
      </Box>
    ),
    sortable: false,
  },
  {
    property: 'savings',
    header: (
      <Text color="text-strong" weight="bold">
        Savings{' '}
        <Text size="xsmall" weight="normal" color="text">
          (xGHz)
        </Text>
      </Text>
    ),
    align: 'end',
    render: datum => (
      <Text a11yTitle={!datum.savings.length ? 'No value' : undefined} truncate>
        {datum.savings[1] ? `${datum.savings[1].value}` : '--'}
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

// designSystemDemo is used for DS site only, can be removed in production.
export const DataTableEmptyCellExample = ({ designSystemDemo }) => {
  const size = React.useContext(ResponsiveContext);

  return (
    <>
      <Heading
        id="storage-pools-heading"
        level={3}
        margin={{ bottom: 'small', top: 'none' }}
      >
        Storage Pools
      </Heading>
      <Box
        // Height is restricted to keep inline doc page examples more compact.
        // In production, DataTable height should follow height guidelines.
        // https://design-system.hpe.design/components/datatable#setting-the-height-of-a-table
        height={designSystemDemo ? undefined : 'medium'}
        overflow="auto"
      >
        <DataTable
          aria-describedby="storage-pools-heading"
          data={data}
          columns={[
            {
              property: 'id',
              header: 'Id',
              primary: true,
              render: datum => datum.id.slice(datum.id.length - 5),
              pin: size === 'small',
            },
            ...columns,
          ]}
          fill
          onClickRow={({ datum }) => handleClickRow(datum)}
          pin
          sortable
        />
      </Box>
    </>
  );
};

DataTableEmptyCellExample.propTypes = {
  designSystemDemo: PropTypes.bool,
};
