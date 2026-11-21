// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import { formatContext, searchKnowledge } from './context-generator.js';
import { getCapability, listCapabilities } from './capabilities.js';
import {
  installDesignSystemAgent,
  uninstallDesignSystemAgent,
} from './agent-installer.js';
import type { KnowledgeSnapshot } from './knowledge.js';
import type { CapabilityCatalog } from './capabilities.js';
import {
  findRule,
  renderChecklist,
  renderRule,
  type RuleDetail,
} from './rules.js';
import type { FrameworkTarget } from './types.js';

const allowedFrameworks: FrameworkTarget[] = [
  'react',
  'vue',
  'angular',
  'web-components',
  'agnostic',
];

function usage(): void {
  console.log(`
HPE Design System Context Generator

Usage:
  hpe-design-agent "Build a login form"
  hpe-design-agent "Create a dashboard" --framework react --json

Options:
  --framework <target>  react, vue, angular, web-components, agnostic
  --json                Structured results (no terminal styling)
  --rules <checklist|full|none>
                        Foundation Rules detail in text (default: checklist)
  --rule <id>           Print one rule in full, without requiring a query
  --checklist           Print all foundation rules, without requiring a query
  capabilities list     List bundled consumer capabilities
  capabilities show <id>
                        Show one bundled capability
  agent install         Install the Design System Agent into .github/agents
  agent uninstall       Remove files owned by the package installer
  --help                Show this help message
`);
}

function runCapabilitiesCommand(
  args: string[],
  loadCapabilities: () => CapabilityCatalog,
): void {
  const [action, ...options] = args;
  const json = options.includes('--json');
  const remaining = options.filter(option => option !== '--json');
  const catalog = loadCapabilities();

  if (action === 'list' && remaining.length === 0) {
    const capabilities = listCapabilities(catalog);
    if (json) console.log(JSON.stringify(capabilities, null, 2));
    else if (capabilities.length === 0) {
      console.log('No consumer capabilities are bundled.');
    } else {
      console.log('Available consumer capabilities:');
      capabilities.forEach(capability =>
        console.log(`- ${capability.id}: ${capability.summary}`),
      );
    }
    return;
  }

  if (action === 'show' && remaining.length === 1) {
    const capability = getCapability(catalog, remaining[0]);
    if (!capability) {
      const validIds = catalog.capabilities.map(item => item.id);
      throw new TypeError(
        [
          `Unknown capability: ${remaining[0]}.`,
          `Available: ${validIds.join(', ') || 'none'}`,
        ].join(' '),
      );
    }
    const detail = {
      id: capability.id,
      version: capability.version,
      summary: capability.summary,
      stages: capability.stages,
      agentIds: capability.agentIds,
      documentation: capability.documentation.map(item => item.path),
    };
    if (json) console.log(JSON.stringify(detail, null, 2));
    else {
      console.log(`${capability.id} (${capability.version})`);
      console.log(capability.summary);
      if (capability.stages.length > 0) {
        console.log('\nStages:');
        capability.stages.forEach(stage =>
          console.log(`- ${stage.id}: ${stage.description}`),
        );
      }
      if (capability.agentIds.length > 0) {
        console.log(
          `\nInstalled helper agents: ${capability.agentIds.join(', ')}`,
        );
      }
    }
    return;
  }
  throw new TypeError(
    'Expected "capabilities list" or "capabilities show <id>".',
  );
}

function parseTarget(args: string[]): {
  workspace: string;
  remaining: string[];
} {
  const targetIndexes = args.flatMap((argument, index) =>
    argument === '--target' ? [index] : [],
  );
  if (targetIndexes.length > 1) {
    throw new TypeError('--target can only be specified once');
  }
  const targetIndex = targetIndexes[0];
  if (targetIndex === undefined) {
    return { workspace: process.cwd(), remaining: args };
  }
  const workspace = args[targetIndex + 1];
  if (!workspace || workspace.startsWith('-')) {
    throw new TypeError('Missing value for --target');
  }
  const remaining = args.filter(
    (_, index) => index !== targetIndex && index !== targetIndex + 1,
  );
  return { workspace, remaining };
}

