// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { validatePage } from './validate-page.mjs';

const definition = {
  name: 'DateTimeInput',
  variants: [{ name: 'drop-picker' }, { name: 'inline' }],
};
const page = `import { Example, Box } from '../../layouts';
import { Simple, Task } from '../../examples';

<Example>
  <Simple />
</Example>

## Use cases

### Scheduling maintenance

Submit a maintenance schedule using a form and view its confirmation.

<Example>
  <Task />
</Example>

## Anatomy

<Box overflow="auto">

| Label | Region | Purpose | Required | Notes |
| --- | --- | --- | --- | --- |
| 1 | Field | Enters a date and time | Required | None |

</Box>

## Variants

### Drop picker

Open the picker when it is needed.

### Inline

Keep the picker visible.

## Accessibility

Provide a visible label.
`;
const check = (source, pattern) =>
  assert.ok(
    validatePage(source, definition).some(error => pattern.test(error)),
    `Expected diagnostic matching ${pattern}`,
  );

test('accepts the table-only anatomy and ordered variant subsections', () => {
  assert.deepEqual(validatePage(page, definition), []);
});

test('ignores Example tags inside hidden scaffold briefs', () => {
  const scaffold = page.replace(
    '<Simple />',
    `<div>{/* TODO: Primary example
      <Example><Fake /></Example>
      ## Anatomy
    */}</div>`,
  );
  assert.deepEqual(validatePage(scaffold, definition), []);
});

test('does not execute MDX expressions or imports', () => {
  const source = `${page}\n{(() => { throw new Error('never execute'); })()}\n`;
  assert.deepEqual(validatePage(source, definition), []);
});

test('ignores examples, headings and images in fenced code', () => {
  const source = `${page}
\`\`\`mdx
<Example><CardPreview /></Example>
## Anatomy
![Diagram](anatomy.svg)
\`\`\`
`;
  assert.deepEqual(validatePage(source, definition), []);
});

test('rejects duplicate and missing primary examples', () => {
  check(
    page.replace(
      '## Use cases',
      '<Example><Simple /></Example>\n\n## Use cases',
    ),
    /exactly one primary.*found 2/,
  );
  check(
    page.replace('<Example>\n  <Simple />\n</Example>', ''),
    /exactly one primary.*found 0/,
  );
});

test('counts aliased and namespaced Example components', () => {
  const alias = page
    .replace('{ Example, Box }', '{ Example as Demo, Box }')
    .replaceAll('<Example>', '<Demo>')
    .replaceAll('</Example>', '</Demo>');
  assert.deepEqual(validatePage(alias, definition), []);
  check(
    alias.replace('## Use cases', '<Demo><Simple /></Demo>\n\n## Use cases'),
    /exactly one primary.*found 2/,
  );
  const namespace = page
    .replace('{ Example, Box }', '* as Layout')
    .replaceAll('<Example>', '<Layout.Example>')
    .replaceAll('</Example>', '</Layout.Example>');
  assert.deepEqual(validatePage(namespace, definition), []);
});

test('rejects rendered listing previews and aliases', () => {
  check(
    page.replace('<Task />', '<DateTimeInputCardPreviewExample />'),
    /Listing-card previews/,
  );
  check(
    page.replace(
      "import { Simple, Task } from '../../examples';",
      "import { DateTimeInputCardPreview as Simple } from '../../examples';",
    ),
    /Listing-card previews/,
  );
  check(
    page.replace(
      "import { Simple, Task } from '../../examples';",
      "import Simple from '../../examples/cardPreviews/datetimeinput';",
    ),
    /Listing-card previews/,
  );
});

test('does not count an unused listing-preview import as rendered', () => {
  const source = [
    "import Card from '../../examples/cardPreviews/input';",
    page,
  ].join('\n');
  assert.deepEqual(validatePage(source, definition), []);
});

test('rejects anatomy examples, diagrams, images and SVGs', () => {
  [
    '<Example><Diagram /></Example>',
    '<DateTimeInputAnatomy />',
    '![Anatomy](anatomy.svg)',
    '<svg />',
    '<img src="diagram.png" />',
  ].forEach(visual => {
    check(
      page.replace('## Anatomy', `## Anatomy\n\n${visual}`),
      /Anatomy is table-only/,
    );
  });
});

