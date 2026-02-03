import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, AccordionPanel, Box } from 'grommet';
import { alignArg } from '../utils/commonArgs';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  argTypes: {
    // TODO: Verify "align" or "alignSelf" as correct arg name
    align: alignArg,
    animate: {
      control: { type: 'boolean' },
      description: 'Transition content in and out with a slide down animation.',
    },
    margin: {
      control: { type: 'select' },
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
      description: 'The amount of margin around the component.',
    },
    multiple: {
      control: { type: 'boolean' },
      description: 'Allow multiple panels to be opened at once.',
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
      description: 'The width of the component.',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  name: 'Accordion',
  // Sets default args for argTypes, story specific args
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
