import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionPanel, Box } from 'grommet';
import { alignArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    // TODO: Verify "align" or "alighSelf" as correct arg name
    align: alignArg,
    animate: {
      control: 'boolean',
    },
    margin: {
      control: 'select',
      options: [
        'none',
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'responsive',
      ],
    },
    multiple: {
      control: 'boolean',
    },
    width: {
      control: { type: 'select' },
      options: [
        'xxsmall',
        'xsmall',
        'small',
        'medium',
        'large',
        'xlarge',
        'full',
        'auto',
      ],
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Accordion',
  args: {
    align: 'stretch',
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
