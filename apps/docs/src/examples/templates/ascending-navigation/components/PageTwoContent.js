/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Box, DataTable, Text } from 'grommet';

const data = [
  {
    id: 'id-1',
    displayName: 'Server 1',
    serialNumber: '8899569448808967',
    model: 'Proliant SY 480 Gen10',
    powerState: 'On',
    health: { summary: 'OK' },
    state: { connected: false },
  },
  {
    id: 'id-2',
    displayName: 'Server 2',
    serialNumber: '482148808968',
    model: 'Proliant SY 990 Gen9',
    powerState: 'Off',
    health: { summary: 'Warning' },
    state: { connected: true },
  },
  {
    id: 'id-3',
    displayName: 'Server 3',
    serialNumber: '3890108963',
    model: 'Proliant SY 990 Gen9',
    powerState: 'Off',
    health: { summary: 'Warning' },
    state: { connected: false },
  },
  {
    id: 'id-4',
    displayName: 'Server 4',
    serialNumber: '8508964',
    model: 'Proliant SY 660 Gen10',
    powerState: 'On',
    health: { summary: 'OK' },
    state: { connected: true },
  },
  {
    id: 'id-5',
    displayName: 'Server 5',
    serialNumber: '3123i4264',
    model: 'Proliant SY 660 Gen10',
    powerState: 'On',
    health: { summary: 'OK' },
    state: { connected: true },
  },
  {
    id: 'id-6',
    displayName: '3M442501WV',
    serialNumber: '4208964',
    model: 'ProLiant DL380 Gen10',
    powerState: 'Off',
    health: { summary: 'Critical' },
    state: { connected: true },
  },
  {
    id: 'id-7',
    displayName: 'ZFD3712GP',
    serialNumber: 'CCD21712GP',
    model: null,
    powerState: 'On',
    health: { summary: 'OK' },
    state: { connected: false },
  },
];

export const PageTwoContent = () => {
  const [selected, setSelected] = useState([]);

  return (
    <Box>
      <DataTable
        data={data}
        aria-describedby="Example user data"
        select={selected}
        onSelect={setSelected}
        columns={[
          {
            property: 'displayName',
            header: 'Name',
            primary: true,
            render: datum => <Text>{datum.displayName}</Text>,
          },
          {
            property: 'serialNumber',
            header: 'Serial Number',
          },
          {
            property: 'model',
            header: 'Model',
            render: datum => <Text>{datum.model || '—'}</Text>,
          },
          {
            property: 'powerState',
            header: 'Power',
          },
          {
            property: 'health',
            header: 'Health',
            render: datum => <Text>{datum.health?.summary}</Text>,
          },
        ]}
      />
    </Box>
  );
};
