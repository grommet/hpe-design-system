import React, { useContext, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext, Box } from 'grommet';
import { EditorView, keymap } from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags } from '@lezer/highlight';
import { prism } from 'grommet-theme-hpe';

export const CodeEditor = ({ code, onChange }) => {
  const theme = useContext(ThemeContext);
  const editorRef = useRef(null);
  const viewRef = useRef(null);
  const onChangeRef = useRef(onChange);
  const isDark = theme.dark;

  // Keep onChange ref updated without triggering recreation
  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!editorRef.current) return undefined;

    // Don't recreate if editor already exists with same theme mode
    if (viewRef.current) {
      return;
    }

    // Get HPE theme colors
    const getColor = colorName => {
      const colorValue = theme.global.colors[colorName];
      if (typeof colorValue === 'object') {
        return colorValue[isDark ? 'dark' : 'light'] || colorValue;
      }
      return colorValue || colorName;
    };

    // Get the HPE prism theme for syntax highlighting colors
    const hpePrismTheme = isDark ? prism.dark : prism.light;

    // Create HPE theme extension
    const hpeTheme = EditorView.theme(
      {
        '&': {
          height: '100%',
          fontSize: '14px',
          fontFamily:
            'ui-monospace, SFMono-Regular, SF Mono, Consolas, Liberation Mono, Menlo, monospace',
        },
        '.cm-editor': {
          backgroundColor: getColor('background-front'),
          color: getColor('text-default'),
          border: `1px solid ${getColor('border-weak')}`,
          borderRadius: '4px',
        },
        '.cm-scroller': {
          backgroundColor: 'transparent',
          lineHeight: '1.5',
        },
        '.cm-content': {
          backgroundColor: 'transparent',
          color: getColor('text-default'),
          padding: '12px',
          caretColor: getColor('text-strong'),
          minHeight: '100px',
        },
        '.cm-content[contenteditable="true"]': {
          outline: 'none',
        },
        '.cm-line': {
          padding: '0',
        },
        '.cm-gutters': {
          display: 'none',
        },
        '.cm-focused': {
          outline: `2px solid ${getColor('border-selected')}`,
          outlineOffset: '-2px',
        },
        '&.cm-focused .cm-cursor': {
          borderLeftColor: getColor('text-strong'),
          borderLeftWidth: '2px',
        },
        '&.cm-focused .cm-selectionBackground, ::selection': {
          backgroundColor: isDark
            ? 'rgba(0, 255, 135, 0.2)'
            : 'rgba(0, 125, 96, 0.2)',
        },
        '.cm-selectionBackground': {
          backgroundColor: isDark
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
        },
      },
      { dark: isDark },
    );

    // Create HPE syntax highlighting style using exact prism theme colors
    const hpeSyntaxHighlighting = HighlightStyle.define([
      // Comments
      {
        tag: tags.comment,
        color: hpePrismTheme.comment?.color,
        fontStyle: 'italic',
      },
      // Keywords (import, export, const, let, var, function, etc.)
      {
        tag: [
          tags.keyword,
          tags.controlKeyword,
          tags.definitionKeyword,
          tags.modifier,
          tags.moduleKeyword,
        ],
        color: hpePrismTheme.keyword?.color,
        fontWeight: '500',
      },
      // Strings
      {
        tag: [tags.string, tags.special(tags.string)],
        color: hpePrismTheme.string?.color,
      },
      // Numbers
      {
        tag: [tags.number, tags.literal],
        color: hpePrismTheme.number?.color,
      },
      // Component names and functions
      {
        tag: [
          tags.variableName,
          tags.function(tags.variableName),
          tags.definition(tags.variableName),
        ],
        color: hpePrismTheme['maybe-class-name']?.color,
      },
      // JSX Tags
      {
        tag: [tags.tagName],
        color: hpePrismTheme.keyword?.color,
        fontWeight: '500',
      },
      // Attributes
      {
        tag: [tags.attributeName, tags.propertyName],
        color: hpePrismTheme['attr-name']?.color,
      },
      // Operators
      {
        tag: [tags.operator],
        color: hpePrismTheme.operator?.color,
      },
      // Punctuation
      {
        tag: [tags.punctuation, tags.separator, tags.bracket],
        color:
          hpePrismTheme['code[class*="language-"]']?.color ||
          getColor('text-default'),
      },
      // Boolean values
      {
        tag: [tags.bool],
        color: hpePrismTheme.boolean?.color,
      },
    ]);

    // Create editor state
    const state = EditorState.create({
      doc: code,
      extensions: [
        EditorView.editable.of(true),
        hpeTheme,
        syntaxHighlighting(hpeSyntaxHighlighting),
        keymap.of([...defaultKeymap, indentWithTab]),
        javascript({ jsx: true }),
        EditorView.updateListener.of(update => {
          if (update.docChanged && onChangeRef.current) {
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
      if (viewRef.current) {
        viewRef.current.destroy();
        viewRef.current = null;
      }
    };
  }, [isDark]); // Only recreate when theme mode changes

  // Handle external code changes
  useEffect(() => {
    if (viewRef.current && viewRef.current.state.doc.toString() !== code) {
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
