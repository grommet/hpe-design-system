// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const configPath = '.changeset/config.json';
const originalConfig = readFileSync(configPath, 'utf8');
const config = JSON.parse(originalConfig);

config.ignore = [
  ...new Set([
    ...config.ignore,
    'design-tokens-manager',
    'docs',
    '@hpe-design/code-connect',
    'hpe-design-system-codemods',
    '@hpe-design/icons-svg',
    '@shared/hooks',
    '@shared/aries-core',
    'grommet-app',
    'native-web',
    'tailwind-app',
    '@hpe-design/icons-grommet',
    '@hpe-design/knowledge-agent',
  ]),
];

try {
  writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`);
  execFileSync('pnpm', ['exec', 'changeset', 'version'], { stdio: 'inherit' });
} finally {
  writeFileSync(configPath, originalConfig);
}
