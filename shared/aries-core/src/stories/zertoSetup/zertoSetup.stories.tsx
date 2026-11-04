// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { ZertoSetupAsAdopted } from './ZertoSetupAsAdopted';
import { ZertoSetupCompactText } from './ZertoSetupCompactText';
import { ZertoSetupRecommended } from './ZertoSetupRecommended';
// ts-expect-error is intentional: TypeScript can't resolve webpack's ?raw query syntax.
// Story files are excluded from tsconfig.json, so ambient module declarations
// (raw.d.ts) don't apply here. The import works at runtime via the webpack
// asset/source rule.
// @ts-expect-error TypeScript can't resolve webpack's ?raw query syntax
import RepositoriesTableSource from './RepositoriesTable.tsx?raw';
// @ts-expect-error TypeScript can't resolve webpack's ?raw query syntax
import RepositoriesTableAsAdoptedSource from './RepositoriesTableAsAdopted.tsx?raw';
// @ts-expect-error TypeScript can't resolve webpack's ?raw query syntax
import ZertoSetupCompactTextSource from './ZertoSetupCompactText.tsx?raw';

const meta = {
  title: 'Patterns/Dense Tables/Zerto Setup',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export default meta;

export const AsAdopted = {
  name: 'As adopted (equal columns)',
  render: () => <ZertoSetupAsAdopted />,
  parameters: {
    docs: {
      description: {
        story:
          'Recreates the adopted table: twelve equal-width columns, truncated ' +
          'headers and values, colour-only status. Text is the default 16px.',
      },
      source: {
        code: RepositoriesTableAsAdoptedSource,
        language: 'tsx',
        type: 'code',
      },
      canvas: { sourceState: 'shown' },
    },
  },
};

export const Recommended = {
  name: 'Recommended (sized columns, 16px)',
  render: () => <ZertoSetupRecommended />,
  parameters: {
    docs: {
      description: {
        story:
          'Same data at the same 16px text. Column sizes follow content, the ' +
          'primary column is pinned, units move into headers, status pairs an ' +
          'icon with a label, and secondary columns are available from column ' +
          'settings instead of competing for width.',
      },
      source: {
        code: RepositoriesTableSource,
        language: 'tsx',
        type: 'code',
      },
      canvas: { sourceState: 'shown' },
    },
  },
};

export const CompactText = {
  name: 'Recommended with text.small (14px)',
  // Hidden from the sidebar and docs; kept so it can be re-enabled if the
  // discussion moves to type scale rather than layout.
  tags: ['!dev', '!autodocs'],
  render: () => <ZertoSetupCompactText />,
  parameters: {
    docs: {
      description: {
        story:
          'The recommended table with the theme `text.small` token scoped to ' +
          'the table region via ThemeContext.Extend. Shows the sanctioned way ' +
          'to go smaller without leaving the type scale.',
      },
      source: {
        code: ZertoSetupCompactTextSource,
        language: 'tsx',
        type: 'code',
      },
      canvas: { sourceState: 'shown' },
    },
  },
};
