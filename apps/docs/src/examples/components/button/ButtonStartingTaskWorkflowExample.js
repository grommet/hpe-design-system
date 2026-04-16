import React, { useState } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Layer,
  Select,
  TextInput,
} from 'grommet';
import { ButtonGroup, LayerHeader } from '@shared/aries-core';

export const ButtonStartingTaskWorkflowExample = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  return (
    <Box align="center" justify="center" pad="large">
      <Button label="Create device" primary onClick={() => setOpen(true)} />
      {open && (
        <Layer
          position="right"
          full="vertical"
          onEsc={onClose}
          onClickOutside={onClose}
        >
          <Box pad="medium" gap="medium" overflow="auto" width="medium">
            <LayerHeader title="Create device" onClose={onClose} />
            <Form onSubmit={onClose}>
              <FormField
                label="Device name"
                name="deviceName"
                htmlFor="deviceName"
                required
              >
                <TextInput
                  id="deviceName"
                  name="deviceName"
                  placeholder="device-001"
                />
              </FormField>
              <FormField label="Type" name="deviceType" htmlFor="deviceType">
                <Select
                  id="deviceType"
                  name="deviceType"
                  options={['Server', 'Switch', 'Storage', 'Compute']}
                  placeholder="Select type"
                />
              </FormField>
              <FormField
                label="Location"
                name="location"
                htmlFor="location"
              >
                <Select
                  id="location"
                  name="location"
                  options={[
                    'US East',
                    'US West',
                    'EU Central',
                    'AP Southeast',
                  ]}
                  placeholder="Select location"
                />
              </FormField>
              <ButtonGroup pad={{ top: 'medium' }}>
                <Button label="Create device" primary type="submit" />
                <Button label="Cancel" onClick={onClose} />
              </ButtonGroup>
            </Form>
          </Box>
        </Layer>
      )}
    </Box>
  );
};




