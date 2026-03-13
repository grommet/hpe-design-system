import React from 'react';
import type { StoryObj } from '@storybook/react-webpack5';
import { Layer, Box, Button, Heading, Text, LayerExtendedProps } from 'grommet';
import { Close } from '@hpe-design/icons-grommet';
import { backgroundArg, fillArg, marginArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/Layer',
  component: Layer,
  argTypes: {
    background: backgroundArg,
    full: fillArg,
    margin: marginArg,
    position: {
      control: { type: 'select' },
      options: ['center', 'top', 'bottom', 'left', 'right', 'start', 'end'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const LayerExample: Story = {
  render: (args: LayerExtendedProps) => {
    return (
      // @ts-expect-error LayerExtendedProps doesn't include "as" prop, hence the ts-expect-error
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
