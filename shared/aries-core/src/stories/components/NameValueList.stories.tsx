import React from 'react';
import type { StoryObj } from '@storybook/react';
import { NameValueList, NameValuePair, NameValueListProps } from 'grommet';
import { alignArg } from '../utils/commonArgs';

const sampleData = {
  'Model type': 'MXQ83700F3',
  'Request created by': 'jane.doe@email.com',
  'Last synced': '3 hours ago',
  'Created on': '10/12/2021',
  'Description': 'Full-service AI insights, security and unified infrastructure management for campus, branch, remote, and data center networks',
};

const meta = {
  title: 'Components/NameValueList',
  component: NameValueList,
  argTypes: {
    align: alignArg,
    layout: {
      control: { type: 'select' },
      options: ['column', 'grid'],
    },
    nameProps: {
      control: { type: 'object' },
    },
    pairProps: {
      control: { type: 'object' },
    },
    valueProps: {
      control: { type: 'object' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args: NameValueListProps) => {
    return (
      <NameValueList {...args}>
        {Object.entries(sampleData).map(([name, value]) => (
          <NameValuePair key={name} name={name}>
            {value}
          </NameValuePair>
        ))}
      </NameValueList>
    );
  },
  args: {
    layout: 'column',
    nameProps: { width: 'xsmall', align: 'end' },
    pairProps: { direction: 'row' },
    valueProps: { width: 'large', align: 'start' },
  },
  name: 'NameValueList',
};