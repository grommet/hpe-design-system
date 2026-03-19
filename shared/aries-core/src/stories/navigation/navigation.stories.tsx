/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { NavigationMenuExample } from './NavigationMenuExample';
import { NavigationMenuSubheadings } from './NavigationMenuSubheadings';
import NavigationMenuExampleSource from './NavigationMenuExample.tsx?raw';
import NavigationMenuSubheadingsSource from './NavigationMenuSubheadings.tsx?raw';

const meta = {
  title: 'Patterns/Navigation',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

export const Navigation = {
  render: () => <NavigationMenuExample />,
  parameters: {
    docs: {
      source: {
        code: NavigationMenuExampleSource,
        language: 'tsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const NavigationWithSubheadings = {
  render: () => <NavigationMenuSubheadings />,
  parameters: {
    docs: {
      source: {
        code: NavigationMenuSubheadingsSource,
        language: 'tsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
