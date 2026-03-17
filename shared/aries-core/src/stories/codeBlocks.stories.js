/* eslint-disable import/no-unresolved */
/* eslint-disable max-len */
import React from 'react';
import { CodeBlockExample } from 'apps/docs/src/examples/templates/code-blocks/CodeBlocks';
import CodeBlockExampleSource from 'apps/docs/src/examples/templates/code-blocks/CodeBlocks.js?raw';

const meta = {
  title: 'Patterns/Code Blocks',
  component: CodeBlockExample,
  parameters: {
    layout: 'centered',
    controls: { disable: true },
  },
};

export default meta;

export const CodeBlock = {
  render: () => <CodeBlockExample />,
  parameters: {
    docs: {
      source: {
        code: CodeBlockExampleSource,
        language: 'jsx',
        type: 'code',
      },
      canvas: {
        sourceState: 'shown',
      },
    },
  },
};
