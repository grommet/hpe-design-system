import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

const defaultFiles = ['**/*.{js,jsx,mjs,cjs}'];

export const createReactViteConfig = ({ files = defaultFiles } = {}) =>
  defineConfig([
    {
      files,
      extends: [
        js.configs.recommended,
        react.configs.flat.recommended,
        react.configs.flat['jsx-runtime'],
      ],
      plugins: {
        'react-hooks': reactHooks,
        'react-refresh': reactRefresh,
      },
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        globals: globals.browser,
      },
      settings: {
        react: {
          version: '18.2',
        },
      },
      rules: {
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-no-target-blank': 'off',
        'react-refresh/only-export-components': [
          'warn',
          { allowConstantExport: true },
        ],
      },
    },
  ]);
