import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

const defaultFiles = ['**/*.{ts,tsx,mts,cts}'];

export const createTypeScriptConfig = ({ files = defaultFiles } = {}) =>
  defineConfig([
    {
      files,
      extends: [js.configs.recommended, ...tseslint.configs.recommended],
    },
  ]);
