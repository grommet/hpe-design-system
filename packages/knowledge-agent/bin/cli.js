#!/usr/bin/env node
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const cliDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(cliDir, '..');
const args = process.argv.slice(2);

const result = spawnSync(
  process.execPath,
  ['--import', 'tsx', path.join(repoRoot, 'src', 'cli.ts'), ...args],
  {
    stdio: 'inherit',
    env: process.env,
  },
);

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 0);
