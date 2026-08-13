import React from 'react';
import { GroupedOptionsExample } from './GroupedOptionsExample';
import GroupedOptionsExampleSource from './GroupedOptionsExample.js?raw';
import SharedSource from './shared.js?raw';

const GroupedOptionsDocsSource = `${GroupedOptionsExampleSource}\n\n// shared.js\n${SharedSource}`;

const GroupedOptions = {
  name: 'Grouped options',
  render: () => <GroupedOptionsExample />,
  parameters: {
    chromatic: { disable: true },
    docs: {
      source: {
        code: GroupedOptionsDocsSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export { GroupedOptions };
