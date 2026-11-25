// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildCapabilityCatalog } from '../scripts/build-capability-catalog.js';
import { loadSourceKnowledge, repoRoot } from './source-knowledge.js';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));

export function loadSourceCapabilityCatalog() {
  try {
    execFileSync(
      process.execPath,
      [path.join(repoRoot, 'scripts/validate-capability-manifests.mjs')],
      { cwd: repoRoot, stdio: ['ignore', 'pipe', 'pipe'] },
    );
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    const stderr =
      typeof error === 'object' &&
      error !== null &&
      'stderr' in error &&
      Buffer.isBuffer(error.stderr)
        ? error.stderr.toString('utf8').trim()
        : '';
    const message = [detail, stderr].filter(Boolean).join('\n');
    throw new Error(
      `Capability manifest validation failed: ${message}`,
      { cause: error },
    );
  }
  return buildCapabilityCatalog(
    repoRoot,
    packageRoot,
    loadSourceKnowledge({ strict: true }),
  );
}
