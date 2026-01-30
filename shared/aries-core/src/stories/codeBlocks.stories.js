import React from 'react';
/* eslint-disable max-len */
// eslint-disable-next-line import/no-unresolved
import { CodeBlockExample } from 'apps/docs/src/examples/templates/code-blocks/CodeBlocks';

const meta = {
  title: 'Code Blocks',
  component: CodeBlockExample,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

export const CodeBlock = {
  render: () => <CodeBlockExample />,
};
