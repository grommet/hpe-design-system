import React, { useState } from 'react';
import {
  Box,
  Button,
  DataTable,
  Form,
  FormField,
  Layer,
  Select,
  Text,
  TextInput,
} from 'grommet';
import { LayerHeader } from '@shared/aries-core';

const devices = [
  { name: 'web-server-01', status: 'Active', type: 'Server' },
  { name: 'db-node-02', status: 'Active', type: 'Database' },
  { name: 'proxy-edge-03', status: 'Inactive', type: 'Proxy' },
];

const columns = [
  { header: 'Name', primary: true, property: 'name' },
  { header: 'Type', property: 'type' },
  { header: 'Status', property: 'status' },
];

export const ButtonBeginNewTaskExample = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box gap="medium" pad="medium" width="large">
      <Box align="center" direction="row" justify="between">
        <Box gap="xsmall">
          <Text id="devices-heading" size="large" weight="bold">
            Devices
          </Text>
          <Text color="text-weak" size="small">
            {devices.length} items
          </Text>
        </Box>
        <Button
          label="Create device"
          onClick={() => setOpen(true)}
          primary
        />
      </Box>
      <DataTable
        aria-describedby="devices-heading"
        columns={columns}
        data={devices}
      />
      {open && (
        <Layer
          position="right"
          full="vertical"
          onClickOutside={() => setOpen(false)}
          onEsc={() => setOpen(false)}
        >
          <Box
            fill="vertical"
            gap="medium"
            overflow="auto"
            pad="medium"
            width="medium"
          >
            <LayerHeader title="Create device" onClose={() => setOpen(false)} />
            <Form>
              <FormField
                htmlFor="device-name"
                label="Device name"
                name="name"
                required
              >
                <TextInput
                  id="device-name"
                  name="name"
                  placeholder="e.g. web-server-04"
                />
              </FormField>
              <FormField
                htmlFor="device-type"
                label="Type"
                name="type"
                required
              >
                <Select
                  id="device-type"
                  name="type"
                  options={['Server', 'Database', 'Proxy']}
                  placeholder="Select type"
                />
              </FormField>
              <FormField htmlFor="device-status" label="Status" name="status">
                <Select
                  id="device-status"
                  name="status"
                  options={['Active', 'Inactive']}
                  placeholder="Select status"
                />
              </FormField>
              <Box
                direction="row"
                gap="small"
                justify="end"
                margin={{ top: 'medium' }}
              >
                <Button
                  label="Cancel"
                  onClick={() => setOpen(false)}
                />
                <Button
                  label="Create device"
                  onClick={() => setOpen(false)}
                  primary
                />
              </Box>
            </Form>
          </Box>
        </Layer>
      )}
    </Box>
  );
};
