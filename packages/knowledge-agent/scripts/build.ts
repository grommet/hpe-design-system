// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { execFileSync } from 'node:child_process';
import {
  chmodSync,
  copyFileSync,
  mkdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Ajv } from 'ajv';
import { createGenerator } from 'ts-json-schema-generator';
import * as schemas from '../../../scripts/validate-knowledge-schema.js';
import { loadSourceKnowledge, repoRoot } from '../src/source-knowledge.js';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(packageRoot, 'dist');
// Never leave a stale usable artifact behind after a failed build.
rmSync(dist, { recursive: true, force: true });
const validation = schemas.validateKnowledgeDirectory();
if (validation.errors.length) throw new Error(validation.errors.join('\n'));

const snapshot = loadSourceKnowledge({ strict: true });
const generator = createGenerator({
  path: path.join(packageRoot, 'src/knowledge.ts'),
  type: 'KnowledgeSnapshot',
  additionalProperties: false,
  jsDoc: 'none',
});
const schema = generator.createSchema('KnowledgeSnapshot');
const ajv = new Ajv({ allErrors: true, strict: true, allowUnionTypes: true });
const validate = ajv.compile(schema);
if (!validate(snapshot)) throw new Error(ajv.errorsText(validate.errors));

(
  [
    ['component', snapshot.content.components],
    ['pattern', snapshot.content.patterns],
  ] as const
).forEach(([label, definitions]) => {
  const ids = definitions.map(definition => definition.id);
  if (new Set(ids).size !== ids.length) {
    throw new Error(`Duplicate ${label} IDs in knowledge snapshot.`);
  }
});
execFileSync(
  process.execPath,
  [
    path.join(repoRoot, 'node_modules/typescript/bin/tsc'),
    '-p',
    path.join(packageRoot, 'tsconfig.build.json'),
  ],
  { cwd: packageRoot, stdio: 'inherit' },
);
mkdirSync(dist, { recursive: true });
writeFileSync(
  path.join(dist, 'knowledge.json'),
  `${JSON.stringify(snapshot)}\n`,
);
writeFileSync(
  path.join(dist, 'knowledge.schema.json'),
  `${JSON.stringify(schema)}\n`,
);
copyFileSync(path.join(repoRoot, 'LICENSE'), path.join(dist, 'LICENSE'));
chmodSync(path.join(packageRoot, 'bin/cli.js'), 0o755);
const components = snapshot.content.components.length;
const patterns = snapshot.content.patterns.length;
console.log(`Built ${components} components and ${patterns} patterns.`);
console.log(`Content sha256: ${snapshot.contentDigest}`);
