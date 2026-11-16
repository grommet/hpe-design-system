// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'yaml';
import type {
  ComponentDefinition,
  ComponentDefinitionSource,
  ComponentExample,
  ComponentExampleSource,
  PatternDefinition,
  PatternDefinitionSource,
} from './types.js';

const ROOT_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..',
  '..',
);
const COMPONENTS_DIR = path.join(
  ROOT_DIR,
  'knowledge',
  'core',
  'data',
  'components',
);
const PATTERNS_DIR = path.join(
  ROOT_DIR,
  'knowledge',
  'core',
  'data',
  'patterns',
);

interface LoadOptions {
  strict?: boolean;
}

function resolveFile(relPath: string, options: LoadOptions): string {
  const abs = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(abs)) {
    if (options.strict) throw new Error(`Required file not found: ${relPath}`);
    console.warn(`⚠️  file not found: ${relPath}`);
    return `// File not found: ${relPath}`;
  }
  return fs.readFileSync(abs, 'utf-8');
}

function resolveExample(
  example: ComponentExampleSource,
  options: LoadOptions,
): ComponentExample {
  if (typeof example.code === 'string') {
    return { ...example, code: example.code };
  }
  if (typeof example.codeFile === 'string') {
    return { ...example, code: resolveFile(example.codeFile, options) };
  }
  throw new Error(
    `Example "${example.description}" must specify code or codeFile.`,
  );
}

function resolvePatternFiles(
  pattern: PatternDefinitionSource,
  options: LoadOptions,
): PatternDefinition {
  const resolved: PatternDefinition = {
    ...pattern,
    examples: pattern.examples?.map(example =>
      resolveExample(example, options),
    ),
  };
  if (resolved.templateCodeFile && !resolved.templateCode) {
    resolved.templateCode = resolveFile(resolved.templateCodeFile, options);
  }
  return resolved;
}

function loadYamlOrJsonFiles<T>(
  dir: string,
  label: string,
  options: LoadOptions,
): T[] {
  if (!fs.existsSync(dir)) {
    if (options.strict)
      throw new Error(`Required ${label} directory not found`);
    console.warn(`⚠️  ${label} directory not found: ${dir}`);
    return [];
  }

  const files = fs
    .readdirSync(dir)
    .filter(
      file =>
        file.endsWith('.json') ||
        file.endsWith('.yaml') ||
        file.endsWith('.yml'),
    )
    .sort();

  return files.map(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const parsed = file.endsWith('.json')
      ? JSON.parse(content)
      : yaml.parse(content);

    return parsed as T;
  });
}

export function loadComponents(
  options: LoadOptions = {},
): ComponentDefinition[] {
  const raw = loadYamlOrJsonFiles<ComponentDefinitionSource>(
    COMPONENTS_DIR,
    'components',
    options,
  );
  return raw.map(component => ({
    ...component,
    examples: component.examples.map(example =>
      resolveExample(example, options),
    ),
  }));
}

export function loadPatterns(options: LoadOptions = {}): PatternDefinition[] {
  const raw = loadYamlOrJsonFiles<PatternDefinitionSource>(
    PATTERNS_DIR,
    'patterns',
    options,
  );
  return raw.map(pattern => resolvePatternFiles(pattern, options));
}
