import { NavigationMenuExample } from './NavigationMenuExample';
import { NavigationMenuSubheadings } from './NavigationMenuSubheadings';
// ts-expect-error is intentional: TypeScript can't resolve webpack's ?raw query syntax.
// This file is excluded from tsconfig.json to keep story files out of the library
// build, so ambient module declarations (raw.d.ts) don't apply here.
// The import works correctly at runtime via the webpack asset/source rule.
// @ts-expect-error TypeScript can't resolve webpack's ?raw query syntax
import NavigationMenuExampleSource from './NavigationMenuExample.tsx?raw';
// @ts-expect-error TypeScript can't resolve webpack's ?raw query syntax
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
