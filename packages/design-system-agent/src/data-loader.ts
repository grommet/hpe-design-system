// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as fs from 'node:fs';
import * as path from 'node:path';
import yaml from 'yaml';
import { ComponentDefinition, PatternDefinition } from './types.js';

const ROOT_DIR = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..', '..');
const COMPONENTS_DIR = path.join(ROOT_DIR, 'knowledge', 'core', 'data', 'components');
const PATTERNS_DIR = path.join(ROOT_DIR, 'knowledge', 'core', 'data', 'patterns');

function resolveFile(relPath: string): string {
  const abs = path.join(ROOT_DIR, relPath);
  if (!fs.existsSync(abs)) {
    console.warn(`⚠️  file not found: ${relPath}`);
    return `// File not found: ${relPath}`;
  }
  return fs.readFileSync(abs, 'utf-8');
}

function resolvePatternFiles(pattern: PatternDefinition): PatternDefinition {
  const resolved = { ...pattern };
  if (resolved.templateCodeFile && !resolved.templateCode) {
    resolved.templateCode = resolveFile(resolved.templateCodeFile);
  }
  if (resolved.examples) {
    resolved.examples = resolved.examples.map((ex) => {
      if (ex.codeFile && !ex.code) {
        return { ...ex, code: resolveFile(ex.codeFile) };
      }
      return ex;
    });
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
    .filter((file) => file.endsWith('.json') || file.endsWith('.yaml') || file.endsWith('.yml'))
    .sort();

  return files.map((file) => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const parsed = file.endsWith('.json')
      ? JSON.parse(content)
      : yaml.parse(content);

    return parsed as T;
  });
}

export function loadComponents(): ComponentDefinition[] {
  return loadYamlOrJsonFiles<ComponentDefinition>(COMPONENTS_DIR, 'components');
}

export function loadPatterns(): PatternDefinition[] {
  const raw = loadYamlOrJsonFiles<PatternDefinition>(PATTERNS_DIR, 'patterns');
  return raw.map(resolvePatternFiles);
}
