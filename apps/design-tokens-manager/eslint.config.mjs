import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';

export default defineConfig(
  { ignores: ['dist', 'eslint.config.mjs'] },
  js.configs.recommended,
  reactRefresh.configs.vite(),
  reactHooks.configs.flat.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx,mts,cts}'],
    languageOptions: {
      sourceType: 'module',
      parser: tseslint.parser,
      globals: { ...globals.browser },
    },
  },
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    extends: [tseslint.configs.recommended],
  },
  {
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
);
