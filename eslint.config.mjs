import {
  createGlobalRules,
  createNextRules,
  createReactViteRules,
  createReactViteTsRules,
  createTypeScriptRules,
} from '@hpe/eslint-config';

export default [
  {
    linterOptions: {
      reportUnusedDisableDirectives: 'off', // this should be revisited since we have some unused disabled directives can we can clean up
    },
  },
  ...createGlobalRules({
    // need to revisit the folder patterns to ignore eventually
    ignorePatterns: [
      'apps/design-tokens-manager/**',
      'sandbox/grommet-app/**',
      'sandbox/tailwind-app/**',
      'packages/icons-grommet/**',
      'shared/hooks/**',
    ],
  }),
  ...createReactViteRules({
    files: [
      'sandbox/grommet-app/**/*.{js,jsx,mjs,cjs}',
      'sandbox/tailwind-app/**/*.{js,jsx,mjs,cjs}',
    ],
  }),
  ...createReactViteTsRules({
    files: [
      'apps/design-tokens-manager/**/*.{ts,tsx}',
      'packages/icons-grommet/**/*.{js,mjs,cjs,ts,jsx,tsx}',
    ],
  }),
  ...createTypeScriptRules({
    files: ['shared/hooks/**/*.{ts,tsx,mts,cts}'],
  }),
  // disabling for now due to
  // error  'React' is defined but never used  no-unused-vars
  // error  'React' is defined but never used  @typescript-eslint/no-unused-vars
  // and some other errors that we need to discuss as a team before enabling this config
  // ...createNextRules({
  //   files: ['apps/docs/**/*.{js,jsx,ts,tsx,mjs,cjs}'],
  // }),
];
