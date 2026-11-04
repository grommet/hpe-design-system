// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { StoryObj } from '@storybook/react-webpack5';
import { IconRows } from './IconRows';
import { OnOverviewDashboard } from './content/OnOverviewDashboard';
import {
  dashboardArgTypes,
  dashboardParameters,
  dashboardSizes,
} from './content/stories';

const meta = {
  title: 'Patterns/Dashboard widgets/Overview dashboard/Icon rows',
  component: OnOverviewDashboard,
  args: { widget: IconRows },
  argTypes: dashboardArgTypes,
  parameters: dashboardParameters,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = dashboardSizes.small;
export const Medium: Story = dashboardSizes.medium;
export const Large: Story = dashboardSizes.large;
