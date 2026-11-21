// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import fs from 'node:fs';
import path from 'node:path';

import { parse as parseYaml, stringify as stringifyYaml } from 'yaml';

import type { KnowledgeSnapshot } from '../src/knowledge.js';
import type {
  CapabilityBundle,
  CapabilityCatalog,
  CapabilityInstallAsset,
} from '../src/capabilities.js';

interface ManifestAgent {
  id: string;
  version: string;
  summary: string;
  spec: {
    dependencies?: {
      data?: Array<{ path: string }>;
      skills?: Array<{ path: string }>;
      external?: Array<{ path: string }>;
    };
    assets: { agents: string[] };
    stages?: Array<{ id: string; when: string }>;
    distribution?: { agents: string[]; documentation?: string[] };
  };
}

const knowledgeAgentCommand = 'pnpm --filter @hpe-design/knowledge-agent';

function assertWithinDirectory(directory: string, filePath: string): string {
  const resolvedDirectory = fs.realpathSync(directory);
  const resolvedPath = fs.realpathSync(filePath);
  const relative = path.relative(resolvedDirectory, resolvedPath);
  if (
    relative === '' ||
    relative === '..' ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    throw new Error(
      `Capability asset resolves outside its directory: ${filePath}`,
    );
  }
  if (!fs.statSync(resolvedPath).isFile()) {
    throw new Error(`Capability asset is not a regular file: ${filePath}`);
  }
  return resolvedPath;
}

function readAsset(
  root: string,
  directory: string,
  relativePath: string,
): string {
  if (
    path.isAbsolute(relativePath) ||
    relativePath.includes('\\') ||
    relativePath
      .split('/')
      .some(part => part === '' || part === '.' || part === '..')
  ) {
    throw new Error(`Invalid capability asset path: ${relativePath}`);
  }
  const fullPath = path.resolve(directory, relativePath);
  const rootRelative = path.relative(root, fullPath);
  if (
    rootRelative === '..' ||
    rootRelative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(rootRelative)
  ) {
    throw new Error(
      `Capability asset path escapes the repository: ${relativePath}`,
    );
  }
  return fs.readFileSync(assertWithinDirectory(directory, fullPath), 'utf8');
}

function agentId(capabilityId: string, assetPath: string): string {
  const baseName = path.posix.basename(assetPath, '.agent.md');
  const role = baseName.replace(/-agent$/, '');
  return `hpe-design-system-${capabilityId}-${role}`;
}

function adaptAgentForConsumer(
  source: string,
  id: string,
  agentIds: Record<string, string>,
): string {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!match) throw new Error(`Agent asset is missing YAML frontmatter: ${id}`);
  const frontmatter: unknown = parseYaml(match[1]);
  if (
    typeof frontmatter !== 'object' ||
    frontmatter === null ||
    Array.isArray(frontmatter)
  ) {
    throw new Error(`Agent asset has invalid YAML frontmatter: ${id}`);
  }
  const metadata = frontmatter as Record<string, unknown>;
  metadata.name = id;
  metadata['user-invocable'] = false;
  if (Array.isArray(metadata.tools)) {
    metadata.tools = metadata.tools.map(tool =>
      tool === 'terminal' ? 'execute' : tool,
    );
  }

  let body = source.slice(match[0].length);
  Object.entries(agentIds).forEach(([original, installed]) => {
    body = body.replaceAll(`@${original}`, `@${installed}`);
  });
  body = body
    .replaceAll(
      `${knowledgeAgentCommand} test`,
      'Package tests are unavailable to consumers; Track B is report-only.',
    )
    .replaceAll(
      `${knowledgeAgentCommand} generate -- --rule <id>`,
      'hpe-design-agent --rule <id>',
    )
    .replaceAll(
      `${knowledgeAgentCommand} generate -- "<feature area>"`,
      'hpe-design-agent "<feature area>" --json',
    )
    .replaceAll(
      `${knowledgeAgentCommand} generate -- "<primary feature>"`,
      'hpe-design-agent "<primary feature>" --json',
    )
    .replaceAll(
      `${knowledgeAgentCommand} generate -- "<query>"`,
      'hpe-design-agent "<query>" --json',
    )
    .replaceAll(`${knowledgeAgentCommand} generate --`, 'hpe-design-agent')
    .replaceAll(
      'knowledge/core/data/types.ts',
      'the bundled knowledge returned by the CLI',
    )
    .replaceAll(
      'knowledge/core/data/components/*.yaml',
      'component definitions returned by the CLI',
    )
    .replaceAll(
      'knowledge/core/data/patterns/*.yaml',
      'pattern definitions returned by the CLI',
    )
    .replaceAll(
      'knowledge/core/data/patterns',
      'pattern definitions returned by the CLI',
    )
    .replaceAll(
      'knowledge/core/data/components',
      'component definitions returned by the CLI',
    )
    .replaceAll(
      'knowledge/core/data/**',
      'canonical design-system knowledge (report-only)',
    )
    .replaceAll(
      'packages/knowledge-agent/**',
      'the installed package and bundled knowledge (report-only)',
    )
    .replaceAll(
      'design-system-maintainer',
      'HPE Design System maintainers (report-only)',
    );
  const consumerGuidance = `## Consumer installation constraints

This helper runs in an external consumer project. Canonical component,
pattern, and foundation data are bundled in the installed package, not in the
consumer repository. Use \`hpe-design-agent "<focused query>" --json\`,
\`hpe-design-agent --checklist\`, or
\`hpe-design-agent --rule <id>\` to retrieve that knowledge. Do not run
monorepo-only \`pnpm --filter\` commands or edit
knowledge-agent, canonical knowledge, or other files outside the user's
consumer-project scope. Track B recommendations are report-only.

`;
  const formattedFrontmatter = stringifyYaml(metadata).trimEnd();
  return `---\n${formattedFrontmatter}\n---\n\n${consumerGuidance}${body}`;
}

