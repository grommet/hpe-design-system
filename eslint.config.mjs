import { defineConfig } from 'eslint/config';
import babelParser from '@babel/eslint-parser';
import react from 'eslint-plugin-react';
import jsx from 'eslint-plugin-jsx';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';
import { fixupPluginRules } from '@eslint/compat';
import globals from 'globals';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'url';
import path from 'path';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    ignores: [
      'eslint.config.mjs',
      '**/dist/',
      '**/.next/',
      '**/out/',
      '**/.cache/',
      '**/public/',
      '**/babel.config.js',
      'apps/docs/src/data/search',
    ],
  },
  {
    languageOptions: {
      parser: babelParser,

      parserOptions: {
        requireConfigFile: false,

        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },

      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },

    extends: compat.extends(
      'airbnb',
      'plugin:jsx-a11y/recommended',
      'plugin:grommet/recommended',
      'prettier',
    ),

    plugins: {
      react,
      jsx,
      'jsx-a11y': jsxA11Y,
      'react-hooks': fixupPluginRules(reactHooks),
      prettier,
    },

    rules: {
      semi: [2, 'always'],
      indent: 'off',
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always'],
      'no-console': 0,
      'no-useless-concat': 0,

      'max-len': [
        2,
        {
          ignoreUrls: true,
          ignoreRegExpLiterals: true,
        },
      ],

      'jsx-a11y/href-no-hash': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'react/jsx-indent': 0,
      'react/jsx-wrap-multilines': 0,
      'react/jsx-filename-extension': 0,
      'implicit-arrow-linebreak': 0,
      'import/no-named-as-default': 0,
      'import/newline-after-import': 1,
      'react/no-unescaped-entities': 0,
      'react/jsx-first-prop-new-line': [1, 'multiline'],
      'import/prefer-default-export': 0,
      'class-methods-use-this': 0,
      'operator-linebreak': 0,
      'react/require-default-props': 0,
      'react/react-in-jsx-scope': 0,
      'react/no-danger': 0,
      'react/prefer-stateless-function': 0,
      'react/no-array-index-key': 0,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-return-assign': 0,
      'react/destructuring-assignment': 0,
      'react/forbid-prop-types': 0,
      'react/jsx-one-expression-per-line': 0,
      'react/static-property-placement': 0,
      'react/jsx-props-no-spreading': 0,
      'react/function-component-definition': 0,
      'react/no-unstable-nested-components': 0,
      'prefer-regex-literals': 0,
      'import/no-extraneous-dependencies': 0,
      'import/no-cycle': 0,
      'global-require': 0,
      'import/no-dynamic-require': 0,

      quotes: [
        2,
        'single',
        {
          avoidEscape: true,
        },
      ],

      'arrow-body-style': 0,
    },
  },
  // TypeScript recommended rules — scoped to TS files only
  // {
  //   files: ['**/*.{ts,tsx,mts,cts}'],
  //   extends: tseslint.configs.recommended,
  // },
  // {
  //   files: ['**/*.{ts,tsx,mts,cts}'],
  //   rules: {
  //     'import/no-unresolved': 'off',
  //     'import/extensions': 'off',
  //   },
  // },
]);
