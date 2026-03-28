import { addons } from 'storybook/manager-api';

addons.setConfig({
  sidebar: {
    collapsedRoots: ['components', 'patterns'],
  },
  panelPosition: 'right',
});
