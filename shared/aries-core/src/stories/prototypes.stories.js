// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { AssetSelectionExample } from './prototypes/AssetSelectionExample';
import AssetSelectionExampleSource from './prototypes/AssetSelectionExample.js?raw';

const meta = {
  title: 'Prototypes/Asset selection',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

export const AccordionModelSelection = {
  name: 'Accordion model select-all',
  render: () => <AssetSelectionExample />,
  parameters: {
    chromatic: { disable: true },
    docs: {
      description: {
        story:
          'Explores letting users include all devices of a model in an accordion-based asset form. Each model row is a CheckBox: checked fills the count input with the full amount, a manually edited partial value shows indeterminate, and each size group has a parent select-all.',
      },
      source: {
        code: AssetSelectionExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
