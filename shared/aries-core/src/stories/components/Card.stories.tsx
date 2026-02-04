import React from 'react';
import type { StoryObj } from '@storybook/react';
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Heading,
  Text,
  Box,
} from 'grommet';
import {
  backgroundArg,
  elevationArg,
  fillArg,
  heightArg,
  padArg,
  widthArg,
} from '../utils/commonArgs';

const meta = {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    background: backgroundArg,
    elevation: elevationArg,
    fill: fillArg,
    height: heightArg,
    pad: padArg,
    width: widthArg,
  },
  globals: {
    background: { value: 'background-back' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicCard: Story = {
  render: (args: any) => (
    <Card {...args}>
      <CardHeader pad="medium">
        <Box direction="row" align="center" gap="small">
          <Heading level={4} margin="none">
            Card Header
          </Heading>
        </Box>
      </CardHeader>
      <CardBody pad="medium">
        <Text>Card content with header and footer sections.</Text>
      </CardBody>
      <CardFooter pad="medium">
        <Button label="View details" secondary />
      </CardFooter>
    </Card>
  ),
  args: {
    width: 'medium',
  },
  name: 'Card',
};
