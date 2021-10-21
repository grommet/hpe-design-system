import React, { useContext } from 'react';

import { Box, ThemeContext } from 'grommet';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'grommet-theme-hpe';

export const CodeBlocksPreview = () => {
  const theme = useContext(ThemeContext);
  const codeString = `console.log(
  "Hello World"
);`;
  return (
    <Box>
      <SyntaxHighlighter
        style={theme.dark ? prism.dark : prism.light}
        wrapLongLines
        language="javascript"
      >
        {codeString}
      </SyntaxHighlighter>
    </Box>
  );
};
