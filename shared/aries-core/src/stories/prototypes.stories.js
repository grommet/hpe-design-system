// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AssetSelectionExample } from './prototypes/AssetSelectionExample';
import { AssetSelectionSectionsExample } from './prototypes/AssetSelectionSectionsExample';
import AssetSelectionExampleSource from './prototypes/AssetSelectionExample.js?raw';
import AssetSelectionSectionsExampleSource from './prototypes/AssetSelectionSectionsExample.js?raw';
import SharedSource from './prototypes/shared.js?raw';

const withShared = source => `${source}\n\n// shared.js\n${SharedSource}`;

const meta = {
  title: 'Prototypes/Asset selection',
  parameters: {
    controls: { disable: true },
    chromatic: { disable: true },
  },
};

export default meta;

const docsParameters = (source, description) => ({
  docs: {
    description: { story: description },
    source: {
      code: withShared(source),
      language: 'jsx',
      type: 'code',
    },
    canvas: {
      sourceState: 'shown',
    },
  },
});

export const AccordionModelSelection = {
  name: 'Accordion model select-all',
  render: () => <AssetSelectionExample />,
  parameters: docsParameters(
    AssetSelectionExampleSource,
    'Explores letting users include all devices of a model in an accordion-based asset form. Each model row is a CheckBox: checked fills the count input with the full amount, a manually edited partial value shows indeterminate, and each size group has a parent select-all.',
  ),
};

export const FlatSectionsModelSelection = {
  name: 'Flat sections model select-all',
  render: () => <AssetSelectionSectionsExample />,
  parameters: docsParameters(
    AssetSelectionSectionsExampleSource,
    'Same row interaction as the accordion variant, but categories are always-visible sections with headings instead of collapsible panels, so no inputs or validation errors can be hidden.',
  ),
};
