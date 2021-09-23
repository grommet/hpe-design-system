import React from 'react';

import { Box } from 'grommet';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import DarkCodeTheme from '../templates/code-blocks/DarkCodeTheme';
import LightCodeTheme from '../templates/code-blocks/LightCodeTheme';
import { useDarkMode } from '../../utils';

export const CodeBlocksPreview = () => {
  const themeMode = useDarkMode().value ? 'dark' : 'light';
  const codeString = `console.log(
  "Hello World"
);`;
  return (
    <Box>
      <SyntaxHighlighter
        style={themeMode === 'dark' ? DarkCodeTheme : LightCodeTheme}
        wrapLongLines
        language="javascript"
      >
        {codeString}
      </SyntaxHighlighter>
    </Box>
  );
};
