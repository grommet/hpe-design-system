import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';
import { sharedBaseRules } from '../../eslint.shared.mjs';


export default defineConfig(
  { ignores: ['dist', 'eslint.config.mjs'] },
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactRefresh.configs.vite(),
  reactHooks.configs.flat.recommended,
  {
    settings: {
      react: { version: 'detect' },
    },
  },
  {
    name: "base-rules",
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.browser },
    },
  },
  {
    name: "override-rules",
    rules: {
      ...sharedBaseRules,
      'react/jsx-no-target-blank': 'off',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/purity': 'off',
      'react-hooks/use-memo': 'off',
    },
  },
);
