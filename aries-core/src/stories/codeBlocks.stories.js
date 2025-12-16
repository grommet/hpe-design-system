import React from 'react';
/* eslint-disable max-len */
// eslint-disable-next-line import/no-unresolved
import { CodeBlockExample } from 'aries-site/src/examples/templates/code-blocks/CodeBlocks';

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
