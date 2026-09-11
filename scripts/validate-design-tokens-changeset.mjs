// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const tokenPackagePath = 'packages/hpe-design-tokens';
const tokenPackageJsonPath = `${tokenPackagePath}/package.json`;
const tokenChangelogPath = `${tokenPackagePath}/CHANGELOG.md`;

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
const mergeBase = execFileSync('git', ['merge-base', base, head], {
  encoding: 'utf8',
})
  .trim();

const tokenValuesContractsOrMetadataChanged = changedFiles.some(file =>
  new RegExp(`^${tokenPackagePath}/(tokens|contracts)/`).test(file) ||
  file === `${tokenPackagePath}/package.json`,
);
const implementationFiles = changedFiles.filter(
  file =>
    file.startsWith(`${tokenPackagePath}/src/`) &&
    !file.startsWith(`${tokenPackagePath}/src/tests/`),
);
const dependencyGraphChanged = changedFiles.some(file =>
  ['package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml'].includes(file),
);

const readJsonAtRevision = (revision, file) =>
  JSON.parse(
    execFileSync('git', ['show', `${revision}:${file}`], {
      cwd: repoRoot,
      encoding: 'utf8',
    }),
  );

const changesetNamesTokenPackage = contents =>
  /(?:^|\n)\s*["']?hpe-design-tokens["']?\s*:/.test(contents);

const getDeletedTokenChangesets = () =>
  execFileSync('git', ['diff', '--name-status', `${mergeBase}...${head}`], {
    cwd: repoRoot,
    encoding: 'utf8',
  })
    .trim()
    .split('\n')
    .filter(Boolean)
    .map(line => line.split('\t'))
    .filter(([status, file]) =>
      status === 'D' && /^\.changeset\/[^/]+\.md$/.test(file),
    )
    .filter(([, file]) =>
      changesetNamesTokenPackage(
        execFileSync('git', ['show', `${mergeBase}:${file}`], {
          cwd: repoRoot,
          encoding: 'utf8',
        }),
      ),
    )
    .map(([, file]) => file);

const isChangesetsVersionUpdate = () => {
  if (
    !changedFiles.includes(tokenPackageJsonPath) ||
    !changedFiles.includes(tokenChangelogPath)
  ) {
    return false;
  }

  const deletedTokenChangesets = getDeletedTokenChangesets();
  const allowedFiles = new Set([
    tokenPackageJsonPath,
    tokenChangelogPath,
    ...deletedTokenChangesets,
  ]);
  const onlyReleaseFilesChanged = changedFiles.every(file =>
    allowedFiles.has(file),
  );
  if (!onlyReleaseFilesChanged) {
    return false;
  }

  const basePackageJson = readJsonAtRevision(mergeBase, tokenPackageJsonPath);
  const headPackageJson = readJsonAtRevision(head, tokenPackageJsonPath);
  const { version: baseVersion, ...basePackageMetadata } = basePackageJson;
  const { version: headVersion, ...headPackageMetadata } = headPackageJson;

  return (
    deletedTokenChangesets.length > 0 &&
    baseVersion !== headVersion &&
    JSON.stringify(basePackageMetadata) === JSON.stringify(headPackageMetadata)
  );
};
const changesetsVersionUpdate = isChangesetsVersionUpdate();

const compareDirectories = (leftDirectory, rightDirectory) => {
  const differences = [];
  const compareDirectory = relativePath => {
    const leftPath = path.join(leftDirectory, relativePath);
    const rightPath = path.join(rightDirectory, relativePath);
    const leftEntries = fs.existsSync(leftPath)
      ? fs.readdirSync(leftPath, { withFileTypes: true })
      : [];
    const rightEntries = fs.existsSync(rightPath)
      ? fs.readdirSync(rightPath, { withFileTypes: true })
      : [];
    const names = new Set([
      ...leftEntries.map(entry => entry.name),
      ...rightEntries.map(entry => entry.name),
    ]);

    names.forEach(name => {
      const childRelativePath = path.join(relativePath, name);
      const leftEntry = leftEntries.find(entry => entry.name === name);
      const rightEntry = rightEntries.find(entry => entry.name === name);

      if (
        !leftEntry ||
        !rightEntry ||
        leftEntry.isDirectory() !== rightEntry.isDirectory()
      ) {
        differences.push(childRelativePath);
      } else if (leftEntry.isDirectory()) {
        compareDirectory(childRelativePath);
      } else if (
        !fs.readFileSync(path.join(leftDirectory, childRelativePath)).equals(
          fs.readFileSync(path.join(rightDirectory, childRelativePath)),
        )
      ) {
        differences.push(childRelativePath);
      }
    });
  };

  compareDirectory('');
  return differences.sort();
};

const formatBuildFailure = (revision, error) => {
  const output = [error.stdout, error.stderr]
    .filter(Boolean)
    .map(value => value.toString().trim())
    .filter(Boolean)
    .join('\n');
  const exitCode = error.status ?? 'unknown';

  return [
    `Unable to build hpe-design-tokens at ${revision} (exit code ${exitCode}).`,
    output || error.message,
  ].join('\n');
};

const buildPublishedArtifacts = (worktreePath, revision) => {
  execFileSync('git', ['worktree', 'add', '--detach', worktreePath, revision], {
    cwd: repoRoot,
    stdio: 'pipe',
  });
  try {
    execFileSync('pnpm', ['install', '--frozen-lockfile', '--ignore-scripts'], {
      cwd: worktreePath,
      stdio: 'pipe',
    });
    execFileSync('pnpm', ['--filter', 'hpe-design-tokens', 'build'], {
      cwd: worktreePath,
      stdio: 'pipe',
    });
  } catch (error) {
    throw new Error(formatBuildFailure(revision, error));
  }
};

const generatedArtifactsDiffer = () => {
  const temporaryRoot = fs.mkdtempSync(
    path.join(os.tmpdir(), 'hpe-design-tokens-changeset-'),
  );
  const baseWorktreePath = path.join(temporaryRoot, 'base');
  const headWorktreePath = path.join(temporaryRoot, 'head');

  try {
    buildPublishedArtifacts(baseWorktreePath, mergeBase);
    buildPublishedArtifacts(headWorktreePath, head);
    return compareDirectories(
      path.join(baseWorktreePath, tokenPackagePath, 'dist'),
      path.join(headWorktreePath, tokenPackagePath, 'dist'),
    );
  } finally {
    [baseWorktreePath, headWorktreePath].forEach(worktreePath => {
      if (fs.existsSync(worktreePath)) {
        execFileSync('git', ['worktree', 'remove', '--force', worktreePath], {
          cwd: repoRoot,
          stdio: 'pipe',
        });
      }
    });
    fs.rmSync(temporaryRoot, { recursive: true, force: true });
  }
};

if (
  !tokenValuesContractsOrMetadataChanged &&
  implementationFiles.length === 0 &&
  !dependencyGraphChanged
) {
  console.log(
    'No token values, contracts, package metadata, or output-changing '
      + 'implementation or dependency changes require a Changeset.',
  );
  process.exit(0);
}

if (changesetsVersionUpdate) {
  console.log(
    'Changesets-generated hpe-design-tokens version and changelog update; '
      + 'no additional Changeset required.',
  );
  process.exit(0);
}

let changedArtifacts = [];
if (!tokenValuesContractsOrMetadataChanged) {
  try {
    changedArtifacts = generatedArtifactsDiffer();
  } catch (error) {
    console.error('Unable to compare generated hpe-design-tokens artifacts.');
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }

  if (changedArtifacts.length === 0) {
    console.log(
      'Implementation changes do not alter published hpe-design-tokens '
        + 'artifacts; no Changeset required.',
    );
    process.exit(0);
  }
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
    'Published hpe-design-tokens changes require a Changeset naming '
      + 'hpe-design-tokens.',
  );
  if (tokenValuesContractsOrMetadataChanged) {
    console.error('Changed token values, contracts, or package metadata:');
    changedFiles
      .filter(file =>
        new RegExp(`^${tokenPackagePath}/(tokens|contracts)/`).test(file) ||
        file === `${tokenPackagePath}/package.json`,
      )
      .forEach(file => console.error(`  - ${file}`));
  } else {
    console.error('Changed published artifacts:');
    changedArtifacts.forEach(file => console.error(`  - dist/${file}`));
  }
  process.exit(1);
}

console.log(`Changeset found for hpe-design-tokens: ${tokenChangeset}`);
