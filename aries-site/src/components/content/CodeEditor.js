import React, { useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext, TextArea } from 'grommet';

export const CodeEditor = ({ code, onChange }) => {
  const theme = useContext(ThemeContext);
  const textareaRef = useRef(null);
  const cursorPositionRef = useRef(null);

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
    <TextArea
      ref={textareaRef}
      value={code}
      onChange={handleChange}
      rows={10}
      style={{
        fontFamily:
          'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace',
        fontSize: 14,
        backgroundColor: theme.global.colors['background-front'],
        color: theme.global.colors.text,
        border: `1px solid ${theme.global.colors.border}`,
        borderRadius: theme.global.edgeSize.xsmall,
        padding: '12px',
        resize: 'vertical',
        whiteSpace: 'pre',
        overflowX: 'auto',
      }}
    />
  );
};

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
