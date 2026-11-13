// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { SubscriptionDetails } from
  // @ts-expect-error apps/docs is a Storybook webpack alias.
  'apps/docs/src/examples/templates/data-collections/SubscriptionDetails';
import SubscriptionDetailsSource from
  // @ts-expect-error TypeScript can't resolve webpack's ?raw query syntax
  'apps/docs/src/examples/templates/data-collections/SubscriptionDetails.tsx?raw';

const meta = {
  title: 'Patterns/Data collections',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
} satisfies Meta<typeof SubscriptionDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SubscriptionDetailsWithAssistant = {
  name: 'Subscription details with assistant',
  render: () => <SubscriptionDetails />,
  parameters: {
    docs: {
      source: {
        code: SubscriptionDetailsSource,
        language: 'tsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
} satisfies Story;
