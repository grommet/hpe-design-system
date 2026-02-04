import React from 'react';
import type { StoryObj } from '@storybook/react';
import { Layer, Box, Button, Heading, Text } from 'grommet';
import { Close } from '@hpe-design/icons-grommet';
import { backgroundArg, fillArg, marginArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/Layer',
  component: Layer,
  argTypes: {
    animate: {
      control: { type: 'boolean' },
    },
    animation: {
      control: { type: 'select' },
      options: ['fadeIn', 'slide'],
    },
    background: backgroundArg,
    full: fillArg,
    margin: marginArg,
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
type Story = StoryObj<typeof meta>;

export const LayerExample: Story = {
  render: (args: any) => {
    return (
      <Layer as="section" {...args}>
        <Box pad="medium" gap="small" width="medium">
          <Box direction="row" align="center" justify="between">
            <Heading level={1} margin="none" size="medium">
              Confirmation
            </Heading>
            <Button
              aria-label="Close layer"
              icon={<Close aria-hidden />}
              onClick={() => {}}
            />
          </Box>
          <Text>Are you sure you want to delete this item?</Text>
          <Box direction="row" gap="small" justify="end">
            <Button label="Cancel" onClick={() => {}} />
            <Button label="Delete" primary onClick={() => {}} />
          </Box>
        </Box>
      </Layer>
    );
  },
  args: {
    position: 'center',
  },
  name: 'Layer',
};