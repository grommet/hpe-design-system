import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionPanel, Box } from 'grommet';
import { spacingSizes, alignArg, widthArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    animate: {
      control: { type: 'boolean' },
    },
    margin: {
      control: { type: 'select' },
      options: spacingSizes,
    },
    multiple: {
      control: { type: 'boolean' },
    },
    width: widthArg,
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Accordion',
  // Sets default args for argTypes, story specific args
  args: {
    animate: true,
    margin: 'none',
    multiple: false,
    width: 'xlarge',
  },
  render: (args: any) => (
    <Accordion {...args}>
      <AccordionPanel label="Our company">
        <Box pad="small">We are HPE.</Box>
      </AccordionPanel>
      <AccordionPanel label="Our history">
        <Box pad="small">
          At Hewlett Packard Enterprise, we advance the way you live and work by
          engineering experiences that unlock your full potential.
        </Box>
      </AccordionPanel>
      <AccordionPanel label="Our purpose">
        <Box pad="small">
          We advance the way you live and work by engineering experiences that
          unlock your full potential.
        </Box>
      </AccordionPanel>
      <AccordionPanel label="What's new">
        <Box pad="small">We make Bold Moves.</Box>
      </AccordionPanel>
    </Accordion>
  ),
} satisfies Story;
