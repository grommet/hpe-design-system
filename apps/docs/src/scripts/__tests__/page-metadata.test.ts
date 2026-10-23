// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
// @vitest-environment node
import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { buildPageMetadata, contentFingerprint } from '../page-metadata.mjs';

let fixture: string;
let repository: string;
let pages: string;

const git = (args: string[], env = process.env) =>
  execFileSync('git', args, {
    cwd: repository,
    encoding: 'utf8',
    env,
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();

const commit = (date: string) => {
  git(['add', '.']);
  git(['commit', '-qm', 'Update fixture'], {
    ...process.env,
    GIT_AUTHOR_DATE: date,
    GIT_COMMITTER_DATE: date,
  });
};

beforeEach(async () => {
  fixture = await mkdtemp(resolve(tmpdir(), 'docs-page-metadata-'));
  repository = resolve(fixture, 'repository');
  pages = resolve(repository, 'src/pages');
  await mkdir(resolve(pages, 'components/card'), { recursive: true });
  await Promise.all(
    [
      'index.mdx',
      'whats-new.mdx',
      'components/button.mdx',
      'components/card/index.mdx',
      'components/index.js',
      '_app.js',
    ].map(file => writeFile(resolve(pages, file), `Content of ${file}\n`)),
  );
  git(['init', '-q', '--initial-branch=main']);
  git(['config', 'user.name', 'Docs Test']);
  git(['config', 'user.email', 'docs-test@example.com']);
  commit('2024-01-01T12:00:00Z');
});

afterEach(async () => {
  await rm(fixture, { recursive: true, force: true });
});

describe('MDX page modification metadata', () => {
  it('maps MDX routes, including nested and root index pages', async () => {
    expect(await buildPageMetadata(pages)).toEqual({
      '/': '2024-01-01T12:00:00.000Z',
      '/whats-new': '2024-01-01T12:00:00.000Z',
      '/components/button': '2024-01-01T12:00:00.000Z',
      '/components/card': '2024-01-01T12:00:00.000Z',
    });
  });

  it('ignores unrelated commits and uncommitted edits', async () => {
    await writeFile(resolve(pages, 'components/button.mdx'), 'Updated button');
    commit('2024-02-01T23:30:00-05:00');
    await writeFile(resolve(repository, 'example.js'), 'Updated example');
    commit('2024-03-01T12:00:00Z');
    await writeFile(resolve(pages, 'components/button.mdx'), 'Local edit');

    const metadata = await buildPageMetadata(pages);
    expect(metadata['/components/button']).toBe('2024-02-02T04:30:00.000Z');
    expect(metadata['/components/card']).toBe('2024-01-01T12:00:00.000Z');
  });

  it('handles renamed MDX pages', async () => {
    await rename(
      resolve(pages, 'components/button.mdx'),
      resolve(pages, 'components/action.mdx'),
    );
    commit('2024-02-01T12:00:00Z');

    const metadata = await buildPageMetadata(pages);
    expect(metadata['/components/action']).toBe('2024-01-01T12:00:00.000Z');
    expect(metadata).not.toHaveProperty('/components/button');
  });

  it('reports pages without commit history', async () => {
    await writeFile(resolve(pages, 'new.mdx'), 'New page');
    await expect(buildPageMetadata(pages)).rejects.toThrow(
      'Commit new MDX pages before building',
    );
  });

  it('skips maintenance across a move', async () => {
    const oldPath = resolve(pages, 'components/button.mdx');
    const unchanged =
      'Guidance that remains unchanged during the move. '.repeat(10);
    await writeFile(
      oldPath,
      [
        "import { Example } from '../examples';",
        '',
        '# Button',
        '',
        'Use a clear label.',
        unchanged,
        '',
        '<Example code="/old/source.js" height="small"',
        '  bestPractice={{ message: "Use clear labels." }} />',
      ].join('\n'),
    );
    commit('2024-02-01T12:00:00Z');
    const movedPath = resolve(pages, 'components/action.mdx');
    await rename(oldPath, movedPath);
    await writeFile(
      movedPath,
      [
        "import { Example } from '../../examples';",
        '',
        '{/* Repository maintenance */}',
        '# Button',
        '',
        'Use a clear',
        'label.',
        unchanged,
        '',
        '<Example code="/new/source.js" height="xsmall"',
        '  bestPractice={{ message: "Use clear labels." }} />',
      ].join('\n'),
    );
    commit('2024-03-01T12:00:00Z');
    expect((await buildPageMetadata(pages))['/components/action']).toBe(
      '2024-02-01T12:00:00.000Z',
    );
  });

  it('still counts content edits made in a renamed file', async () => {
    const movedPath = resolve(pages, 'components/action.mdx');
    await rename(resolve(pages, 'components/button.mdx'), movedPath);
    await writeFile(movedPath, 'Revised guidance for the renamed page.');
    commit('2024-02-01T12:00:00Z');
    expect((await buildPageMetadata(pages))['/components/action']).toBe(
      '2024-02-01T12:00:00.000Z',
    );
  });

  it('rejects shallow history with actionable instructions', async () => {
    const shallow = resolve(fixture, 'shallow');
    git([
      'clone',
      '--quiet',
      '--depth',
      '1',
      pathToFileURL(repository).href,
      shallow,
    ]);
    await expect(
      buildPageMetadata(resolve(shallow, 'src/pages')),
    ).rejects.toThrow('git fetch --unshallow');
  });

  describe('reader-facing MDX content fingerprint', () => {
    it.each([
      ['# Before', '# After'],
      ['- First item', '- Revised item'],
      ['| Name |\n| --- |\n| Old |', '| Name |\n| --- |\n| New |'],
      ['[Read more](/old)', '[Read more](/new)'],
      ['<img alt="Old description" />', '<img alt="New description" />'],
      ['<Tip message="Old advice" />', '<Tip message="New advice" />'],
      [
        '<Example bestPractice={{message: "Old advice"}} />',
        '<Example bestPractice={{message: "New advice"}} />',
      ],
      ['<Tip message={"Old advice"} />', '<Tip message={"New advice"} />'],
      ['```js\nconst x = 1;\n```', '```js\nconst x = 2;\n```'],
      ['Text {someValue}', 'Text {anotherValue}'],
    ])('detects reader-facing changes: %s', (before, after) => {
      expect(contentFingerprint(before)).not.toBe(contentFingerprint(after));
    });

    it.each([
      ['A line of text.', 'A line\nof text.'],
      ['# Title\n\nText', '# Title\n\n\nText\n'],
      ['Text', '{/* Editorial comment */}\n\nText'],
      ['Text', "Text\n\n{' '}\n"],
      [
        "import { Old } from './old';\n\nText",
        "import { New } from './new';\n\nText",
      ],
      [
        '<Example code="/old" height="small">Guidance</Example>',
        '<Example code="/new" height="large">Guidance</Example>',
      ],
      [
        '<Tip message={"Keep this advice"} />',
        "<Tip message={ 'Keep this advice' } />",
      ],
      [
        '<Example bestPractice={{message: "Advice", height: "small"}} />',
        '<Example bestPractice={{message: "Advice", height: "large"}} />',
      ],
    ])('ignores maintenance-only changes: %s', (before, after) => {
      expect(contentFingerprint(before)).toBe(contentFingerprint(after));
    });

    it('does not silently accept invalid MDX', () => {
      expect(() => contentFingerprint('<Example value={')).toThrow();
    });
  });
});
