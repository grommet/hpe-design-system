// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import Ajv from 'ajv';
import type { ValidateFunction } from 'ajv';
import { createGenerator } from 'ts-json-schema-generator';
import { parse as parseYaml } from 'yaml';

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
);
const sourceTypes = {
  components: 'ComponentDefinitionSource',
  patterns: 'PatternDefinitionSource',
} as const;

export type KnowledgeCategory = keyof typeof sourceTypes;
export type KnowledgeValidators = Record<KnowledgeCategory, ValidateFunction>;

export function createKnowledgeValidators(): KnowledgeValidators {
  const generator = createGenerator({
    path: path.join(repoRoot, 'knowledge/core/data/types.ts'),
    type: '*',
    additionalProperties: false,
    jsDoc: 'none',
  });
  const ajv = new Ajv({ allErrors: true, strict: true, allowUnionTypes: true });
  return {
    components: ajv.compile(generator.createSchema(sourceTypes.components)),
    patterns: ajv.compile(generator.createSchema(sourceTypes.patterns)),
  };
}

export function validateKnowledgeSource(
  source: string,
  fileName: string,
  category: KnowledgeCategory,
  validators: KnowledgeValidators,
): string[] {
  try {
    const data: unknown = fileName.endsWith('.json')
      ? JSON.parse(source)
      : parseYaml(source);
    const validate = validators[category];
    if (validate(data)) return [];
    return (validate.errors ?? []).map(error => {
      const detail =
        error.keyword === 'additionalProperties'
          ? ` (${error.params.additionalProperty})`
          : error.keyword === 'required'
            ? ` (${error.params.missingProperty})`
            : '';
      return `${fileName}:${error.instancePath || '/'}: ${error.message}${detail}`;
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return [`${fileName}:/: Parse/validation error: ${message}`];
  }
}

export function validateKnowledgeDirectory(
  dataDirectory = path.join(repoRoot, 'knowledge/core/data'),
  validators = createKnowledgeValidators(),
): { filesChecked: number; errors: string[] } {
  const errors: string[] = [];
  let filesChecked = 0;
  for (const category of Object.keys(sourceTypes) as KnowledgeCategory[]) {
    const directory = path.join(dataDirectory, category);
    if (!fs.existsSync(directory)) {
      errors.push(
        `${path.relative(repoRoot, directory)}:/: Required directory is missing`,
      );
      continue;
    }
    const files = fs
      .readdirSync(directory, { withFileTypes: true })
      .filter(entry => entry.isFile() && /\.(json|ya?ml)$/.test(entry.name))
      .map(entry => entry.name)
      .sort();
    if (files.length === 0) {
      errors.push(
        `${path.relative(repoRoot, directory)}:/: No knowledge records found`,
      );
    }
    for (const fileName of files) {
      const absolutePath = path.join(directory, fileName);
      const relativePath = path.relative(repoRoot, absolutePath);
      filesChecked += 1;
      try {
        errors.push(
          ...validateKnowledgeSource(
            fs.readFileSync(absolutePath, 'utf8'),
            relativePath,
            category,
            validators,
          ),
        );
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        errors.push(`${relativePath}:/: ${message}`);
      }
    }
  }
  return { filesChecked, errors };
}

if (
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url
) {
  const { filesChecked, errors } = validateKnowledgeDirectory();
  if (errors.length > 0) {
    console.error('Knowledge schema validation failed:');
    errors.forEach(error => console.error(`  - ${error}`));
    process.exitCode = 1;
  } else {
    console.log(`OK knowledge schema (${filesChecked} files)`);
  }
}
