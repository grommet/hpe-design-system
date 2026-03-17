/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import React from 'react';
import { PopoverInlineExample } from 'apps/docs/src/examples/templates/popover/PopoverInlineExample';
import { PopoverSimpleExample } from 'apps/docs/src/examples/templates/popover/PopoverSimpleExample';
// eslint-disable-next-line import/no-unresolved
import PopoverInlineSource from 'apps/docs/src/examples/templates/popover/PopoverInlineExample.js?raw';
// eslint-disable-next-line import/no-unresolved
import PopoverSimpleSource from 'apps/docs/src/examples/templates/popover/PopoverSimpleExample.js?raw';

const meta = {
  title: 'Patterns/Popover',
  parameters: {
    controls: { disable: true },
  },
};

export default meta;

export const PopoverInline = {
  render: () => <PopoverInlineExample />,
  parameters: {
    background: 'background-back',
    docs: {
      source: {
        code: PopoverInlineSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};

export const PopoverSimple = {
  render: () => <PopoverSimpleExample />,
  parameters: {
    docs: {
      source: {
        code: PopoverSimpleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
