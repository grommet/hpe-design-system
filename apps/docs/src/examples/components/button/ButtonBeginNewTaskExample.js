import React from 'react';
import {
  Box,
  Button,
  DataTable,
  Text,
} from 'grommet';

const devices = [
  { name: 'web-server-01', status: 'Active', type: 'Server' },
  { name: 'db-node-02', status: 'Active', type: 'Database' },
  {
    name: 'proxy-edge-03',
    status: 'Inactive',
    type: 'Proxy',
  },
];

const columns = [
  { header: 'Name', primary: true, property: 'name' },
  { header: 'Type', property: 'type' },
  { header: 'Status', property: 'status' },
];

export const ButtonBeginNewTaskExample = () => (
  <Box gap="medium" pad="medium" width="large">
    <Box align="center" direction="row" justify="between">
      <Box gap="xsmall">
        <Text
          id="devices-heading"
          size="large"
          weight="bold"
        >
          Devices
        </Text>
        <Text color="text-weak" size="small">
          {devices.length} items
        </Text>
      </Box>
      <Button
        label="Create device"
        onClick={() => {}}
        primary
      />
    </Box>
    <DataTable
      aria-describedby="devices-heading"
      columns={columns}
      data={devices}
    />
  </Box>
);
