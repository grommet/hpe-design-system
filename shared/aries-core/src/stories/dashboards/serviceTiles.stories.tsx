// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { StoryObj } from '@storybook/react-webpack5';
import { ServiceTiles } from './ServiceTiles';
import { widgetArgTypes, widgetGlobals, widgetSizes } from './content/stories';
// @ts-expect-error TypeScript can't resolve webpack's ?raw query syntax
import ServiceTilesSource from './ServiceTiles.tsx?raw';

const meta = {
  title: 'Patterns/Dashboard widgets/3. Service tiles',
  component: ServiceTiles,
  argTypes: widgetArgTypes,
  globals: widgetGlobals,
  parameters: {
    docs: {
      source: { code: ServiceTilesSource, language: 'tsx', type: 'code' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = widgetSizes.small;
export const Medium: Story = widgetSizes.medium;
export const Large: Story = widgetSizes.large;
export const HeightConstrained: Story = widgetSizes.constrained;
