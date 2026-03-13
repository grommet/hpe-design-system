// (C) Copyright 2026 Hewlett Packard Enterprise Development LP
import baseConfig from '../../eslint.config.mjs';

export default [
  ...baseConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    // Story/demo files: disable rules that require accessibility
    // infrastructure (aria-describedby targets) not appropriate for
    // isolated Storybook examples.
    files: ['**/stories/**'],
    rules: {
      'grommet/datatable-aria-describedby': 'off',
    },
  },
];
