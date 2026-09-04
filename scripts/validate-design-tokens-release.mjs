// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageRoot = path.join(repoRoot, 'packages/hpe-design-tokens');
const packageJsonPath = path.join(packageRoot, 'package.json');
const changelogPath = path.join(packageRoot, 'CHANGELOG.md');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const changelog = fs.readFileSync(changelogPath, 'utf8');

const expectedVersion = process.argv.find((argument) => argument.startsWith('--version='))?.split('=')[1];
const requiredFiles = [
  'dist/esm/index.js',
  'dist/cjs/index.cjs',
  'dist/grommet/index.js',
  'dist/grommet/cjs/index.cjs',
  'dist/docs/index.js',
];
const requiredPublishedFiles = ['dist', 'CHANGELOG.md', 'LICENSE', 'README.md'];

const failures = [];

if (packageJson.name !== 'hpe-design-tokens') {
  failures.push(`Expected package name hpe-design-tokens, received ${packageJson.name}`);
}

if (!/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/.test(packageJson.version)) {
  failures.push(`Invalid package version: ${packageJson.version}`);
}

if (expectedVersion && packageJson.version !== expectedVersion) {
  failures.push(`Expected version ${expectedVersion}, received ${packageJson.version}`);
}

if (!changelog.includes(`## ${packageJson.version}`)) {
  failures.push(`CHANGELOG.md does not contain a heading for ${packageJson.version}`);
}

requiredFiles.forEach((relativePath) => {
  if (!fs.existsSync(path.join(packageRoot, relativePath))) {
    failures.push(`Missing generated package file: ${relativePath}`);
  }
});

const publishedFiles = packageJson.files ?? [];
requiredPublishedFiles.forEach((relativePath) => {
  if (!publishedFiles.includes(relativePath)) {
    failures.push(`package.json files allowlist must include ${relativePath}`);
  }
});

if (failures.length > 0) {
  console.error('Design tokens release validation failed:');
  failures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      package: packageJson.name,
      version: packageJson.version,
      requiredFiles,
      publishedFiles,
      status: 'valid',
    },
    null,
    2,
  ),
);