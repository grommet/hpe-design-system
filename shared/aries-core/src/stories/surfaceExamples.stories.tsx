// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import SurfaceExamplesFlowSource from
  'apps/docs/src/examples/templates/flows/SurfaceExamplesFlow.tsx?raw';
import { SurfaceExamplesFlow } from
  '../../../../apps/docs/src/examples/templates/flows/SurfaceExamplesFlow';
// @ts-expect-error TypeScript can't resolve webpack's ?raw query syntax.

const meta = {
  title: 'Patterns/Surface examples',
  component: SurfaceExamplesFlow,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Start at Home, open Devices from Needs attention, and select a ' +
          'device serial number to view its subscription. Add resource opens ' +
          'the form; confirmed cancellation and completion return to the ' +
          'originating screen. All data and completion results are demo-only.',
      },
    },
  },
} satisfies Meta<typeof SurfaceExamplesFlow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ConnectedFlow = {
  parameters: {
    docs: {
      source: {
        code: SurfaceExamplesFlowSource,
        language: 'tsx',
        type: 'code',
      },
    },
  },
} satisfies Story;
