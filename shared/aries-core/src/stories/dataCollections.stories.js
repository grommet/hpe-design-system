// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import React from 'react';
import { DevicesCollection } from 'apps/docs/src/examples/templates/data-collections/DevicesCollection';
import DevicesCollectionSource from 'apps/docs/src/examples/templates/data-collections/DevicesCollection.js?raw';

const meta = {
  title: 'Patterns/Data collections',
  parameters: {
    layout: 'fullscreen',
    controls: { disable: true },
  },
};

export default meta;

export const Devices = {
  render: () => <DevicesCollection />,
  parameters: {
    docs: {
      source: {
        code: DevicesCollectionSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