function runAgentCommand(
  args: string[],
  loadCapabilities: () => CapabilityCatalog,
): void {
  const [action, ...options] = args;
  const { workspace, remaining } = parseTarget(options);
  if (action === 'install') {
    const dryRun = remaining.includes('--dry-run');
    const overwrite = remaining.includes('--overwrite');
    const unknownOptions = remaining.filter(
      option => option !== '--dry-run' && option !== '--overwrite',
    );
    if (unknownOptions.length > 0) {
      throw new TypeError(`Unknown agent install option: ${unknownOptions[0]}`);
    }
    const files = installDesignSystemAgent(loadCapabilities(), {
      workspace,
      dryRun,
      overwrite,
    });
    const actionDescription = dryRun ? 'Would install' : 'Installed';
    console.log(
      `${actionDescription} ${files.length} HPE Design System Agent files:`,
    );
    files.forEach(file => console.log(`- ${file}`));
    return;
  }
  if (action === 'uninstall' && remaining.length === 0) {
    const removed = uninstallDesignSystemAgent(workspace);
    console.log(`Removed ${removed.length} HPE Design System Agent files.`);
    return;
  }
  throw new TypeError('Expected "agent install" or "agent uninstall".');
}

export function runCli(
  load: () => KnowledgeSnapshot,
  mode: 'source' | 'bundled',
  loadCapabilities: () => CapabilityCatalog,
): void {
  try {
    const args = process.argv.slice(2);
    if (args[0] === 'capabilities') {
      runCapabilitiesCommand(args.slice(1), loadCapabilities);
      return;
    }
    if (args[0] === 'agent') {
      runAgentCommand(args.slice(1), loadCapabilities);
      return;
    }
    const positional: string[] = [];
    let framework: FrameworkTarget = 'react';
    let json = false;
    let help = false;
    let ruleDetail: RuleDetail | 'none' = 'checklist';
    let ruleId: string | undefined;
    let checklist = false;
    for (let i = 0; i < args.length; i += 1) {
      const arg = args[i];
      if (arg === '--help' || arg === '-h') help = true;
      else if (arg === '--json') json = true;
      else if (arg === '--checklist') checklist = true;
      else if (arg === '--framework' || arg === '-f') {
        i += 1;
        const next = args[i];
        if (!next || next.startsWith('-')) {
          throw new TypeError(`Missing value for ${arg}`);
        }
        const target = allowedFrameworks.find(value => value === next);
        if (!target) {
          const expected = allowedFrameworks.join(', ');
          throw new TypeError(
            `Unknown framework target: ${next}. Expected one of: ${expected}`,
          );
        }
        framework = target;
      } else if (arg === '--rules' || arg === '--rule') {
        i += 1;
        const next = args[i];
        if (!next || next.startsWith('-')) {
          throw new TypeError(`Missing value for ${arg}`);
        }
        if (arg === '--rule') ruleId = next;
        else {
          const details = ['checklist', 'full', 'none'] as const;
          const detail = details.find(value => value === next);
          if (!detail) {
            const expected = details.join(', ');
            throw new TypeError(
              `Unknown rules detail: ${next}. Expected one of: ${expected}`,
            );
          }
          ruleDetail = detail;
        }
      } else if (arg === '--') {
        // Package managers may forward their argument separator.
      } else if (arg.startsWith('-')) {
        throw new TypeError(`Unknown option: ${arg}`);
      } else positional.push(arg);
    }
    if (help) {
      usage();
      return;
    }
    if (checklist && ruleId) {
      throw new TypeError('--checklist and --rule cannot be used together');
    }
    if (checklist || ruleId) {
      if (json) {
        throw new TypeError('--json cannot be used with --rule or --checklist');
      }
      const { foundations, glossary } = load().content;
      if (checklist) {
        console.log(`### Foundation Rules\n\n${renderChecklist(foundations)}`);
      } else if (ruleId) {
        const match = findRule(foundations, ruleId);
        if (!match) {
          const validIds = foundations.flatMap(foundation =>
            foundation.rules.map(rule => rule.id),
          );
          throw new TypeError(
            `Unknown rule id: ${ruleId}. Valid ids: ${validIds.join(', ')}`,
          );
        }
        console.log(renderRule(match.foundation, match.rule, glossary));
      }
      return;
    }
    const query = positional.join(' ');
    if (!query.trim()) throw new TypeError('Query must be a non-empty string.');
    const result = searchKnowledge(load(), mode, query, framework);
    console.log(
      json ? JSON.stringify(result) : formatContext(result, ruleDetail),
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Error: ${message}`);
    if (error instanceof TypeError && !process.argv.includes('--json')) usage();
    process.exitCode = 1;
  }
}
