// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { DevicesCollection } from
  // @ts-expect-error apps/docs is a Storybook webpack alias.
  'apps/docs/src/examples/templates/data-collections/DevicesCollection';
// @ts-expect-error TypeScript can't resolve webpack's ?raw query syntax
import DevicesCollectionSource from 'apps/docs/src/examples/templates/data-collections/DevicesCollection.tsx?raw';  

const meta = {
  title: 'Patterns/Data collections',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
} satisfies Meta<typeof DevicesCollection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Devices = {
  render: () => <DevicesCollection />,
  parameters: {
    docs: {
      source: {
        code: DevicesCollectionSource,
        language: 'tsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
} satisfies Story;
