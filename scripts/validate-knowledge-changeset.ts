// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { isDeepStrictEqual, parseArgs } from 'node:util';
import { parse as parseYaml } from 'yaml';
import * as source from '../packages/knowledge-agent/src/source-knowledge.js';
import * as model from '../packages/knowledge-agent/src/knowledge.js';

const repoRoot = fileURLToPath(new URL('../', import.meta.url));
const packagePath = 'packages/knowledge-agent';
const manifestPath = `${packagePath}/package.json`;
const changelogPath = `${packagePath}/CHANGELOG.md`;
const packageName = '@hpe-design/knowledge-agent';
const selectedInstructions = new Set(
  source.instructionFileNames.map(
    name => `knowledge/core/instructions/standards/${name}`,
  ),
);

export function namesKnowledgePackage(contents: string): boolean {
  const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(contents);
  if (!frontmatter || !contents.slice(frontmatter[0].length).trim())
    return false;
  const data: unknown = parseYaml(frontmatter[1]);
  return (
    typeof data === 'object' &&
    data !== null &&
    packageName in data &&
    ['patch', 'minor', 'major'].includes(String(data[packageName]))
  );
}

function publishedMetadata(manifest: Record<string, unknown>) {
  const metadata = { ...manifest };
  delete metadata.devDependencies;
  delete metadata.scripts;
  return metadata;
}

function artifactFiles(directory: string): Map<string, Buffer> {
  const files = new Map<string, Buffer>();
  const dist = path.join(directory, 'dist');
  if (!fs.existsSync(dist)) throw new Error(`Build did not create ${dist}`);
  fs.readdirSync(dist, { recursive: true, encoding: 'utf8' }).forEach(entry => {
    const relative = entry.toString();
    const file = path.join(dist, relative);
    if (!fs.statSync(file).isFile()) return;
    let bytes = fs.readFileSync(file);
    if (relative === 'knowledge.json') {
      const snapshot: model.KnowledgeSnapshot = JSON.parse(
        bytes.toString('utf8'),
      );
      if (snapshot.contentDigest !== model.digestContent(snapshot.content)) {
        throw new Error('Built knowledge content digest does not match.');
      }
      // Revision links and their digest change even on unrelated commits.
      const sourceUrl = 'https://github.com/grommet/hpe-design-system/blob/';
      bytes = Buffer.from(
        JSON.stringify({
          schemaVersion: snapshot.schemaVersion,
          packageVersion: snapshot.packageVersion,
          content: {
            ...snapshot.content,
            instructions: snapshot.content.instructions.map(instruction => ({
              ...instruction,
              content: instruction.content.replaceAll(
                `${sourceUrl}${snapshot.sourceRevision}/`,
                `${sourceUrl}SOURCE_REVISION/`,
              ),
            })),
          },
        }),
      );
    }
    files.set(`dist/${relative.replaceAll(path.sep, '/')}`, bytes);
  });
  const bin = path.join(directory, 'bin/cli.js');
  if (fs.existsSync(bin)) files.set('bin/cli.js', fs.readFileSync(bin));
  const manifest = JSON.parse(
    fs.readFileSync(path.join(directory, 'package.json'), 'utf8'),
  );
  files.set(
    'package.json',
    Buffer.from(JSON.stringify(publishedMetadata(manifest))),
  );
  return files;
}

export function compareKnowledgeArtifacts(
  left: string,
  right: string,
): string[] {
  const before = artifactFiles(left);
  const after = artifactFiles(right);
  return [...new Set([...before.keys(), ...after.keys()])]
    .filter(file => {
      const a = before.get(file);
      const b = after.get(file);
      return !a || !b || !a.equals(b);
    })
    .sort();
}

