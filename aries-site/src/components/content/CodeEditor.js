import React, { useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext, Box } from 'grommet';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { prism } from 'grommet-theme-hpe';

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

    // Get HPE prism theme colors
    const hpePrismTheme = isDark ? prism.dark : prism.light;

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
          color:
            hpePrismTheme['pre[class*="language-"]']?.color ||
            (isDark ? '#f8f8f2' : '#000000'),
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
          backgroundColor: 'transparent',
          color:
            hpePrismTheme['pre[class*="language-"]']?.color ||
            (isDark ? '#f8f8f2' : '#000000'),
        },
        '.cm-gutters': {
          display: 'none',
        },
        // Apply HPE syntax highlighting colors
        '.cm-keyword': {
          color:
            hpePrismTheme['.token.keyword']?.color ||
            (isDark ? '#ff79c6' : '#d73a49'),
          fontWeight: hpePrismTheme['.token.keyword']?.fontWeight || 'normal',
        },
        '.cm-string': {
          color:
            hpePrismTheme['.token.string']?.color ||
            (isDark ? '#f1fa8c' : '#032f62'),
        },
        '.cm-number': {
          color:
            hpePrismTheme['.token.number']?.color ||
            (isDark ? '#bd93f9' : '#005cc5'),
        },
        '.cm-comment': {
          color:
            hpePrismTheme['.token.comment']?.color ||
            (isDark ? '#6272a4' : '#6a737d'),
          fontStyle: hpePrismTheme['.token.comment']?.fontStyle || 'italic',
        },
        '.cm-operator': {
          color:
            hpePrismTheme['.token.operator']?.color ||
            (isDark ? '#ff79c6' : '#d73a49'),
        },
        '.cm-punctuation': {
          color:
            hpePrismTheme['.token.punctuation']?.color ||
            (isDark ? '#f8f8f2' : '#24292e'),
        },
        '.cm-function': {
          color:
            hpePrismTheme['.token.function']?.color ||
            (isDark ? '#50fa7b' : '#6f42c1'),
        },
        '.cm-variable': {
          color:
            hpePrismTheme['.token.variable']?.color ||
            (isDark ? '#f8f8f2' : '#24292e'),
        },
        '.cm-tag': {
          color:
            hpePrismTheme['.token.tag']?.color ||
            (isDark ? '#ff79c6' : '#d73a49'),
        },
        '.cm-attribute': {
          color:
            hpePrismTheme['.token.attr-name']?.color ||
            (isDark ? '#50fa7b' : '#6f42c1'),
        },
        '.cm-selection': {
          backgroundColor: isDark
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
        },
        '.cm-focused .cm-selection': {
          backgroundColor: isDark
            ? 'rgba(255, 255, 255, 0.15)'
            : 'rgba(0, 0, 0, 0.15)',
        },
        '.cm-cursor': {
          borderLeftColor: isDark ? '#f8f8f2' : '#24292e',
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
