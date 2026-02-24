import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Data, DataSearch, DataSort, DataTable, Toolbar } from 'grommet';

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
  title: 'Components/Data & friends/Toolbar',
  component: Toolbar,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof Toolbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDataControls: Story = {
  name: 'Toolbar',
  render: args => {
    const columns = [
      {
        property: 'title',
        header: 'Title',
        primary: true,
      },
      {
        property: 'publisher',
        header: 'Publisher',
      },
      {
        property: 'categories',
        header: 'Categories',
        render: (datum: any) => datum.categories.join(', '),
      },
      {
        property: 'rating',
        header: 'Rating',
        render: (datum: any) => datum.rating.toString(),
      },
      {
        property: 'pricing',
        header: 'Pricing',
      },
      {
        property: 'delivery',
        header: 'Delivery',
      },
    ];

    return (
      <Data data={mockApplications}>
        <Toolbar {...args}>
          <DataSearch />
          <DataSort drop />
        </Toolbar>
        <DataTable columns={columns} />
      </Data>
    );
  },
  args: {},
};
