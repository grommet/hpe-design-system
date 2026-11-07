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
  FoundationDefinition,
  GlossaryTerm,
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
const FOUNDATIONS_DIR = path.join(
  ROOT_DIR,
  'knowledge',
  'core',
  'data',
  'foundations',
);
const GLOSSARY_FILE = path.join(
  ROOT_DIR,
  'knowledge',
  'core',
  'data',
  'glossary.yaml',
);

function resolveFile(relPath: string): string {
  const abs = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(abs)) {
    console.warn(`⚠️  file not found: ${relPath}`);
    return `// File not found: ${relPath}`;
  }
  return fs.readFileSync(abs, 'utf-8');
}

function resolveExample(example: ComponentExampleSource): ComponentExample {
  if (typeof example.code === 'string') {
    return { ...example, code: example.code };
  }
  if (typeof example.codeFile === 'string') {
    return { ...example, code: resolveFile(example.codeFile) };
  }
  throw new Error(
    `Example "${example.description}" must specify code or codeFile.`,
  );
}

function resolvePatternFiles(
  pattern: PatternDefinitionSource,
): PatternDefinition {
  const resolved: PatternDefinition = {
    ...pattern,
    examples: pattern.examples?.map(resolveExample),
  };
  if (resolved.templateCodeFile && !resolved.templateCode) {
    resolved.templateCode = resolveFile(resolved.templateCodeFile);
  }
  return resolved;
}

function loadYamlOrJsonFiles<T>(dir: string, label: string): T[] {
  if (!fs.existsSync(dir)) {
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

export function loadComponents(): ComponentDefinition[] {
  const raw = loadYamlOrJsonFiles<ComponentDefinitionSource>(
    COMPONENTS_DIR,
    'components',
  );
  return raw.map(component => ({
    ...component,
    examples: component.examples.map(resolveExample),
  }));
}

export function loadPatterns(): PatternDefinition[] {
  const raw = loadYamlOrJsonFiles<PatternDefinitionSource>(
    PATTERNS_DIR,
    'patterns',
  );
  return raw.map(resolvePatternFiles);
}

export function loadFoundations(): FoundationDefinition[] {
  return loadYamlOrJsonFiles<FoundationDefinition>(
    FOUNDATIONS_DIR,
    'foundations',
  );
}

export function loadGlossary(): GlossaryTerm[] {
  if (!fs.existsSync(GLOSSARY_FILE)) {
    console.warn(`⚠️  glossary file not found: ${GLOSSARY_FILE}`);
    return [];
  }

  const content = fs.readFileSync(GLOSSARY_FILE, 'utf-8');
  return yaml.parse(content) as GlossaryTerm[];
}
