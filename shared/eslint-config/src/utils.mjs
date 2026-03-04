import { globalIgnores } from 'eslint/config';

export const defaultIgnores = [
  '**/node_modules/**',
  '**/dist/**',
  '**/build/**',
  '**/.next/**',
  '**/out/**',
  '**/coverage/**',
  '**/.turbo/**',
  '**/.cache/**',
  '**/public/**',
  '**/package-lock.json',
  '**/babel.config.js',
  'apps/docs/src/data/search/**',
  'next-env.d.ts',
];

export const ignoredFolders = globalIgnores(defaultIgnores);
