import nextPlugin from '@next/eslint-plugin-next';
import { defineConfig } from 'eslint/config';
import { createTypeScriptConfig } from './typescript.mjs';
import { createReactViteConfig } from './react-vite.mjs';

const defaultFiles = ['**/*.{js,jsx,ts,tsx,mjs,cjs}'];

export const createNextConfig = ({ files = defaultFiles } = {}) =>
  defineConfig([
    ...createTypeScriptConfig({ files }),
    ...createReactViteConfig({ files }),
    {
      files,
      plugins: {
        '@next/next': nextPlugin,
      },
      rules: {
        ...nextPlugin.configs.recommended.rules,
      },
    },
  ]);
