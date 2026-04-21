import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import { sharedBaseRules } from '../../eslint.shared.mjs';

export default defineConfig(
    { ignores: ['dist', 'eslint.config.mjs'] },
    js.configs.recommended,
    reactHooks.configs.flat.recommended,

    {
        name: 'base-rules',
        files: ['**/*.{js,jsx,ts,tsx}'],
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
        name: 'ts-rules',
        files: ['**/*.{ts,tsx}'],
        extends: [tseslint.configs.recommended],
    },
    {
        name: 'override-rules',
        rules: {
            ...sharedBaseRules,
            'react-hooks/immutability': 'off',
            'react-hooks/set-state-in-effect': 'off',
        },
    },
);
