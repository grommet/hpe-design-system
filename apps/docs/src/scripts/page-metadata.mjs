// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { execFileSync } from 'node:child_process';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import remarkGfm from 'remark-gfm';

const sourceDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const parser = unified().use(remarkParse).use(remarkMdx).use(remarkGfm);
const contentAttributes = new Set([
  'alt',
  'caption',
  'description',
  'heading',
  'href',
  'label',
  'message',
  'placeholder',
  'summary',
  'text',
  'title',
  'value',
  'a11yTitle',
  'aria-label',
]);

const normalizeText = value => value.replace(/\s+/g, ' ').trim();

const expressionContent = node => {
  if (!node || typeof node !== 'object') return [];
  if (node.type === 'Property') {
    const key = node.key.name || node.key.value;
    return contentAttributes.has(key)
      ? [[key, node.value]]
      : expressionContent(node.value);
  }
  return Object.values(node).flatMap(value =>
    Array.isArray(value)
      ? value.flatMap(expressionContent)
      : expressionContent(value),
  );
};

const withoutPositions = value => {
  if (Array.isArray(value)) return value.map(withoutPositions);
  if (!value || typeof value !== 'object') return value;
  return Object.fromEntries(
    Object.entries(value)
      .filter(
        ([key]) =>
          ![
            'position',
            'start',
            'end',
            'loc',
            'range',
            'raw',
            'comments',
          ].includes(key),
      )
      .map(([key, child]) => [key, withoutPositions(child)]),
  );
};

const contentNodes = node => {
  if (node.type === 'mdxjsEsm' || node.type === 'html') return [];
  const children = (node.children || []).flatMap(contentNodes);
  if (node.type.startsWith('mdxJsx')) {
    const attributes = (node.attributes || []).flatMap(attribute => {
      const { value } = attribute;
      if (contentAttributes.has(attribute.name)) {
        return [
          [
            attribute.name,
            typeof value === 'string'
              ? normalizeText(value)
              : withoutPositions(value?.data?.estree),
          ],
        ];
      }
      return expressionContent(value?.data?.estree).map(withoutPositions);
    });
    // Presentation-only JSX wrappers do not affect the content fingerprint.
    return [...attributes, ...children];
  }
  if (node.type.startsWith('mdx')) {
    const expression = node.data?.estree;
    if (!expression?.body?.length) return [];
    const value = expression.body[0]?.expression;
    if (
      value?.type === 'Literal' &&
      typeof value.value === 'string' &&
      !value.value.trim()
    )
      return [];
    return [['expression', withoutPositions(expression)]];
  }
  if (node.type === 'paragraph' && !children.length) return [];
  if (node.type === 'text' && !normalizeText(node.value)) return [];
  const properties = withoutPositions(
    Object.fromEntries(
      Object.entries(node).filter(
        ([key]) => !['children', 'data', 'position'].includes(key),
      ),
    ),
  );
  if (node.type === 'text') properties.value = normalizeText(node.value);
  return [[properties, children]];
};

export const contentFingerprint = source =>
  JSON.stringify(contentNodes(parser.parse(source)));

const getContentDate = (git, file) => {
  const history = git([
    'log',
    '--follow',
    '--format=commit:%H%x09%cI',
    '--name-status',
    '--',
    file,
  ]);
  const revisions = history.split('commit:').filter(Boolean);
  let previous;
  let contentDate;

  revisions.some(revision => {
    const [header, ...changes] = revision.trim().split('\n');
    const [hash, timestamp] = header.split('\t');
    const change = changes.find(line => /^[AMDR]\d*\t/.test(line));
    if (!change) return false;
    const [status, oldPath, newPath] = change.split('\t');
    const revisionPath = status.startsWith('R') ? newPath : oldPath;
    const source = git(['show', `${hash}:${revisionPath}`]);
    let fingerprint;
    try {
      fingerprint = contentFingerprint(source);
    } catch (error) {
      throw new Error(
        `Cannot parse ${revisionPath} at ${hash}: ${error.message}`,
        { cause: error },
      );
    }
    if (previous && fingerprint !== previous.fingerprint) {
      contentDate = previous.timestamp;
      return true;
    }
    previous = { fingerprint, timestamp };
    return false;
  });

  const timestamp = contentDate || previous?.timestamp;
  if (!timestamp || Number.isNaN(Date.parse(timestamp))) {
    throw new Error(
      `No valid Git modification date for ${file}. ` +
        'Commit new MDX pages before building the documentation.',
    );
  }
  return timestamp;
};

const getMDXFiles = async directory => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(entry => {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) return getMDXFiles(path);
      return entry.isFile() && entry.name.endsWith('.mdx') ? [path] : [];
    }),
  );
  return files.flat().sort();
};

export const buildPageMetadata = async pagesDirectory => {
  const git = args =>
    execFileSync('git', args, {
      cwd: pagesDirectory,
      encoding: 'utf8',
    }).trim();

  if (git(['rev-parse', '--is-shallow-repository']) === 'true') {
    throw new Error(
      'MDX modification dates require full Git history. ' +
        'Run git fetch --unshallow or configure checkout with fetch-depth: 0.',
    );
  }

  const files = await getMDXFiles(pagesDirectory);
  return Object.fromEntries(
    files.map(file => {
      const timestamp = getContentDate(git, file);

      const path = relative(pagesDirectory, file)
        .split(sep)
        .join('/')
        .replace(/\.mdx$/, '')
        .replace(/(^|\/)index$/, '');
      return [`/${path}`, new Date(timestamp).toISOString()];
    }),
  );
};

export const generatePageMetadata = async () => {
  const metadata = await buildPageMetadata(resolve(sourceDirectory, 'pages'));
  const outputDirectory = resolve(sourceDirectory, 'data/generated');
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(
    resolve(outputDirectory, 'mdxLastModified.json'),
    `${JSON.stringify(metadata, null, 2)}\n`,
  );
};

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await generatePageMetadata();
}
