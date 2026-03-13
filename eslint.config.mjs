// (C) Copyright 2026 Hewlett Packard Enterprise Development LP
import js from '@eslint/js';
import globals from 'globals';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Minimal shim so that legacy `eslint-disable import/no-unresolved` inline
// comments in source files don't cause "Definition for rule not found" errors.
// eslint-plugin-import was removed; this shim registers the namespace only.
const importPluginShim = { rules: { 'no-unresolved': { create: () => ({}) } } };

export default tseslint.config(
  // Global ignores (replaces root .eslintignore and apps/docs/.eslintignore)
  {
    ignores: [
      '**/dist/',
      '**/.next/',
      '**/out/',
      '**/.cache/',
      '**/public/',
      '**/babel.config.js',
      'apps/docs/src/data/search',
    ],
  },

  // Silence warnings for eslint-disable comments that reference removed rules
  // (e.g. max-len, no-alert, react/prop-types from the old airbnb config).
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off',
    },
  },

  // Base JS recommended rules — applied to all files
  js.configs.recommended,

  // Accessibility — full config spread (equivalent of plugin:jsx-a11y/recommended)
  jsxA11y.flatConfigs.recommended,

  // React, react-hooks and project-wide custom rules
  {
    files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      // Shim: keeps eslint-disable import/... comments from erroring
      import: importPluginShim,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // React 17+ new JSX transform — don't require React in scope
      'react/react-in-jsx-scope': 'off',
      // Keep tracking React as used so old `import React from 'react'` files
      // don't get flagged by no-unused-vars
      'react/jsx-uses-react': 'warn',
      // Mark JSX component variables as used — prevents no-unused-vars false
      // positives for imported components referenced only in JSX
      'react/jsx-uses-vars': 'error',
      // React hooks correctness
      ...reactHooks.configs['recommended-latest'].rules,
      'jsx-a11y/anchor-is-valid': 'off',
      'no-console': 'off',
      // Allow _ prefix to signal intentionally unused vars/args (destructuring
      // to omit, unused function params, etc.)
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },

  // TypeScript recommended rules — scoped to TS files only
  {
    files: ['**/*.{ts,tsx,mts,cts}'],
    extends: tseslint.configs.recommended,
  },

  // Grommet plugin via FlatCompat (legacy eslintrc wrapper)
  ...compat.extends('plugin:grommet/recommended'),

  // Prettier last — disables all formatting rules that conflict with Prettier
  prettierConfig,
);
