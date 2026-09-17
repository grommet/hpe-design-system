// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { CustomOptionsExample } from './CustomOptionsExample';
import CustomOptionsExampleSource from './CustomOptionsExample.js?raw';
import SelectOptionLabelSource from '../../js/components/core/Select/components/SelectOptionLabel.js?raw';
import SelectValueLabelSource from '../../js/components/core/Select/components/SelectValueLabel.js?raw';

const CustomOptionsDocsSource = `${CustomOptionsExampleSource}\n\n// SelectOptionLabel.js\n${SelectOptionLabelSource}\n\n// SelectValueLabel.js\n${SelectValueLabelSource}`;

const CustomOptions = {
  name: 'Custom selected value',
  render: () => <CustomOptionsExample />,
  parameters: {
    chromatic: { disable: true },
    docs: {
      source: {
        code: CustomOptionsDocsSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export { CustomOptions };
