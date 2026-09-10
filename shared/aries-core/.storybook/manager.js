// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { addons } from 'storybook/manager-api';

addons.setConfig({
  sidebar: {
    collapsedRoots: ['components', 'patterns'],
  },
  panelPosition: 'right',
});
