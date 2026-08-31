// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
import * as fs from 'node:fs';
import * as path from 'node:path';
import { buildSearchEntities, querySearchEntities } from './vector-search.js';
import { loadComponents, loadPatterns } from './data-loader.js';
import { DesignSystemSchema, FrameworkTarget, PatternGraph, PatternNode } from './types.js';

const REPO_ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../../..');
const INSTRUCTIONS_DIR = path.join(REPO_ROOT, '.github', 'instructions');

interface InstructionFile {
  name: string;
  path: string;
  keywords: string[];
  content: string;
}

function normalizeSearchText(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function loadDesignSystem(): DesignSystemSchema {
  return {
    tokens: {},
    components: loadComponents(),
    patterns: loadPatterns(),
  };
}

function loadInstructionFiles(): InstructionFile[] {
  if (!fs.existsSync(INSTRUCTIONS_DIR)) return [];

  const files = fs
    .readdirSync(INSTRUCTIONS_DIR)
    .filter((file) => file.endsWith('.instructions.md'));

  return files.map((filename) => {
    const filepath = path.join(INSTRUCTIONS_DIR, filename);
    const content = fs.readFileSync(filepath, 'utf-8');
    const keywordMap: Record<string, string[]> = {
      'coding-guidelines.instructions.md': [
        'grommet',
        'component',
        'token',
        'design system',
        'accessibility',
        'button',
        'layout',
        'theme',
      ],
      'grommet.instructions.md': [
        'theme',
        'theming',
        'dark mode',
        'light mode',
        'grommet',
        'setup',
      ],
      'grommet-layouts.instructions.md': [
        'layout',
        'page',
        'shell',
        'app',
        'navigation',
        'header',
        'sidebar',
        'grid',
        'structure',
      ],
      'grommet-responsive.instructions.md': [
        'responsive',
        'mobile',
        'breakpoint',
        'screen size',
        'tablet',
        'desktop',
      ],
      'grommet-data.instructions.md': [
        'data',
        'table',
        'list',
        'datatable',
        'filter',
        'sort',
        'pagination',
      ],
      'styling-UI-components.instructions.md': [
        'style',
        'styling',
        'token',
        'color',
        'spacing',
        'css',
        'design token',
      ],
    };

    return {
      name: filename,
      path: filepath,
      keywords: keywordMap[filename] || [],
      content,
    };
  });
}

function findRelevantInstructions(query: string, instructions: InstructionFile[]): InstructionFile[] {
  const normalizedQuery = normalizeSearchText(query);

  return instructions.filter((instruction) =>
    instruction.keywords.some((keyword) =>
      normalizedQuery.includes(normalizeSearchText(keyword)),
    ),
  );
}

function describePatternGraph(graph: PatternGraph): string {
  const nodeMap = new Map<string, PatternNode>(graph.nodes.map((node) => [node.id, node]));

  const nodeLabel = (node: PatternNode): string =>
    node.role ? `${node.role} (${node.componentId})` : node.componentId;

  const sentences: string[] = [];
  const visited = new Set<string>();

  function dfs(id: string): void {
    if (visited.has(id)) return;
    visited.add(id);

    const node = nodeMap.get(id);
    if (!node) return;

    if (node.children.length > 0) {
      const childList = node.children
        .map((childId) => nodeMap.get(childId) ? nodeLabel(nodeMap.get(childId)!) : childId)
        .join(', ');

      let sentence = `The ${nodeLabel(node)} contains: ${childList}.`;
      if (node.binding && node.binding !== 'static') {
        sentence += ` [${node.binding} — ${node.notes ?? 'varies at runtime'}]`;
      } else if (node.notes) {
        sentence += ` ${node.notes}`;
      }

      const tokenProps = Object.entries(node.props)
        .filter(([, value]) => typeof value === 'string')
        .map(([key, value]) => `${key}="${String(value)}"`)
        .join(', ');
      if (tokenProps) sentence += ` Props: ${tokenProps}.`;

      sentences.push(sentence);
    } else if (node.binding === 'slot' || node.binding === 'state') {
      const note = node.notes ?? 'content provided by the consumer';
      sentences.push(`The ${nodeLabel(node)} is a ${node.binding}: ${note}`);
    }

    node.children.forEach(dfs);
  }

  dfs(graph.rootId);
  return sentences.join(' ');
}

export function generateSystemPrompt(
  userQuery: string,
  targetFramework: FrameworkTarget = 'react',
): string {
  const ds = loadDesignSystem();
  const query = normalizeSearchText(userQuery);
  const instructionFiles = loadInstructionFiles();

  if (!query) {
    return [
      'You are an expert UI developer using the HPE Design System.',
      'Here are the relevant design system definitions based on the user query.',
      '### No Direct Matches Found',
      'No components or patterns directly matched the query.',
      'Consider breaking the request into smaller component names before building.',
    ].join('\n\n');
  }

  const vectorResults = querySearchEntities(buildSearchEntities(ds), userQuery);

  const relevantComponents = ds.components.filter((component) => {
    return (
      query.includes(normalizeSearchText(component.name)) ||
      query.includes(normalizeSearchText(component.id)) ||
      normalizeSearchText(component.description).includes(query)
    );
  });

  const relevantPatterns = ds.patterns.filter((pattern) => {
    const aliasMatch = (pattern.aliases ?? []).some((alias) =>
      query.includes(normalizeSearchText(alias)),
    );
    return (
      query.includes(normalizeSearchText(pattern.name)) ||
      normalizeSearchText(pattern.description).includes(query) ||
      aliasMatch
    );
  });

  vectorResults.forEach(({ entity }) => {
    if (entity.type === 'component') {
      const component = ds.components.find((candidate) => candidate.id === entity.id);
      if (component && !relevantComponents.includes(component)) relevantComponents.push(component);
    }

    if (entity.type === 'pattern') {
      const pattern = ds.patterns.find((candidate) => candidate.id === entity.id);
      if (pattern && !relevantPatterns.includes(pattern)) relevantPatterns.push(pattern);
    }
  });

  relevantPatterns.forEach((pattern) => {
    pattern.relatedComponents?.forEach((componentId) => {
      const component = ds.components.find((candidate) => candidate.id === componentId);
      if (component && !relevantComponents.includes(component)) relevantComponents.push(component);
    });
    (pattern.relatedPatterns ?? []).forEach((patternId) => {
      const related = ds.patterns.find((candidate) => candidate.id === patternId);
      if (related && !relevantPatterns.includes(related)) relevantPatterns.push(related);
    });
  });

  const baseComponents = [...relevantComponents];
  baseComponents.forEach((component) => {
    component.relatedComponents?.forEach((componentId) => {
      const related = ds.components.find((candidate) => candidate.id === componentId);
      if (related && !relevantComponents.includes(related)) relevantComponents.push(related);
    });
  });

  const relevantInstructions = findRelevantInstructions(query, instructionFiles);

  let prompt = 'You are an expert UI developer using the HPE Design System.\n\n';
  prompt += `Here are the relevant design system definitions based on the user's query: "${userQuery}"\n\n`;

  if (relevantComponents.length === 0 && relevantPatterns.length === 0) {
    prompt += '### No Direct Matches Found\n\n';
    prompt += `No components or patterns directly matched the query "${userQuery}".\n`;
    prompt += 'Consider breaking the request into smaller component names and design-system patterns.\n\n';
  }

  if (relevantInstructions.length > 0) {
    prompt += '### Implementation Guidelines\n\n';
    prompt += 'The following repository guidance is relevant to the query:\n\n';
    relevantInstructions.forEach((instruction) => {
      prompt += `#### From ${instruction.name.replace('.instructions.md', '')}:\n\n`;
      prompt += `${instruction.content}\n\n---\n\n`;
    });
  }

  if (relevantComponents.length > 0) {
    prompt += '### Available Components\n\n';
    relevantComponents.forEach((component) => {
      prompt += `#### ${component.name}\n`;
      prompt += `- Description: ${component.description}\n`;
      const resolvedImportPath = component.implementations?.[targetFramework]?.importPath ?? component.importPath;
      prompt += `- Import: ${resolvedImportPath}\n`;
      if (component.usage.whenToUse?.length) {
        prompt += `- When to use: ${component.usage.whenToUse.join(' | ')}\n`;
      }
      if (component.usage.whenToAvoid?.length) {
        prompt += `- When to avoid: ${component.usage.whenToAvoid.join(' | ')}\n`;
      }
      if (component.variants?.length) {
        prompt += `- Variants: ${component.variants.map((variant) => `${variant.name} — ${variant.description} (${variant.when})`).join(' | ')}\n`;
      }
      prompt += '\n';
    });
  }

  if (relevantPatterns.length > 0) {
    prompt += '### Recommended Patterns\n\n';
    relevantPatterns.forEach((pattern) => {
      prompt += `#### ${pattern.name}\n`;
      prompt += `- Problem: ${pattern.problem}\n`;
      prompt += `- Solution: ${pattern.solution}\n`;
      if (pattern.graph) {
        prompt += `- Composition: ${describePatternGraph(pattern.graph)}\n`;
      }
      if (pattern.usage?.whenToUse?.length) {
        prompt += `- When to use:\n${pattern.usage.whenToUse.map((item) => `  - ${item}`).join('\n')}\n`;
      }
      if (pattern.templateCode) {
        prompt += `- Template:\n\n\`\`\`tsx\n${pattern.templateCode}\n\`\`\`\n`;
      }
    });
  }

  return prompt;
}

export { loadDesignSystem };

function printUsage(): void {
  console.log(`
HPE Design System Context Generator

Usage:
  pnpm --filter @hpe-design-system/agent generate -- "Build a login form"
  pnpm --filter @hpe-design-system/agent generate -- "Create a dashboard" --framework react

Arguments:
  query                The user query describing what to build (required)

Options:
  --framework <target> Target framework: react, vue, angular, web-components, agnostic (default: react)
  --help               Show this help message
`);
}

function parseArgs(args: string[]): { query: string | null; framework: FrameworkTarget; help: boolean } {
  let query: string | null = null;
  let framework: FrameworkTarget = 'react';
  let help = false;

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') help = true;
    else if (arg === '--framework' || arg === '-f') {
      const next = args[i + 1];
      if (next) framework = next as FrameworkTarget;
      i += 1;
    } else if (!arg.startsWith('-')) {
      query = arg;
    }
  }

  return { query, framework, help };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { query, framework, help } = parseArgs(process.argv.slice(2));

  if (help || !query) {
    printUsage();
    process.exit(help ? 0 : 1);
  }

  console.log(generateSystemPrompt(query, framework));
}
