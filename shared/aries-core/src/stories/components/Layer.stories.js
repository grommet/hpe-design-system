import React, { useState } from 'react';
import { Layer, Box, Button, Heading, Text, Form, FormField, TextInput } from 'grommet';
import { Close } from '@hpe-design/icons-grommet';
import {
  backgroundColors,
  spacingSizes,
  containerSizes,
} from '../utils/commonArgs';

const meta = {
  title: 'Layouts/Layer',
  component: Layer,
  parameters: {
    docs: {
      description: {
        component: 'Layer is a component allowing content to be displayed on top of the page the user is currently on.',
      },
    },
  },
  argTypes: {
    background: {
      control: { type: 'select' },
      options: backgroundColors,
    },
    full: {
      control: { type: 'select' },
      options: [true, false, 'horizontal', 'vertical'],
    },
    modal: {
      control: { type: 'boolean' },
    },
    position: {
      control: { type: 'select' },
      options: ['center', 'top', 'bottom', 'left', 'right', 'start', 'end'],
    },
  },
};

export default meta;

export const CenterModal = {
  render: args => {
    const [show, setShow] = useState(false);
    
    return (
      <>
        <Button label="Open Center Layer" onClick={() => setShow(true)} primary />
        {show && (
          <Layer
            {...args}
            onClickOutside={() => setShow(false)}
            onEsc={() => setShow(false)}
          >
            <Box pad="medium" gap="small" width="medium">
              <Box direction="row" align="center" justify="between">
                <Heading level={3} margin="none">Confirmation</Heading>
                <Button icon={<Close />} onClick={() => setShow(false)} />
              </Box>
              <Text>Are you sure you want to delete this item?</Text>
              <Box direction="row" gap="small" justify="end">
                <Button label="Cancel" onClick={() => setShow(false)} />
                <Button label="Delete" primary onClick={() => setShow(false)} />
              </Box>
            </Box>
          </Layer>
        )}
      </>
    );
  },
  args: {
    position: 'center',
  },
  name: 'Center Modal',
};

export const SideDrawer = {
  render: args => {
    const [show, setShow] = useState(false);
    
    return (
      <>
        <Button label="Open Side Drawer" onClick={() => setShow(true)} primary />
        {show && (
          <Layer
            {...args}
            onEsc={() => setShow(false)}
          >
            <Box pad="medium" gap="medium" overflow="auto">
              <Box direction="row" align="center" justify="between">
                <Heading level={3} margin="none">Settings</Heading>
                <Button icon={<Close />} onClick={() => setShow(false)} />
              </Box>
              <Form>
                <FormField label="Name">
                  <TextInput />
                </FormField>
                <FormField label="Email">
                  <TextInput />
                </FormField>
              </Form>
              <Box direction="row" gap="small" justify="end">
                <Button label="Cancel" onClick={() => setShow(false)} />
                <Button label="Save" primary onClick={() => setShow(false)} />
              </Box>
            </Box>
          </Layer>
        )}
      </>
    );
  },
  args: {
    position: 'right',
    full: 'vertical',
  },
  name: 'Side Drawer',
};

export const FullscreenLayer = {
  render: args => {
    const [show, setShow] = useState(false);
    
    return (
      <>
        <Button label="Open Fullscreen" onClick={() => setShow(true)} primary />
        {show && (
          <Layer {...args} onEsc={() => setShow(false)}>
            <Box fill background="background-back">
              <Box pad="medium" background="background-front">
                <Box direction="row" align="center" justify="between">
                  <Heading level={2} margin="none">Fullscreen Content</Heading>
                  <Button icon={<Close />} onClick={() => setShow(false)} />
                </Box>
              </Box>
              <Box pad="medium" flex>
                <Text>This is fullscreen layer content...</Text>
              </Box>
            </Box>
          </Layer>
        )}
      </>
    );
  },
  args: {
    full: true,
  },
  name: 'Fullscreen Layer',
};
