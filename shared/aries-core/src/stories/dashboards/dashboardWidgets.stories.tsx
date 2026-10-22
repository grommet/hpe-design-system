// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { StoryObj } from '@storybook/react-webpack5';
import { MyServicesWidget } from './MyServicesWidget';
// @ts-expect-error TypeScript can't resolve webpack's ?raw query syntax
import MyServicesWidgetSource from './MyServicesWidget.tsx?raw';

const meta = {
  title: 'Patterns/Dashboard widgets',
  component: MyServicesWidget,
  argTypes: {
    width: {
      control: 'radio',
      options: ['medium', 'xlarge', 'xxlarge'],
      description: 'Widget size: small (384px), medium (768px), large (1024px)',
    },
    columns: { control: { type: 'number', min: 1, max: 3 } },
    limit: { control: { type: 'number', min: 1 } },
  },
  globals: {
    background: { value: 'background-back' },
  },
  parameters: {
    docs: {
      source: {
        code: MyServicesWidgetSource,
        language: 'tsx',
        type: 'code',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const MyServicesSmall: Story = {
  name: 'My services — small',
  args: { width: 'medium', columns: 1 },
};

export const MyServicesMedium: Story = {
  name: 'My services — medium',
  args: { width: 'xlarge', columns: 2 },
};

export const MyServicesLarge: Story = {
  name: 'My services — large',
  args: { width: 'xxlarge', columns: 3 },
};

export const MyServicesHeightConstrained: Story = {
  name: 'My services — height constrained',
  args: { width: 'medium', columns: 1, limit: 5 },
};
