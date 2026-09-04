// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import process from 'node:process';

const getArgument = name =>
  process.argv
    .find(argument => argument.startsWith(`--${name}=`))
    ?.split('=')[1];
const base = getArgument('base') ?? process.env.GITHUB_BASE_SHA;
const head = getArgument('head') ?? process.env.GITHUB_SHA ?? 'HEAD';

if (!base) {
  console.error(
    'Provide --base=<commit> or set GITHUB_BASE_SHA before running this check.',
  );
  process.exit(1);
}

const changedFiles = execFileSync(
  'git',
  ['diff', '--name-only', `${base}...${head}`],
  {
    encoding: 'utf8',
  },
)
  .trim()
  .split('\n')
  .filter(Boolean);

const tokenSourceChanged = changedFiles.some(file =>
  /^packages\/hpe-design-tokens\/(tokens|src|contracts)\//.test(file),
);

if (!tokenSourceChanged) {
  console.log(
    'No hpe-design-tokens source, build, or contract changes require a Changeset.',
  );
  process.exit(0);
}

const changedChangesets = changedFiles.filter(
  file =>
    /^\.changeset\/[^/]+\.md$/.test(file) &&
    file !== '.changeset/README.md' &&
    fs.existsSync(file),
);
const tokenChangeset = changedChangesets.find(file =>
  /(?:^|\n)\s*["']?hpe-design-tokens["']?\s*:/.test(
    fs.readFileSync(file, 'utf8'),
  ),
);

if (!tokenChangeset) {
  console.error(
    'hpe-design-tokens source changes require a Changeset naming hpe-design-tokens.',
  );
  console.error('Changed source files:');
  changedFiles
    .filter(file =>
      /^packages\/hpe-design-tokens\/(tokens|src|contracts)\//.test(file),
    )
    .forEach(file => console.error(`  - ${file}`));
  process.exit(1);
}

console.log(`Changeset found for hpe-design-tokens: ${tokenChangeset}`);
