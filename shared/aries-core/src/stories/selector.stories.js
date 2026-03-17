/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import React from 'react';
import { SimpleSelector } from 'apps/docs/src/examples/templates/selector/SelectorSimple';
import { QuickFilter as QuickFilterExample } from 'apps/docs/src/examples/templates/selector/QuickFilter';
import { SupportSelector } from 'apps/docs/src/examples/templates/selector/SupportSelector';
import SimpleSelectorSource from 'apps/docs/src/examples/templates/selector/SelectorSimple.js?raw';
import QuickFilterSource from 'apps/docs/src/examples/templates/selector/QuickFilter.js?raw';
import SupportSelectorSource from 'apps/docs/src/examples/templates/selector/SupportSelector.js?raw';

const meta = {
  title: 'Patterns/Selector',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

export const Simple = {
  render: () => <SimpleSelector />,
  parameters: {
    docs: {
      source: {
        code: SimpleSelectorSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const QuickFilter = {
  render: () => <QuickFilterExample />,
  parameters: {
    docs: {
      source: {
        code: QuickFilterSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const Support = {
  render: () => <SupportSelector />,
  parameters: {
    docs: {
      source: {
        code: SupportSelectorSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
