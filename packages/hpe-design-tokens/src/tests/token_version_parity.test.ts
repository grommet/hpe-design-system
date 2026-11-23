// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import fs from 'fs';
import { describe, expect, it } from 'vitest';
import { getThemeFiles } from '../utils.js';

const themeFiles = getThemeFiles();

function collectTokenTypes(node: unknown, path = ''): Record<string, unknown> {
  if (!node || typeof node !== 'object' || Array.isArray(node)) {
    throw new Error(`Invalid token group at ${path || '<root>'}`);
  }

  if ('$value' in node) {
    if (!('$type' in node) || typeof node.$type !== 'string') {
      throw new Error(`Missing token $type at ${path}`);
    }

    return { [path]: node.$type };
  }

  return Object.fromEntries(
    Object.entries(node)
      .filter(([key]) => !key.startsWith('$'))
      .flatMap(([key, value]) =>
        Object.entries(collectTokenTypes(value, path ? `${path}.${key}` : key)),
      ),
  );
}

function readTokenTypes(file: string) {
  const tree: unknown = JSON.parse(fs.readFileSync(file, 'utf8'));
  return collectTokenTypes(tree);
}

describe.each(['v0', 'v1'])('%s token version parity', version => {
  const versionFiles = new Map(
    themeFiles[version].map(file => [
      file.replace(`.${version}-`, '.').replace(`.${version}.`, '.default.'),
      file,
    ]),
  );

  it('has the same collections and modes as default', () => {
    expect([...versionFiles.keys()].sort()).toEqual(
      [...themeFiles.default].sort(),
    );
  });

  it.each(themeFiles.default)(
    'matches token leaf paths and types in %s',
    defaultFile => {
      const versionFile = versionFiles.get(defaultFile);
      if (!versionFile) {
        throw new Error(`Missing ${version} equivalent of ${defaultFile}`);
      }

      expect(
        readTokenTypes(versionFile),
        `${versionFile} must match token paths and types in ${defaultFile}`,
      ).toEqual(readTokenTypes(defaultFile));
    },
  );
});

type FigmaMetadata = {
  description?: string;
  hiddenFromPublishing?: boolean;
  scopes?: string[];
  codeSyntax?: Record<string, string>;
};

function collectFigmaMetadata(
  node: unknown,
  path = '',
): Record<string, FigmaMetadata> {
  if (!node || typeof node !== 'object' || Array.isArray(node)) {
    return {};
  }

  if ('$value' in node) {
    const token = node as {
      $description?: string;
      $extensions?: { 'com.figma'?: FigmaMetadata };
    };
    const figma = token.$extensions?.['com.figma'];

    return {
      [path]: {
        description: token.$description,
        hiddenFromPublishing: figma?.hiddenFromPublishing,
        scopes: figma?.scopes && [...figma.scopes].sort(),
        codeSyntax: figma?.codeSyntax,
      },
    };
  }

  return Object.fromEntries(
    Object.entries(node)
      .filter(([key]) => !key.startsWith('$'))
      .flatMap(([key, value]) =>
        Object.entries(
          collectFigmaMetadata(value, path ? `${path}.${key}` : key),
        ),
      ),
  );
}

function readFigmaMetadata(file: string) {
  const tree: unknown = JSON.parse(fs.readFileSync(file, 'utf8'));
  return collectFigmaMetadata(tree);
}

// Figma stores a variable's description, scopes, code syntax and publishing
// flag once, not per mode. Mode files that disagree are rewritten on every
// sync, so the last file read wins and a repeat sync is never a no-op.
const filesByCollection = [...new Set(Object.values(themeFiles).flat())]
  .sort()
  .reduce<Record<string, string[]>>((collections, file) => {
    const [collection] = (file.split('/').pop() ?? file).split('.');
    return {
      ...collections,
      [collection]: [...(collections[collection] ?? []), file],
    };
  }, {});

describe.each(
  Object.entries(filesByCollection).filter(([, files]) => files.length > 1),
)('%s Figma variable metadata', (_collection, files) => {
  const [referenceFile, ...modeFiles] = files;

  it.each(modeFiles)(`matches ${referenceFile} in %s`, modeFile => {
    expect(
      readFigmaMetadata(modeFile),
      `${modeFile} must carry the same description, scopes, code syntax ` +
        `and publishing flag as ${referenceFile}`,
    ).toEqual(readFigmaMetadata(referenceFile));
  });
});