function validateDependencies(
  manifest: ManifestAgent,
  snapshot: KnowledgeSnapshot,
): void {
  const supportedDataPaths = new Set([
    'knowledge/core/data/components',
    'knowledge/core/data/patterns',
    'knowledge/core/data/types.ts',
  ]);
  (manifest.spec.dependencies?.data || []).forEach(dependency => {
    if (!supportedDataPaths.has(dependency.path)) {
      throw new Error(
        `Unsupported consumer capability data dependency: ${dependency.path}`,
      );
    }
  });

  const bundledInstructions = new Set(
    snapshot.content.instructions.map(instruction => instruction.name),
  );
  (manifest.spec.dependencies?.skills || []).forEach(dependency => {
    const name = path.posix.basename(dependency.path);
    if (
      !dependency.path.startsWith('knowledge/core/instructions/standards/') ||
      !bundledInstructions.has(name)
    ) {
      const message =
        'Consumer capability skill is not in the bundled knowledge snapshot';
      throw new Error(`${message}: ${dependency.path}`);
    }
  });

  (manifest.spec.dependencies?.external || []).forEach(dependency => {
    if (dependency.path !== 'packages/knowledge-agent') {
      const message = 'Unsupported consumer capability external dependency';
      throw new Error(`${message}: ${dependency.path}`);
    }
  });
}

function findManifestFiles(directory: string): string[] {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) return findManifestFiles(fullPath);
    return entry.isFile() && entry.name === 'manifest.yaml' ? [fullPath] : [];
  });
}

function buildCapability(
  repoRoot: string,
  manifestPath: string,
  snapshot: KnowledgeSnapshot,
): CapabilityBundle | undefined {
  const parsed: unknown = parseYaml(fs.readFileSync(manifestPath, 'utf8'));
  if (
    typeof parsed !== 'object' ||
    parsed === null ||
    !('metadata' in parsed) ||
    !('spec' in parsed)
  ) {
    throw new Error(`Invalid capability manifest: ${manifestPath}`);
  }
  const data = parsed as {
    metadata: { name: string; version: string; status: string };
    spec: Omit<ManifestAgent['spec'], 'distribution'> & {
      distribution: NonNullable<ManifestAgent['spec']['distribution']>;
      summary: string;
    };
  };
  if (!data.spec.distribution) return undefined;
  if (data.metadata.status !== 'active') {
    throw new Error(
      `Distributed capability must have active status: ${data.metadata.name}`,
    );
  }
  const manifest: ManifestAgent = {
    id: data.metadata.name,
    version: data.metadata.version,
    summary: data.spec.summary,
    spec: {
      dependencies: data.spec.dependencies || {},
      assets: data.spec.assets,
      stages: data.spec.stages,
      distribution: data.spec.distribution,
    },
  };
  const { distribution } = data.spec;
  validateDependencies(manifest, snapshot);

  const capabilityDirectory = path.dirname(manifestPath);
  const { id } = manifest;
  const installedIds = Object.fromEntries(
    distribution.agents.map(assetPath => [
      path.posix.basename(assetPath, '.agent.md').replace(/-agent$/, ''),
      agentId(id, assetPath),
    ]),
  );
  const assets: CapabilityInstallAsset[] = distribution.agents.map(
    assetPath => {
      if (!manifest.spec.assets.agents.includes(assetPath)) {
        const message =
          'Distribution agent is not declared in spec.assets.agents';
        throw new Error(`${message}: ${assetPath}`);
      }
      const installedId = agentId(id, assetPath);
      return {
        path: `${installedId}.agent.md`,
        content: adaptAgentForConsumer(
          readAsset(repoRoot, capabilityDirectory, assetPath),
          installedId,
          installedIds,
        ),
      };
    },
  );
  const documentation = (distribution.documentation || []).map(assetPath => ({
    path: assetPath,
    content: readAsset(repoRoot, capabilityDirectory, assetPath),
  }));
  return {
    id: manifest.id,
    version: manifest.version,
    summary: manifest.summary,
    stages: (manifest.spec.stages || []).map(({ id: stageId, when }) => ({
      id: stageId,
      description: when,
    })),
    agentIds: assets.map(asset => path.basename(asset.path, '.agent.md')),
    documentation,
    assets,
  };
}

export function buildCapabilityCatalog(
  repoRoot: string,
  packageRoot: string,
  snapshot: KnowledgeSnapshot,
): CapabilityCatalog {
  const capabilityRoot = path.join(repoRoot, 'knowledge/capabilities');
  const capabilities = findManifestFiles(capabilityRoot)
    .map(manifestPath => buildCapability(repoRoot, manifestPath, snapshot))
    .filter((capability): capability is CapabilityBundle => Boolean(capability))
    .sort((a, b) => a.id.localeCompare(b.id));
  const frontdoorAgent: CapabilityInstallAsset = {
    path: 'design-system-agent.agent.md',
    content: readAsset(
      repoRoot,
      packageRoot,
      'templates/design-system-agent.agent.md',
    ),
  };
  return { schemaVersion: 1, frontdoorAgent, capabilities };
}
