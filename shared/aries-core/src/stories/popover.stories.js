/* eslint-disable import/no-unresolved */
import React from 'react';
/* eslint-disable max-len */
// import rawSourceCode from 'apps/docs/src/examples/templates/popover/PopoverSimpleExample?raw';
// import rawSourceCode from './testCode.js?raw';
import rawSourceCode from 'asset/source!!./testCode.js';
// import rawSourceCode from '!!asset/source-loader!./testCode.js';

import { PopoverInlineExample } from 'apps/docs/src/examples/templates/popover/PopoverInlineExample';
import { PopoverSimpleExample } from 'apps/docs/src/examples/templates/popover/PopoverSimpleExample';
import { processRawSource } from '../../.storybook/utils';

// const rawSourceCode = require('!!raw-loader!./testCode');
const sourceCode = processRawSource(rawSourceCode);
console.log('Processed source code:', sourceCode);
// console.log(rawSourceCode.default.toString());

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
  },
};

export const PopoverSimple = {
  render: () => <PopoverSimpleExample />,
  // parameters: {
  //   docs: {
  //     source: {
  //       code: sourceCode,
  //     },
  //   },
  // },
};
