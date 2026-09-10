// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import type { ApiGetLocalVariablesResponse } from '../figma_api.js';
import {
  type FlattenedTokensByFile,
  generatePostVariablesPayload,
} from '../token_import.js';
import { tokenFilesFromLocalVariables } from '../token_export.js';
import { readJsoncFile } from '../jsonc.js';

// Regenerates semantic color parity golden fixtures from canonical
// import/export test inputs to keep parity artifacts deterministic.
// A "golden fixture" is a checked-in expected-output snapshot used as a
// contract for regression and parity tests.

type ImportFixtureInput = {
  tokensByFile: FlattenedTokensByFile;
  localVariables: ApiGetLocalVariablesResponse;
};

function writeJsonFile(filePath: string, value: unknown) {
  writeFileSync(filePath, `${JSON.stringify(value, null, 2)}\n`);
}

const currentFilePath = fileURLToPath(import.meta.url);
const scriptsDir = path.dirname(currentFilePath);
const fixtureDir = path.resolve(
  scriptsDir,
  '../tests/fixtures/semantic-color-parity',
);

const exportInputPath = path.join(fixtureDir, 'export-input.jsonc');
const importInputPath = path.join(fixtureDir, 'import-input.jsonc');

const exportGoldenPath = path.join(fixtureDir, 'export-output.golden.json');
const importGoldenPath = path.join(fixtureDir, 'import-output.golden.json');

const exportInput =
  readJsoncFile<ApiGetLocalVariablesResponse>(exportInputPath);
const importInput = readJsoncFile<ImportFixtureInput>(importInputPath);

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
