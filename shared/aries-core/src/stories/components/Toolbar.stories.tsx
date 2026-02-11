import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataSearch, DataSort, DataSummary, Toolbar } from 'grommet';
import { gapArg } from '../utils/commonArgs';

// Mock data for the toolbar example
const mockApplications = [
  {
    id: 1,
    title: 'scikit-learn',
    publisher: 'scikit-learn',
    categories: ['Machine learning', 'Developer tools'],
    rating: 4.8,
    pricing: 'Free',
    delivery: 'Package manager',
  },
  {
    id: 2,
    title: 'Personalizer',
    publisher: 'Acme Software Co.',
    categories: ['Machine learning', 'Developer tools'],
    rating: 4.1,
    pricing: 'Free trial',
    delivery: 'Web application',
  },
  {
    id: 3,
    title: 'TensorFlow',
    publisher: 'Google',
    categories: ['Machine learning', 'Developer tools'],
    rating: 4.6,
    pricing: 'Free',
    delivery: 'Package manager',
  },
];

const meta = {
  title: 'Components/Toolbar',
  component: Toolbar,
  argTypes: {
    gap: gapArg,
  },
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDataControls: Story = {
  name: 'Toolbar with Data Controls',
  args: {
    gap: 'small',
  },
  render: args => {
    return (
      <Data data={mockApplications}>
        <Toolbar {...args}>
          <DataSearch />
          <DataSort drop />
        </Toolbar>
        <DataSummary />
      </Data>
    );
  },
};
