import React, { useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext, Box, TextArea } from 'grommet';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'grommet-theme-hpe';

export const CodeEditor = ({ code, onChange }) => {
  const theme = useContext(ThemeContext);
  const textareaRef = useRef(null);
  const cursorPositionRef = useRef(null);
  const isDark = theme.dark;

  useEffect(() => {
    // Restore cursor position after render
    if (textareaRef.current && cursorPositionRef.current !== null) {
      textareaRef.current.selectionStart = cursorPositionRef.current;
      textareaRef.current.selectionEnd = cursorPositionRef.current;
      cursorPositionRef.current = null;
    }
  }, [code]);

  const handleChange = e => {
    // Save cursor position before update
    cursorPositionRef.current = e.target.selectionStart;
    onChange(e.target.value);
  };

  return (
    <Box
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateAreas: '"code"',
      }}
    >
      {/* Syntax highlighted background */}
      <Box
        style={{
          gridArea: 'code',
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <SyntaxHighlighter
          language="jsx"
          style={isDark ? prism.dark : prism.light}
          customStyle={{
            margin: 0,
            padding: '12px',
            background: 'transparent',
            fontSize: 14,
            fontFamily:
              'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace',
            minHeight: '240px',
          }}
        >
          {code || ' '}
        </SyntaxHighlighter>
      </Box>
      {/* Transparent textarea overlay */}
      <TextArea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        rows={10}
        style={{
          gridArea: 'code',
          fontFamily:
            'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace',
          fontSize: 14,
          backgroundColor: 'transparent',
          color: 'transparent',
          caretColor: theme.global.colors.text,
          border: 'none',
          padding: '12px',
          resize: 'vertical',
          whiteSpace: 'pre',
          overflowX: 'auto',
          minHeight: '240px',
        }}
      />
    </Box>
  );
};

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