function compareBuilds(root: string, base: string, head: string): string[] {
  const temporary = fs.mkdtempSync(
    path.join(os.tmpdir(), 'knowledge-changeset-'),
  );
  try {
    const directories = [base, head].map((revision, index) => {
      const checkout = path.join(temporary, String(index));
      execFileSync(
        'git',
        ['clone', '--quiet', '--shared', '--no-checkout', root, checkout],
        { stdio: 'pipe' },
      );
      execFileSync('git', ['checkout', '--quiet', '--detach', revision], {
        cwd: checkout,
        stdio: 'pipe',
      });
      try {
        execFileSync(
          'pnpm',
          ['install', '--frozen-lockfile', '--ignore-scripts'],
          { cwd: checkout, stdio: 'pipe', shell: process.platform === 'win32' },
        );
        execFileSync('pnpm', ['--dir', packagePath, 'build'], {
          cwd: checkout,
          stdio: 'pipe',
          shell: process.platform === 'win32',
        });
      } catch (error) {
        const detail = error instanceof Error ? error.message : String(error);
        const output =
          error && typeof error === 'object' && 'stdout' in error
            ? String(error.stdout ?? '')
            : '';
        throw new Error(
          `Knowledge build failed at ${revision}: ${detail}\n${output}`,
          {
            cause: error,
          },
        );
      }
      return path.join(checkout, packagePath);
    });
    return compareKnowledgeArtifacts(directories[0], directories[1]);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
}

export function checkKnowledgeChangeset(options: {
  base: string;
  head?: string;
  root?: string;
}): string {
  const root = options.root ?? repoRoot;
  const git = (...args: string[]) =>
    execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
  const head = git(
    'rev-parse',
    '--verify',
    `${options.head ?? 'HEAD'}^{commit}`,
  );
  const base = git('merge-base', options.base, head);
  const changed = git('diff', '--name-only', '--no-renames', base, head)
    .split('\n')
    .filter(Boolean);
  const read = (revision: string, file: string) =>
    git('show', `${revision}:${file}`);
  const manifest = (revision: string): Record<string, unknown> =>
    JSON.parse(read(revision, manifestPath));
  const changesetFile = (file: string) =>
    /^\.changeset\/[^/]+\.md$/.test(file) && file !== '.changeset/README.md';

  const authored = changed.filter(
    file =>
      /^knowledge\/core\/data\/(components|patterns)\/[^/]+\.(json|ya?ml)$/.test(
        file,
      ) ||
      file === 'knowledge/core/data/types.ts' ||
      selectedInstructions.has(file) ||
      file === 'LICENSE',
  );
  const potential = changed.filter(
    file =>
      (file.startsWith(`${packagePath}/src/`) &&
        !/\.test\.[cm]?[jt]sx?$/.test(file)) ||
      file.startsWith(`${packagePath}/bin/`) ||
      file === `${packagePath}/scripts/build.ts` ||
      new RegExp(`^${packagePath}/tsconfig[^/]*\\.json$`).test(file) ||
      file === manifestPath ||
      file.startsWith('knowledge/core/data/examples/') ||
      [
        'package.json',
        'pnpm-lock.yaml',
        'pnpm-workspace.yaml',
        'scripts/validate-knowledge-schema.ts',
      ].includes(file),
  );
  if (!authored.length && !potential.length) {
    return 'No published knowledge-agent inputs changed.';
  }

  const addedOrModified = new Set(
    git(
      'diff',
      '--name-only',
      '--no-renames',
      '--diff-filter=AM',
      base,
      head,
    ).split('\n'),
  );
  if (
    changed
      .filter(changesetFile)
      .some(
        file =>
          addedOrModified.has(file) && namesKnowledgePackage(read(head, file)),
      )
  ) {
    return 'Changed Changeset includes @hpe-design/knowledge-agent.';
  }

  const headManifest = manifest(head);
  const baseHasManifest =
    git('ls-tree', '--name-only', base, '--', manifestPath) !== '';
  const baseManifest = baseHasManifest ? manifest(base) : undefined;
  const deleted = git(
    'diff',
    '--name-only',
    '--no-renames',
    '--diff-filter=D',
    base,
    head,
  )
    .split('\n')
    .filter(changesetFile);
  const consumed = deleted.filter(file =>
    namesKnowledgePackage(read(base, file)),
  );
  const releaseOnly = new Set([manifestPath, changelogPath, ...consumed]);
  if (
    baseManifest &&
    consumed.length &&
    changed.includes(manifestPath) &&
    changed.includes(changelogPath) &&
    changed.every(file => releaseOnly.has(file)) &&
    baseManifest.version !== headManifest.version &&
    isDeepStrictEqual(
      { ...baseManifest, version: headManifest.version },
      headManifest,
    )
  ) {
    return 'Version/changelog update consumes knowledge-agent Changesets.';
  }

  let differences = authored;
  if (!differences.length) {
    if (
      !baseManifest ||
      !baseManifest.scripts ||
      typeof baseManifest.scripts !== 'object' ||
      !('build' in baseManifest.scripts)
    ) {
      differences = potential;
    } else if (
      !isDeepStrictEqual(
        publishedMetadata(baseManifest),
        publishedMetadata(headManifest),
      )
    ) {
      differences = [manifestPath];
    } else {
      differences = compareBuilds(root, base, head);
    }
  }
  if (!differences.length) {
    return 'Normalized published knowledge-agent output is unchanged.';
  }
  throw new Error(
    'Add a new or updated Changeset naming @hpe-design/knowledge-agent ' +
      'with a patch, minor, or major release and a summary.\n' +
      `Changed inputs/output:\n${differences.join('\n')}`,
  );
}

if (
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url
) {
  try {
    const { values } = parseArgs({
      options: { base: { type: 'string' }, head: { type: 'string' } },
    });
    const base = values.base ?? process.env.GITHUB_BASE_SHA;
    if (!base)
      throw new Error('Provide --base=<commit> or set GITHUB_BASE_SHA.');
    console.log(
      checkKnowledgeChangeset({
        base,
        head: values.head ?? process.env.GITHUB_SHA ?? 'HEAD',
      }),
    );
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
