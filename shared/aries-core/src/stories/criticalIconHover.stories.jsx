// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { CriticalIconHover } from '../../../../sandbox/grommet-app/src/prototypes/CriticalIconHover';

const meta = {
  title: 'Design Tokens/Color/Critical icon hover',
  component: CriticalIconHover,
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Interactive proposal for color.icon.critical.DEFAULT.hover. Light mode uses a new proposed base.color.red.850 (#AD211C); dark mode uses existing base.color.red.400 (#FF7B7B). Both modes are scoped explicitly, independent of the Storybook theme toolbar. Hover or focus an icon, or select Hold hover to keep the proposal visible. No published tokens are changed.',
      },
    },
  },
};

export default meta;

export const LightAndDark = {};
