// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
const {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
} = require('node:fs');
const { tmpdir } = require('node:os');
const { basename, dirname, join, resolve } = require('node:path');
const { spawnSync } = require('node:child_process');

const packageDirectory = resolve(__dirname, '..');
const { name, version } = JSON.parse(
  readFileSync(join(packageDirectory, 'package.json'), 'utf8'),
);
const outputPath = join(packageDirectory, `${name}-${version}.vsix`);
const stagingDirectory = mkdtempSync(join(tmpdir(), `${name}-`));
const extensionDirectory = join(stagingDirectory, 'extension');
const sourceDirectory = join(packageDirectory, 'src');
const tokenIdeDirectory = resolve(
  packageDirectory,
  '..',
  'hpe-design-tokens',
  'dist',
  'ide',
);
const typescriptDirectory = dirname(require.resolve('typescript/package.json'));

try {
  mkdirSync(join(extensionDirectory, 'src'), { recursive: true });
  ['package.json', 'README.md'].forEach(file => {
    cpSync(join(packageDirectory, file), join(extensionDirectory, file));
  });
  readdirSync(sourceDirectory)
    .filter(file => file.endsWith('.js') && !file.endsWith('.test.js'))
    .forEach(file => {
      cpSync(
        join(sourceDirectory, file),
        join(extensionDirectory, 'src', file),
      );
    });
  cpSync(
    typescriptDirectory,
    join(extensionDirectory, 'node_modules', 'typescript'),
    { recursive: true },
  );
  cpSync(tokenIdeDirectory, join(extensionDirectory, 'tokens'), {
    recursive: true,
  });

  const result = spawnSync('zip', ['-qr', outputPath, 'extension'], {
    cwd: stagingDirectory,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`zip exited with status ${result.status}`);
  }

  console.log(`Created ${basename(outputPath)}`);
} finally {
  rmSync(stagingDirectory, { force: true, recursive: true });
}
