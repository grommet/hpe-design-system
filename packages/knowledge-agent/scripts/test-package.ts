// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import assert from 'node:assert/strict';
import { execFileSync, spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { loadSourceKnowledge, repoRoot } from '../src/source-knowledge.js';
import { loadSourceCapabilityCatalog } from '../src/source-capabilities.js';
import { searchKnowledge } from '../src/context-generator.js';
import { validateCandidateSource, writeCandidate } from './candidate.js';
import type { KnowledgeSnapshot } from '../src/knowledge.js';

const packageRoot = fileURLToPath(new URL('../', import.meta.url));
const { values } = parseArgs({
  options: { 'candidate-dir': { type: 'string' } },
});
const candidateDirectory = values['candidate-dir'];
const temporary = mkdtempSync(
  path.join(os.tmpdir(), 'hpe-knowledge-consumer-'),
);
const npm = (...args: string[]) =>
  execFileSync('npm', args, {
    cwd: packageRoot,
    encoding: 'utf8',
    shell: process.platform === 'win32',
  });

try {
  const source = loadSourceKnowledge({ strict: true });
  const sourceCapabilityCatalog = loadSourceCapabilityCatalog();
  const candidateSource = {
    snapshot: source,
    requestedVersion: process.env.REQUESTED_VERSION,
    expectedCommit: process.env.EXPECTED_COMMIT,
  };
  if (candidateDirectory) validateCandidateSource(candidateSource);
  const [packed]: {
    filename: string;
    files: { path: string }[];
  }[] = JSON.parse(
    npm('pack', '--ignore-scripts', '--json', '--pack-destination', temporary),
  );
  const runtimeModules = [
    'agent-installer',
    'bin',
    'bundled-capabilities',
    'bundled-knowledge',
    'capabilities',
    'cli-adapter',
    'context-generator',
    'index',
    'knowledge',
    'rules',
    'types',
    'vector-search',
  ];
  const allowed = new Set([
    'package.json',
    'README.md',
    'bin/cli.js',
    'dist/LICENSE',
    'dist/capabilities.json',
    'dist/knowledge.json',
    'dist/knowledge.schema.json',
    'dist/knowledge/core/data/types.js',
    'dist/knowledge/core/data/types.d.ts',
    ...runtimeModules.flatMap(name => [
      `dist/packages/knowledge-agent/src/${name}.js`,
      `dist/packages/knowledge-agent/src/${name}.d.ts`,
    ]),
  ]);
  packed.files.forEach(file => {
    assert(allowed.has(file.path), `Unexpected packed file: ${file.path}`);
  });
  allowed.forEach(file => {
    assert(
      packed.files.some(entry => entry.path === file),
      `Missing packed file: ${file}`,
    );
  });
  const tarball = path.join(temporary, packed.filename);
  writeFileSync(
    path.join(temporary, 'package.json'),
    '{"private":true,"type":"module"}\n',
  );
  execFileSync(
    'npm',
    [
      'install',
      tarball,
      '--omit=dev',
      '--ignore-scripts',
      '--no-audit',
      '--no-fund',
      '--package-lock=false',
    ],
    { cwd: temporary, stdio: 'inherit', shell: process.platform === 'win32' },
  );

  const installed = path.join(
    temporary,
    'node_modules/@hpe-design/knowledge-agent',
  );
  assert(
    !existsSync(path.join(installed, 'src')),
    'Source code must not supply runtime files',
  );
  const consumerInstructions = path.join(temporary, '.github/instructions');
  mkdirSync(consumerInstructions, { recursive: true });
  writeFileSync(
    path.join(consumerInstructions, 'grommet-layouts.instructions.md'),
    'CONSUMER_INSTRUCTIONS_MUST_NOT_BE_READ',
  );
  const blocker = path.join(temporary, 'no-network.cjs');
  writeFileSync(
    blocker,
    `
const blocked = () => { throw new Error('Runtime networking is disabled'); };
require('node:net').Socket.prototype.connect = blocked;
require('node:http').request = blocked;
require('node:http').get = blocked;
require('node:https').request = blocked;
require('node:https').get = blocked;
globalThis.fetch = blocked;
require('node:module').syncBuiltinESMExports();
`,
  );
  const node = (...args: string[]) =>
    spawnSync(process.execPath, ['--require', blocker, ...args], {
      cwd: temporary,
      encoding: 'utf8',
      env: { ...process.env, NODE_PATH: '' },
    });
  const cli = path.join(installed, 'bin/cli.js');
  [
    ['Build a login form', 'login-form'],
    ['Create an app shell with navigation', 'application-shell'],
    ['Build a data table with filtering', 'data-table-with-filtering'],
  ].forEach(([query, expected]) => {
    const result = node(cli, query, '--json');
    assert.equal(result.status, 0, result.stderr);
    const output = JSON.parse(result.stdout);
    assert.equal(
      output.knowledge.mode,
      'bundled',
      JSON.stringify({
        keys: Object.keys(output),
        knowledge: output.knowledge,
        status: output.status,
      }),
    );
    assert.equal(output.knowledge.contentDigest, source.contentDigest);
    assert(
      output.patterns.some(
        (pattern: { id: string }) => pattern.id === expected,
      ),
    );
    const live = JSON.parse(
      JSON.stringify(searchKnowledge(source, 'source', query)),
    );
    assert.deepEqual(output.components, live.components);
    assert.deepEqual(output.patterns, live.patterns);
    assert.deepEqual(output.instructions, live.instructions);
    assert.deepEqual(output.foundations, live.foundations);
    assert.deepEqual(output.glossary, live.glossary);
    assert(!result.stdout.includes('\u001B['));
    assert(!result.stdout.includes(repoRoot));
    assert(!result.stdout.includes('CONSUMER_INSTRUCTIONS_MUST_NOT_BE_READ'));
    assert(
      output.patterns.find((pattern: { id: string }) => pattern.id === expected)
        .templateCode,
    );
  });
  const consumer = path.join(temporary, 'consumer.mjs');
  writeFileSync(
    consumer,
    `
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { connect } from 'node:net';
import {
  searchDesignSystem, generateSystemPrompt,
  getCapability, listCapabilities, loadBundledCapabilityCatalog,
} from '@hpe-design/knowledge-agent';
const require = createRequire(import.meta.url);
assert.throws(() => connect(443, 'example.invalid'), /networking is disabled/);
assert.throws(() => require.resolve('tsx'));
assert.equal(searchDesignSystem('qzxjkvxyz').status, 'no-match');
assert.equal(searchDesignSystem('!!!').patterns.length, 0);
assert.throws(() => searchDesignSystem('  '), /non-empty/);
assert.throws(() => searchDesignSystem('login', 'svelte'), /framework/);
const result = searchDesignSystem('Create a page layout', 'vue');
assert.equal(result.frameworkStatus, 'conceptual');
assert.equal(result.diagnostics[0].code, 'conceptual-framework');
assert(result.instructions.some(
  item => item.name === 'grommet-layouts.instructions.md',
));
const prompt = generateSystemPrompt('Build a login form', 'vue');
assert(prompt.includes('not yet fully validated'));
assert(!prompt.includes(String.fromCharCode(27) + '['));
assert(!prompt.includes('\`\`\`tsx'));
assert(prompt.includes('### Foundation Rules'));
const withoutRules = generateSystemPrompt(
  'Build a login form', 'react', 'none',
);
assert(!withoutRules.includes('### Foundation Rules'));
const fullRules = generateSystemPrompt('Build a login form', 'react', 'full');
assert(fullRules.includes('****Rationale:****'));
const capabilityCatalog = loadBundledCapabilityCatalog();
assert.deepEqual(
  listCapabilities(capabilityCatalog).map(item => item.id),
  ['alignment-audit'],
);
assert.equal(
  getCapability(capabilityCatalog, 'alignment-audit')?.assets.length,
  3,
);
assert.equal(getCapability(capabilityCatalog, 'docs-refactor'), undefined);
process.stdout.write('consumer checks passed\\n');
`,
  );
  const imported = node(consumer);
  assert.equal(imported.status, 0, imported.stderr);
  assert.equal(imported.stdout, 'consumer checks passed\n');
  const linkedBin = path.join(
    temporary,
    'node_modules/.bin',
    process.platform === 'win32' ? 'hpe-design-agent.cmd' : 'hpe-design-agent',
  );
  const preload = JSON.stringify(blocker);
  const linked = spawnSync(linkedBin, ['Build a login form', '--json'], {
    cwd: temporary,
    encoding: 'utf8',
    shell: process.platform === 'win32',
    env: {
      ...process.env,
      NODE_PATH: '',
      NODE_OPTIONS: `${process.env.NODE_OPTIONS ?? ''} --require ${preload}`,
    },
  });
  assert.equal(linked.status, 0, linked.stderr);
  assert.equal(JSON.parse(linked.stdout).status, 'matched');
  const text = node(cli, 'Build a login form');
  assert.equal(text.status, 0, text.stderr);
  assert(text.stdout.includes('Login Form'));
  assert(text.stdout.includes('### Foundation Rules'));
  const checklist = node(cli, '--checklist');
  assert.equal(checklist.status, 0, checklist.stderr);
  assert(checklist.stdout.includes('[color-names-its-target]'));
  assert(!checklist.stdout.includes('http'));
  const rule = node(cli, '--rule', 'color-names-its-target');
  assert.equal(rule.status, 0, rule.stderr);
  assert(rule.stdout.includes('****Rationale:****'));
  assert(rule.stdout.includes('The part of the UI a color token'));
  const noRules = node(cli, 'Build a login form', '--rules', 'none');
  assert.equal(noRules.status, 0, noRules.stderr);
  assert(!noRules.stdout.includes('### Foundation Rules'));
  const invalid = node(cli, '  ', '--json');
  assert.equal(invalid.status, 1);
  assert(invalid.stderr.includes('non-empty'));
  assert.equal(invalid.stdout, '');

  const capabilitiesList = node(cli, 'capabilities', 'list', '--json');
  assert.equal(capabilitiesList.status, 0, capabilitiesList.stderr);
  assert.deepEqual(
    JSON.parse(capabilitiesList.stdout).map(
      (capability: { id: string }) => capability.id,
    ),
    ['alignment-audit'],
  );
  const capabilityDetail = node(
    cli,
    'capabilities',
    'show',
    'alignment-audit',
    '--json',
  );
  assert.equal(capabilityDetail.status, 0, capabilityDetail.stderr);
  assert(
    JSON.parse(capabilityDetail.stdout).agentIds.includes(
      'hpe-design-system-alignment-audit-evaluator',
    ),
  );

  const consumerWorkspace = path.join(temporary, 'consumer-workspace');
  mkdirSync(consumerWorkspace);
  const dryRun = node(
    cli,
    'agent',
    'install',
    '--target',
    consumerWorkspace,
    '--dry-run',
  );
  assert.equal(dryRun.status, 0, dryRun.stderr);
  assert(!existsSync(path.join(consumerWorkspace, '.github')));
  const installedAgents = node(
    cli,
    'agent',
    'install',
    '--target',
    consumerWorkspace,
  );
  assert.equal(installedAgents.status, 0, installedAgents.stderr);
  const agentsDirectory = path.join(consumerWorkspace, '.github/agents');
  const installedAgentFiles = [
    'design-system-agent.agent.md',
    'hpe-design-system-alignment-audit-evaluator.agent.md',
    'hpe-design-system-alignment-audit-remediation-planner.agent.md',
    'hpe-design-system-alignment-audit-remediation-executor.agent.md',
  ];
  installedAgentFiles.forEach(fileName =>
    assert(existsSync(path.join(agentsDirectory, fileName)), fileName),
  );
  const helper = readFileSync(
    path.join(agentsDirectory, installedAgentFiles[1]),
    'utf8',
  );
  const frontdoor = readFileSync(
    path.join(agentsDirectory, installedAgentFiles[0]),
    'utf8',
  );
  assert(frontdoor.includes('name: hpe-design-system'));
  assert(frontdoor.includes('approval'));
  assert(frontdoor.includes('alignment-audit'));
  assert(helper.includes('user-invocable: false'));
  assert(helper.includes('tools:'));
  assert(helper.includes('execute'));
  assert(helper.includes('hpe-design-agent'));
  assert(
    !/pnpm --filter @hpe-design\/knowledge-agent\s+\S+/.test(helper),
    [
      'Consumer helpers must not contain executable',
      'knowledge-agent monorepo commands',
    ].join(' '),
  );
  assert(!helper.includes('design-system-maintainer.agent.md'));
  const installedInventory = readdirSync(agentsDirectory);
  const installedProfileCount = installedInventory.filter(fileName =>
    fileName.endsWith('.agent.md'),
  ).length;
  assert.equal(installedProfileCount, 4);

  const blockedWorkspace = path.join(temporary, 'blocked-workspace');
  const blockedAgents = path.join(blockedWorkspace, '.github/agents');
  mkdirSync(blockedAgents, { recursive: true });
  const userOwnedAgent = path.join(
    blockedAgents,
    'design-system-agent.agent.md',
  );
  writeFileSync(userOwnedAgent, 'user-owned');
  const blockedInstall = node(
    cli,
    'agent',
    'install',
    '--target',
    blockedWorkspace,
  );
  assert.equal(blockedInstall.status, 1);
  assert(blockedInstall.stderr.includes('--overwrite'));
  assert.equal(readFileSync(userOwnedAgent, 'utf8'), 'user-owned');
  writeFileSync(path.join(blockedAgents, 'unrelated.agent.md'), 'keep');
  const replacedInstall = node(
    cli,
    'agent',
    'install',
    '--target',
    blockedWorkspace,
    '--overwrite',
  );
  assert.equal(replacedInstall.status, 0, replacedInstall.stderr);
  const uninstalled = node(
    cli,
    'agent',
    'uninstall',
    '--target',
    blockedWorkspace,
  );
  assert.equal(uninstalled.status, 0, uninstalled.stderr);
  assert(!existsSync(userOwnedAgent));
  assert.equal(
    readFileSync(path.join(blockedAgents, 'unrelated.agent.md'), 'utf8'),
    'keep',
  );

  const declarationConsumer = path.join(temporary, 'consumer.mts');
  writeFileSync(
    declarationConsumer,
    `
import {
  searchDesignSystem, generateSystemPrompt,
  getCapability, listCapabilities, loadBundledCapabilityCatalog,
  type QueryResult, type ComponentDefinition,
  type RuleDetail, type CapabilityDescriptor,
} from '@hpe-design/knowledge-agent';
const result: QueryResult = searchDesignSystem('Build a login form');
const components: ComponentDefinition[] = result.components;
const prompt: string = generateSystemPrompt(components[0].name, 'react');
const detail: RuleDetail = 'full';
generateSystemPrompt(components[0].name, 'react', detail);
const capabilities: CapabilityDescriptor[] = listCapabilities(
  loadBundledCapabilityCatalog(),
);
getCapability(loadBundledCapabilityCatalog(), capabilities[0].id);
void prompt;
`,
  );
  execFileSync(
    process.execPath,
    [
      path.join(repoRoot, 'node_modules/typescript/bin/tsc'),
      '--noEmit',
      '--strict',
      '--module',
      'NodeNext',
      '--moduleResolution',
      'NodeNext',
      '--target',
      'ES2022',
      declarationConsumer,
    ],
    { cwd: temporary, stdio: 'inherit' },
  );

  const snapshotFile = path.join(installed, 'dist/knowledge.json');
  const snapshot = readFileSync(snapshotFile, 'utf8');
  const bundledSnapshot: KnowledgeSnapshot = JSON.parse(snapshot);
  assert.deepEqual(bundledSnapshot, JSON.parse(JSON.stringify(source)));
  assert.deepEqual(
    JSON.parse(
      readFileSync(path.join(installed, 'dist/capabilities.json'), 'utf8'),
    ),
    sourceCapabilityCatalog,
  );
  const installedManifest = JSON.parse(
    readFileSync(path.join(installed, 'package.json'), 'utf8'),
  );
  assert.equal(installedManifest.name, '@hpe-design/knowledge-agent');
  assert.equal(installedManifest.version, source.packageVersion);
  [
    '{',
    JSON.stringify({ ...JSON.parse(snapshot), schemaVersion: 999 }),
    JSON.stringify({ ...JSON.parse(snapshot), contentDigest: 'tampered' }),
    JSON.stringify({
      ...JSON.parse(snapshot),
      content: { ...JSON.parse(snapshot).content, components: [{}] },
    }),
  ].forEach(broken => {
    writeFileSync(snapshotFile, broken);
    const result = node(cli, 'Build a login form', '--json');
    assert.equal(result.status, 1);
    assert(result.stderr.includes('Unable to load bundled'));
    assert.equal(result.stdout, '');
  });
  rmSync(snapshotFile);
  assert.equal(node(cli, 'Build a login form').status, 1);
  assert.equal(node(cli, '--help').status, 0);
  const digest = createHash('sha256')
    .update(readFileSync(tarball))
    .digest('hex');
  console.log(`OK packed consumer: ${packed.files.length} files.`);
  console.log(`Tarball sha256: ${digest}`);
  if (candidateDirectory) {
    writeCandidate({
      ...candidateSource,
      snapshot: bundledSnapshot,
      tarball,
      directory: path.resolve(candidateDirectory),
    });
    console.log(
      `Verified candidate saved to ${path.resolve(candidateDirectory)}`,
    );
  }
} finally {
  rmSync(temporary, { recursive: true, force: true });
}
