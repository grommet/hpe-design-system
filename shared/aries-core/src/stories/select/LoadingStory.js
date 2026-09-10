// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { LoadingExample } from './LoadingExample';
import LoadingExampleSource from './LoadingExample.js?raw';
import SharedSource from './shared.js?raw';
import SelectLoadingPlaceholderSource from '../../js/components/core/Select/components/SelectLoadingPlaceholder.js?raw';

const LoadingDocsSource = `${LoadingExampleSource}\n\n// SelectLoadingPlaceholder.js\n${SelectLoadingPlaceholderSource}\n\n// shared.js\n${SharedSource}`;

const Loading = {
  name: 'Loading options',
  render: () => <LoadingExample />,
  parameters: {
    chromatic: { disable: true },
    docs: {
      source: {
        code: LoadingDocsSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export { Loading };
