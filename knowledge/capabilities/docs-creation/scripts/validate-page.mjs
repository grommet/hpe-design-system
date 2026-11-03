// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createProcessor } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import { parse as parseYaml } from 'yaml';

const normalize = value =>
  value
    .toLowerCase()
    .replace(/[-_\s]+/g, ' ')
    .trim();

const textOf = node => node.value ?? (node.children ?? []).map(textOf).join('');

const flatten = (node, ancestors = []) => [
  { node, ancestors },
  ...(node.children ?? []).flatMap(child =>
    flatten(child, [...ancestors, node]),
  ),
];

const isJsx = node =>
  ['mdxJsxFlowElement', 'mdxJsxTextElement'].includes(node.type);

const isTable = node =>
  node.type === 'table' || (isJsx(node) && node.name === 'table');

export function validatePage(source, definition) {
  if (
    !definition ||
    typeof definition.name !== 'string' ||
    !definition.name.trim() ||
    (definition.variants !== undefined &&
      (!Array.isArray(definition.variants) ||
        definition.variants.some(
          variant =>
            !variant ||
            typeof variant.name !== 'string' ||
            !variant.name.trim(),
        )))
  ) {
    throw new Error(
      'Expected component YAML with a name and optional named variants. ' +
        'Run pnpm validate:knowledge-schema for the full schema check.',
    );
  }

  // Parse only: do not compile, import, or execute the page's expressions.
  const tree = createProcessor({ remarkPlugins: [remarkGfm] }).parse(source);
  const entries = flatten(tree);
  const imports = new Map();
  entries
    .filter(({ node }) => node.type === 'mdxjsEsm')
    .flatMap(({ node }) => node.data.estree.body)
    .filter(statement => statement.type === 'ImportDeclaration')
    .forEach(statement => {
      statement.specifiers.forEach(specifier => {
        imports.set(specifier.local.name, {
          name: specifier.imported?.name ?? specifier.imported?.value,
          source: statement.source.value,
        });
      });
    });

  const componentName = node => {
    const parts = (node.name ?? '').split('.');
    return imports.get(node.name)?.name ?? parts.at(-1);
  };
  const isExample = node => isJsx(node) && componentName(node) === 'Example';
  const errors = [];
  const report = (node, message) => {
    errors.push(`line ${node.position?.start.line ?? 1}: ${message}`);
  };
  const headings = entries.filter(
    ({ node, ancestors }) =>
      node.type === 'heading' && !ancestors.some(isExample),
  );
  const sections = headings.filter(({ node }) => node.depth === 2);
  const findSection = name =>
    sections.find(({ node }) => normalize(textOf(node)) === name)?.node;
  ['use cases', 'anatomy', 'accessibility'].forEach(name => {
    const matches = sections.filter(
      ({ node }) => normalize(textOf(node)) === name,
    );
    if (matches.length !== 1) {
      report(tree, `Expected exactly one "${name}" level-two section.`);
    }
  });
  const useCases = findSection('use cases');
  const anatomy = findSection('anatomy');
  const variants = findSection('variants');
  const accessibility = findSection('accessibility');
  const offset = node => node.position.start.offset;
  const inRange = (start, end) =>
    entries.filter(({ node }) => {
      const position = node.position?.start.offset;
      return position > start && position < end;
    });
  const sectionEnd = node =>
    sections.find(entry => offset(entry.node) > offset(node))?.node.position
      .start.offset ?? source.length;

  if (
    useCases &&
    anatomy &&
    accessibility &&
    !(
      offset(useCases) < offset(anatomy) &&
      offset(anatomy) < offset(accessibility)
    )
  ) {
    report(
      tree,
      'Order required sections as Use cases, Anatomy, Accessibility.',
    );
  }
  if (useCases) {
    const primary = entries.filter(
      ({ node }) => isExample(node) && offset(node) < offset(useCases),
    );
    if (primary.length !== 1) {
      report(
        useCases,
        'Expected exactly one primary Example before Use cases; ' +
          `found ${primary.length}.`,
      );
    }
  }

  entries
    .filter(({ node }) => isJsx(node))
    .forEach(({ node }) => {
      const imported = imports.get((node.name ?? '').split('.')[0]);
      if (
        /cardpreview/i.test(componentName(node)) ||
        /cardpreviews?(?:\/|$)/i.test(imported?.source ?? '')
      ) {
        report(
          node,
          'Listing-card previews must not be rendered in the MDX body.',
        );
      }
    });

  if (anatomy) {
    const content = inRange(offset(anatomy), sectionEnd(anatomy));
    const tables = content.filter(({ node }) => node.type === 'table');
    if (tables.length !== 1) {
      report(
        anatomy,
        'Anatomy must contain exactly one Markdown anatomy table.',
      );
    } else {
      const columns = tables[0].node.children[0].children.map(cell =>
        normalize(textOf(cell)),
      );
      if (columns.join('|') !== 'label|region|purpose|required|notes') {
        report(
          tables[0].node,
          'Use anatomy columns: Label, Region, Purpose, Required, Notes.',
        );
      }
    }
    content.forEach(({ node, ancestors }) => {
      if (
        ['image', 'imageReference'].includes(node.type) ||
        (isJsx(node) &&
          !['Box', 'div', 'section'].includes(componentName(node)))
      ) {
        report(
          node,
          'Anatomy is table-only; visuals and Example blocks ' +
            'are collaborator-owned.',
        );
      }
      if (
        node.type === 'paragraph' &&
        !ancestors.some(ancestor => ancestor.type === 'tableCell')
      ) {
        report(node, 'Keep generated Anatomy content to the table only.');
      }
    });
  }

  const expected = (definition.variants ?? []).map(variant =>
    normalize(variant.name),
  );
  if (new Set(expected).size !== expected.length) {
    throw new Error(
      'Variant names must be distinct after heading normalization.',
    );
  }
  if (expected.length && !variants) {
    report(tree, 'YAML variants require a Variants section with subsections.');
  }
  if (variants) {
    if (
      sections.filter(({ node }) => normalize(textOf(node)) === 'variants')
        .length !== 1
    ) {
      report(variants, 'Expected exactly one Variants section.');
    }
    if (
      anatomy &&
      accessibility &&
      !(
        offset(anatomy) < offset(variants) &&
        offset(variants) < offset(accessibility)
      )
    ) {
      report(
        variants,
        'Place Variants after Anatomy and before Accessibility.',
      );
    }
    const end = sectionEnd(variants);
    const content = inRange(offset(variants), end);
    if (content.some(({ node }) => isTable(node))) {
      report(variants, 'Use prose subsections, not a variant summary table.');
    }
    const variantHeadings = headings.filter(
      ({ node }) =>
        node.depth === 3 &&
        offset(node) > offset(variants) &&
        offset(node) < end,
    );
    const actual = variantHeadings.map(({ node }) => normalize(textOf(node)));
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
      report(
        variants,
        'Expected one level-three subsection per YAML variant, in order: ' +
          `${expected.join(', ') || '(none)'}.`,
      );
    }
    variantHeadings.forEach(({ node }, index) => {
      const next = variantHeadings[index + 1]?.node;
      const prose = inRange(offset(node), next ? offset(next) : end).some(
        ({ node: child, ancestors }) =>
          child.type === 'paragraph' &&
          !ancestors.some(isExample) &&
          textOf(child).trim(),
      );
      if (!prose) {
        report(node, 'Each variant subsection needs explanatory prose.');
      }
    });
  }

  return errors;
}

export async function main(args) {
  const usage =
    'Usage: pnpm validate:docs-creation-page -- <page.mdx> <component.yaml>';
  if (args.length === 1 && args[0] === '--help') {
    console.log(usage);
    return 0;
  }
  const paths = args[0] === '--' ? args.slice(1) : args;
  if (paths.length !== 2) {
    console.error(usage);
    return 1;
  }
  try {
    const [source, yaml] = await Promise.all(
      paths.map(file => fs.readFile(file, 'utf8')),
    );
    const errors = validatePage(source, parseYaml(yaml));
    if (errors.length) {
      console.error(errors.map(error => `${paths[0]}:${error}`).join('\n'));
      return 1;
    }
    console.log(`PASS ${paths[0]}: docs-creation page presentation contract.`);
    return 0;
  } catch (error) {
    console.error(`Page contract validation failed: ${error.message}`);
    return 1;
  }
}

if (
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url
) {
  process.exitCode = await main(process.argv.slice(2));
}