test('checks anatomy tables, columns and unwanted prose', () => {
  check(
    page.replace(/\| Label[\s\S]*?\n\n<\/Box>/, '</Box>'),
    /exactly one Markdown anatomy table/,
  );
  check(page.replace('| Region |', '| Part |'), /Use anatomy columns/);
  check(
    page.replace('## Anatomy', '## Anatomy\n\nA generated diagram goes here.'),
    /Keep generated Anatomy content/,
  );
});

test('rejects variant summary tables, including HTML tables', () => {
  check(
    page.replace(
      '### Drop picker',
      '| Variant | Description |\n| --- | --- |\n| Drop | Picker |\n\n' +
        '### Drop picker',
    ),
    /not a variant summary table/,
  );
  check(
    page.replace(
      '### Drop picker',
      '<table><tbody /></table>\n\n### Drop picker',
    ),
    /not a variant summary table/,
  );
});

test('requires every YAML variant exactly once and in order', () => {
  [
    page.replace('### Inline\n\nKeep the picker visible.', ''),
    page.replace('### Inline', '### Unknown'),
    page.replace('### Inline', '### Drop picker'),
    page
      .replace('### Drop picker', '### Inline')
      .replace('### Inline\n\nKeep', '### Drop picker\n\nKeep'),
  ].forEach(source => {
    check(source, /one level-three subsection per YAML variant/);
  });
  check(page.replace('## Variants', '## Configuration'), /require a Variants/);
});

test('requires prose rather than a heading with only an example', () => {
  check(
    page.replace('Keep the picker visible.', '<Example><Simple /></Example>'),
    /Each variant subsection needs explanatory prose/,
  );
});

test('normalizes display headings without losing variant identities', () => {
  const source = page.replace('### Drop picker', '### `Drop-picker`');
  assert.deepEqual(validatePage(source, definition), []);
});

test('supports definitions without variants', () => {
  const source = page.replace(
    /## Variants[\s\S]*?## Accessibility/,
    '## Accessibility',
  );
  assert.deepEqual(validatePage(source, { name: 'Simple' }), []);
});

test('checks required sections, duplicates and ordering', () => {
  check(page.replace('## Use cases', '## Tasks'), /"use cases"/);
  check(`${page}\n## Anatomy\n`, /exactly one "anatomy"/);
  check(
    page
      .replace('## Anatomy', '## Accessibility')
      .replace('## Accessibility\n\nProvide', '## Anatomy\n\nProvide'),
    /Order required sections/,
  );
});

test('rejects invalid YAML input shapes and malformed MDX', () => {
  [null, {}, { name: 'Input', variants: {} }].forEach(invalid => {
    assert.throws(() => validatePage(page, invalid), /Expected component YAML/);
  });
  assert.throws(
    () =>
      validatePage(page, {
        name: 'Input',
        variants: [{ name: 'drop-picker' }, { name: 'drop picker' }],
      }),
    /Variant names must be distinct/,
  );
  assert.throws(() => validatePage('<Example>', definition));
});

test('CLI reports pass, violations, parsing and usage errors', async () => {
  const directory = await fs.mkdtemp(
    path.join(os.tmpdir(), 'docs-page-contract-'),
  );
  const mdx = path.join(directory, 'input.mdx');
  const yaml = path.join(directory, 'input.yaml');
  const script = fileURLToPath(new URL('./validate-page.mjs', import.meta.url));
  const run = args =>
    spawnSync(process.execPath, [script, ...args], {
      encoding: 'utf8',
    });
  try {
    await fs.writeFile(mdx, page);
    await fs.writeFile(
      yaml,
      'name: DateTimeInput\nvariants:\n' +
        '  - name: drop-picker\n  - name: inline\n',
    );
    assert.equal(run([mdx, yaml]).status, 0);
    assert.equal(run(['--', mdx, yaml]).status, 0);
    assert.equal(run(['--help']).status, 0);
    const usage = run([]);
    assert.equal(usage.status, 1);
    assert.match(usage.stderr, /Usage:/);
    await fs.writeFile(mdx, page.replace('### Inline', '### Unsupported'));
    const invalid = run([mdx, yaml]);
    assert.equal(invalid.status, 1);
    assert.match(invalid.stderr, /input.mdx:line \d+:/);
    await fs.writeFile(yaml, 'variants: [');
    const malformed = run([mdx, yaml]);
    assert.equal(malformed.status, 1);
    assert.match(malformed.stderr, /validation failed:/);
    const missing = run([path.join(directory, 'missing.mdx'), yaml]);
    assert.equal(missing.status, 1);
    assert.match(missing.stderr, /ENOENT/);
  } finally {
    await fs.rm(directory, { recursive: true, force: true });
  }
});
