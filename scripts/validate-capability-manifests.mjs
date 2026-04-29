import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Ajv2020 from 'ajv/dist/2020.js';
import addFormats from 'ajv-formats';
import { parse as parseYaml } from 'yaml';

const scriptFilePath = fileURLToPath(import.meta.url);
const scriptDirPath = path.dirname(scriptFilePath);
const repoRoot = path.resolve(scriptDirPath, '..');
const capabilitiesDir = path.join(repoRoot, 'knowledge', 'capabilities');
const schemaPath = path.join(
  repoRoot,
  'knowledge',
  'schemas',
  'capability-manifest.schema.json',
);

const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));

const ajv = new Ajv2020({ allErrors: true, strict: true });
addFormats(ajv);
const validate = ajv.compile(schema);

const findManifestFiles = (dirPath) => {
  if (!fs.existsSync(dirPath)) return [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  entries.forEach((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      files.push(...findManifestFiles(fullPath));
      return;
    }

    if (entry.isFile() && entry.name === 'manifest.yaml') {
      files.push(fullPath);
    }
  });

  return files;
};

const manifestFiles = findManifestFiles(capabilitiesDir);

if (manifestFiles.length === 0) {
  console.log('No capability manifests found at knowledge/capabilities/**/manifest.yaml');
  process.exit(0);
}

let hasError = false;

manifestFiles.forEach((manifestFile) => {
  const manifestPath = path.relative(repoRoot, manifestFile);

  try {
    const source = fs.readFileSync(manifestFile, 'utf8');
    const data = parseYaml(source);
    const valid = validate(data);

    if (valid) {
      console.log(`OK ${manifestPath}`);
      return;
    }

    hasError = true;
    console.error(`FAIL ${manifestPath}`);

    (validate.errors || []).forEach((error) => {
      const at = error.instancePath || '/';
      console.error(`  - ${at}: ${error.message}`);
    });
  } catch (error) {
    hasError = true;
    const message = error instanceof Error ? error.message : String(error);
    console.error(`FAIL ${manifestPath}`);
    console.error(`  - YAML parse/validation error: ${message}`);
  }
});

if (hasError) {
  process.exit(1);
}
