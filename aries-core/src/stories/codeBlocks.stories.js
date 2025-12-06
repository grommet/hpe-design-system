import React from 'react';
/* eslint-disable max-len */
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
