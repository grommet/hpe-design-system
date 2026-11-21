// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import path from 'node:path';

import type {
  CapabilityCatalog,
  CapabilityInstallAsset,
} from './capabilities.js';

const ownershipFileName = '.hpe-design-system-agent.json';

interface InstallationRecord {
  schemaVersion: 1;
  files: string[];
}

function isSafeAgentFileName(fileName: string): boolean {
  return (
    fileName === 'design-system-agent.agent.md' ||
    /^hpe-design-system-[a-z0-9-]+\.agent\.md$/.test(fileName)
  );
}

function ensureDirectory(parent: string, name: string): string {
  const directory = path.join(parent, name);
  try {
    const stats = fs.lstatSync(directory);
    if (stats.isSymbolicLink() || !stats.isDirectory()) {
      throw new Error(
        `Refusing unsafe agent installation directory: ${directory}`,
      );
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    fs.mkdirSync(directory);
  }
  return directory;
}

function resolveAssets(catalog: CapabilityCatalog): CapabilityInstallAsset[] {
  const assets = [
    catalog.frontdoorAgent,
    ...catalog.capabilities.flatMap(capability => capability.assets),
  ];
  const fileNames = assets.map(asset => asset.path);
  if (
    fileNames.some(fileName => !isSafeAgentFileName(fileName)) ||
    new Set(fileNames).size !== fileNames.length
  ) {
    throw new Error(
      'Capability catalog contains unsafe or duplicate agent paths.',
    );
  }
  return assets;
}

function readInstallationRecord(
  filePath: string,
): InstallationRecord | undefined {
  let source: string;
  try {
    const stats = fs.lstatSync(filePath);
    if (stats.isSymbolicLink() || !stats.isFile()) {
      throw new Error(`Refusing unsafe installation record: ${filePath}`);
    }
    source = fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return undefined;
    throw error;
  }
  const record: unknown = JSON.parse(source);
  if (
    typeof record !== 'object' ||
    record === null ||
    !('schemaVersion' in record) ||
    record.schemaVersion !== 1 ||
    !('files' in record) ||
    !Array.isArray(record.files) ||
    !record.files.every(
      fileName => typeof fileName === 'string' && isSafeAgentFileName(fileName),
    ) ||
    new Set(record.files).size !== record.files.length
  ) {
    throw new Error(`Invalid installation record: ${filePath}`);
  }
  return record as InstallationRecord;
}

function writeAtomically(filePath: string, content: string): void {
  const temporaryPath = `${filePath}.${process.pid}.tmp`;
  try {
    fs.writeFileSync(temporaryPath, content, { flag: 'wx' });
    fs.renameSync(temporaryPath, filePath);
  } catch (error) {
    try {
      fs.rmSync(temporaryPath, { force: true });
    } catch (cleanupError) {
      throw new AggregateError(
        [error, cleanupError],
        `Could not write ${filePath} or clean up its temporary file.`,
      );
    }
    throw error;
  }
}

function getAgentsDirectory(workspace: string, create = true): string {
  const workspacePath = fs.realpathSync(workspace);
  if (!fs.statSync(workspacePath).isDirectory()) {
    throw new Error(`Workspace target is not a directory: ${workspace}`);
  }
  const githubPath = path.join(workspacePath, '.github');
  const agentsPath = path.join(githubPath, 'agents');
  let githubExists = false;
  try {
    const stats = fs.lstatSync(githubPath);
    if (stats.isSymbolicLink() || !stats.isDirectory()) {
      throw new Error(
        `Refusing unsafe agent installation directory: ${githubPath}`,
      );
    }
    githubExists = true;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error;
    if (!create) return agentsPath;
  }
  if (!githubExists) fs.mkdirSync(githubPath);
  if (!create && !fs.existsSync(agentsPath)) return agentsPath;
  return ensureDirectory(githubPath, 'agents');
}

export function installDesignSystemAgent(
  catalog: CapabilityCatalog,
  options: { workspace: string; overwrite?: boolean; dryRun?: boolean },
): string[] {
  const assets = resolveAssets(catalog);
  const agentsDirectory = getAgentsDirectory(
    options.workspace,
    !options.dryRun,
  );
  const recordPath = path.join(agentsDirectory, ownershipFileName);
  const previousRecord = readInstallationRecord(recordPath);
  const previouslyOwned = new Set(previousRecord?.files || []);
  const collisions = assets
    .map(asset => asset.path)
    .filter(fileName => fs.existsSync(path.join(agentsDirectory, fileName)));

  if (collisions.length > 0 && !options.overwrite) {
    throw new Error(
      [
        'Agent files already exist; no files were changed.',
        `Re-run with --overwrite to replace them: ${collisions.join(', ')}`,
      ].join(' '),
    );
  }

  const currentFiles = new Set(assets.map(asset => asset.path));
  const staleOwnedFiles = [...previouslyOwned].filter(
    fileName => !currentFiles.has(fileName),
  );
  if (options.dryRun) {
    return [
      ...assets.map(asset => path.join(agentsDirectory, asset.path)),
      ...staleOwnedFiles.map(
        fileName => `remove ${path.join(agentsDirectory, fileName)}`,
      ),
    ];
  }

  staleOwnedFiles.forEach(fileName => {
    const stalePath = path.join(agentsDirectory, fileName);
    if (fs.existsSync(stalePath)) {
      const stats = fs.lstatSync(stalePath);
      if (stats.isSymbolicLink() || !stats.isFile()) {
        throw new Error(
          `Refusing to remove unsafe previously installed file: ${stalePath}`,
        );
      }
    }
  });
  assets.forEach(asset => {
    writeAtomically(path.join(agentsDirectory, asset.path), asset.content);
  });
  staleOwnedFiles.forEach(fileName => {
    fs.rmSync(path.join(agentsDirectory, fileName), { force: true });
  });
  const record: InstallationRecord = {
    schemaVersion: 1,
    files: assets.map(asset => asset.path),
  };
  writeAtomically(recordPath, `${JSON.stringify(record, null, 2)}\n`);
  return assets.map(asset => path.join(agentsDirectory, asset.path));
}

export function uninstallDesignSystemAgent(workspace: string): string[] {
  const agentsDirectory = getAgentsDirectory(workspace, false);
  const recordPath = path.join(agentsDirectory, ownershipFileName);
  const record = readInstallationRecord(recordPath);
  if (!record) {
    throw new Error(
      `No HPE Design System Agent installation found in ${agentsDirectory}`,
    );
  }

  const filePaths = record.files.map(fileName =>
    path.join(agentsDirectory, fileName),
  );
  filePaths.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      const stats = fs.lstatSync(filePath);
      if (stats.isSymbolicLink() || !stats.isFile()) {
        throw new Error(
          `Refusing to remove unsafe installed file: ${filePath}`,
        );
      }
    }
  });
  filePaths.forEach(filePath => fs.rmSync(filePath));
  fs.rmSync(recordPath);
  return [...filePaths, recordPath];
}
