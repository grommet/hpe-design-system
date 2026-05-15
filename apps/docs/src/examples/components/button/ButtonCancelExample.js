import React, { useState } from 'react';
import {
  Box,
  Button,
  Form,
  FormField,
  Text,
  TextArea,
  TextInput,
} from 'grommet';
import { ButtonGroup } from '@shared/aries-core';

const initialDevice = {
  name: 'web-server-01',
  description: 'Primary web server for the US East region.',
};

export const ButtonCancelExample = () => {
  const [editing, setEditing] = useState(false);
  const [device, setDevice] = useState(initialDevice);
  const [draft, setDraft] = useState(initialDevice);

  const handleEdit = () => {
    setDraft(device);
    setEditing(true);
  };

  const handleSave = () => {
    setDevice(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(device);
    setEditing(false);
  };

  if (!editing) {
    return (
      <Box
        align="center"
        fill
        justify="center"
        pad="medium"
      >
        <Box
          background="background-front"
          gap="medium"
          pad="medium"
          round="small"
          width="medium"
        >
          <Box gap="xsmall">
            <Text size="large" weight="bold">
              {device.name}
            </Text>
            <Text color="text-weak" size="small">
              {device.description}
            </Text>
          </Box>
          <Button
            label="Edit device"
            onClick={handleEdit}
            secondary
          />
        </Box>
      </Box>
    );
  }

  return (
    <Box
      align="center"
      fill
      justify="center"
      pad="medium"
    >
      <Box
        background="background-front"
        gap="medium"
        pad="medium"
        round="small"
        width="medium"
      >
        <Form onSubmit={handleSave}>
          <FormField
            htmlFor="name"
            label="Device name"
            name="name"
            required
          >
            <TextInput
              id="name"
              name="name"
              onChange={e =>
                setDraft(prev => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              value={draft.name}
            />
          </FormField>
          <FormField
            htmlFor="description"
            label="Description"
            name="description"
          >
            <TextArea
              id="description"
              name="description"
              onChange={e =>
                setDraft(prev => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              value={draft.description}
            />
          </FormField>
          <ButtonGroup pad={{ top: 'medium' }}>
            <Button
              label="Save changes"
              primary
              type="submit"
            />
            <Button
              label="Cancel"
              onClick={handleCancel}
            />
          </ButtonGroup>
        </Form>
      </Box>
    </Box>
  );
};
