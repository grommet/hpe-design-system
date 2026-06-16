import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { reactRefresh } from 'eslint-plugin-react-refresh';
import reactHooks from 'eslint-plugin-react-hooks';
import storybook from 'eslint-plugin-storybook';
import { sharedBaseRules } from '../../eslint.shared.mjs';

export default defineConfig(
    { ignores: ['dist', 'eslint.config.mjs'] },
    js.configs.recommended,
    reactRefresh.configs.vite(),
    reactHooks.configs.flat.recommended,
    storybook.configs['flat/recommended'],
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
        name: "stories-rules",
        files: ['**/*.stories.{ts,tsx,js,jsx}'],
        rules: {
            'storybook/no-redundant-story-name': 'off',
        }
    },
    {
        name: "override-rules",
        rules: {
            ...sharedBaseRules,
            '@typescript-eslint/no-explicit-any': 'off',
            'react-hooks/immutability': 'off',
            'react-hooks/set-state-in-effect': 'off',
            'react-hooks/use-memo': 'off',
        },
    },
);