import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import type { ApiGetLocalVariablesResponse } from '../figma_api.js';
import {
  type FlattenedTokensByFile,
  generatePostVariablesPayload,
} from '../token_import.js';
import { tokenFilesFromLocalVariables } from '../token_export.js';

type ImportFixtureInput = {
  tokensByFile: FlattenedTokensByFile;
  localVariables: ApiGetLocalVariablesResponse;
};

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(readFileSync(filePath, 'utf8')) as T;
}

function writeJsonFile(filePath: string, value: unknown) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

const currentFilePath = fileURLToPath(import.meta.url);
const scriptsDir = path.dirname(currentFilePath);
const fixtureDir = path.resolve(
  scriptsDir,
  '../tests/fixtures/semantic-color-parity',
);

const exportInputPath = path.join(fixtureDir, 'export-input.json');
const importInputPath = path.join(fixtureDir, 'import-input.json');

const exportGoldenPath = path.join(fixtureDir, 'export-output.golden.json');
const importGoldenPath = path.join(fixtureDir, 'import-output.golden.json');

const exportInput = readJsonFile<ApiGetLocalVariablesResponse>(exportInputPath);
const importInput = readJsonFile<ImportFixtureInput>(importInputPath);

const exportOutput = tokenFilesFromLocalVariables(exportInput);
const importOutput = generatePostVariablesPayload(
  importInput.tokensByFile,
  importInput.localVariables,
);

writeJsonFile(exportGoldenPath, exportOutput);
writeJsonFile(importGoldenPath, importOutput);

console.log('Updated semantic color parity fixtures:');
console.log(`- ${path.relative(process.cwd(), exportGoldenPath)}`);
console.log(`- ${path.relative(process.cwd(), importGoldenPath)}`);
