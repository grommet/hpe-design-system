import React from 'react';

import { Box } from 'grommet';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { useDarkMode } from '../../utils';
import { prism } from 'grommet-theme-hpe';

export const CodeBlocksPreview = () => {
  const themeMode = useDarkMode().value ? 'dark' : 'light';
  const codeString = `console.log(
  "Hello World"
);`;
  return (
    <Box>
      <SyntaxHighlighter
        style={themeMode === 'dark' ? prism.dark : prism.light}
        wrapLongLines
        language="javascript"
      >
        {codeString}
      </SyntaxHighlighter>
    </Box>
  );
};
