// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import Ajv2020 from 'ajv/dist/2020.js'; // eslint-disable-line import/extensions
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

const findManifestFiles = dirPath => {
  if (!fs.existsSync(dirPath)) return [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  entries.forEach(entry => {
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

const validateDistributionAssets = (manifest, manifestFile) => {
  const distribution = manifest?.spec?.distribution;
  if (!distribution) return [];

  const capabilityDir = path.dirname(manifestFile);
  const errors = [];
  const declaredAgents = new Set(manifest.spec.assets.agents);
  const paths = [
    ...(distribution.agents || []).map(asset => ({
      asset,
      kind: 'agent',
      mustBeDeclared: true,
    })),
    ...(distribution.documentation || []).map(asset => ({
      asset,
      kind: 'documentation',
      mustBeDeclared: false,
    })),
  ];

  paths.forEach(({ asset, kind, mustBeDeclared }) => {
    if (
      path.isAbsolute(asset) ||
      asset.includes('\\') ||
      asset
        .split('/')
        .some(part => part === '' || part === '.' || part === '..')
    ) {
      errors.push(
        `${kind} asset path is not a safe relative file path: ${asset}`,
      );
      return;
    }
    const resolved = path.resolve(capabilityDir, asset);
    const realCapabilityDir = fs.realpathSync(capabilityDir);
    const realAssetPath = fs.realpathSync(resolved);
    const relative = path.relative(realCapabilityDir, realAssetPath);
    if (
      relative === '..' ||
      relative.startsWith(`..${path.sep}`) ||
      relative === '' ||
      path.isAbsolute(relative)
    ) {
      errors.push(
        `${kind} asset path is not a safe relative file path: ${asset}`,
      );
      return;
    }
    if (mustBeDeclared && !declaredAgents.has(asset)) {
      errors.push(
        `Distribution agent is not declared in spec.assets.agents: ${asset}`,
      );
    }
    try {
      if (!fs.statSync(realAssetPath).isFile()) {
        errors.push(`${kind} asset is not a file: ${asset}`);
      }
    } catch {
      errors.push(`${kind} asset does not exist: ${asset}`);
    }
  });
  return errors;
};

const manifestFiles = findManifestFiles(capabilitiesDir);

if (manifestFiles.length === 0) {
  console.log(
    'No capability manifests found at knowledge/capabilities/**/manifest.yaml',
  );
  process.exit(0);
}

let hasError = false;

manifestFiles.forEach(manifestFile => {
  const manifestPath = path.relative(repoRoot, manifestFile);

  try {
    const source = fs.readFileSync(manifestFile, 'utf8');
    const data = parseYaml(source);
    const valid = validate(data);

    if (valid) {
      const distributionErrors = validateDistributionAssets(data, manifestFile);
      if (distributionErrors.length > 0) {
        hasError = true;
        console.error(`FAIL ${manifestPath}`);
        distributionErrors.forEach(error => console.error(`  - ${error}`));
        return;
      }
      console.log(`OK ${manifestPath}`);
      return;
    }

    hasError = true;
    console.error(`FAIL ${manifestPath}`);

    (validate.errors || []).forEach(error => {
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
