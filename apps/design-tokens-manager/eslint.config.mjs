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
    name: "base-rules",
    files: ['**/*.{js,jsx,ts,tsx,mts,cts}'],
    languageOptions: {
      sourceType: 'module',
      parser: tseslint.parser,
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.browser },
    },
  },
  {
    name: "ts-rules",
    files: ['**/*.{ts,tsx,mts,cts}'],
    extends: [tseslint.configs.recommended],
  },
  {
    name: "override-rules",
    rules: {
      'react-hooks/set-state-in-effect': 'off',
    },
  },
);
