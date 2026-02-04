import React, { useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext, Box } from 'grommet';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { githubLight } from '@uiw/codemirror-theme-github';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';

export const CodeEditor = ({ code, onChange }) => {
  const theme = useContext(ThemeContext);
  const editorRef = useRef(null);
  const viewRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const isDark = theme.dark;

  // Keep onChange ref updated
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!editorRef.current) return;

    const backgroundColor = isDark
      ? theme.global.colors['background-front'] || '#1e1e1e'
      : theme.global.colors['background-front'] || '#ffffff';

    const customTheme = EditorView.theme(
      {
        '&': {
          height: '100%',
          fontSize: '14px',
        },
        '.cm-editor': {
          backgroundColor:
            typeof backgroundColor === 'string'
              ? backgroundColor
              : isDark
              ? '#1e1e1e'
              : '#ffffff',
        },
        '.cm-scroller': {
          fontFamily:
            'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace',
          backgroundColor:
            typeof backgroundColor === 'string'
              ? backgroundColor
              : isDark
              ? '#1e1e1e'
              : '#ffffff',
        },
        '.cm-content': {
          backgroundColor:
            typeof backgroundColor === 'string'
              ? backgroundColor
              : isDark
              ? '#1e1e1e'
              : '#ffffff',
        },
        '.cm-gutters': {
          display: 'none',
        },
      },
      { dark: isDark },
    );

    // Create editor state
    const state = EditorState.create({
      doc: code,
      extensions: [
        customTheme,
        keymap.of([...defaultKeymap, indentWithTab]),
        javascript({ jsx: true }),
        isDark ? oneDark : githubLight,
        EditorView.updateListener.of(update => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
      ],
    });

    // Create editor view
    const view = new EditorView({
      state,
      parent: editorRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
    };
  }, [isDark]); // Recreate when theme changes

  // Update document when code prop changes externally
  useEffect(() => {
    if (viewRef.current && code !== viewRef.current.state.doc.toString()) {
      viewRef.current.dispatch({
        changes: {
          from: 0,
          to: viewRef.current.state.doc.length,
          insert: code,
        },
      });
    }
  }, [code]);

  return <Box ref={editorRef} style={{ height: '100%' }} />;
};

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
