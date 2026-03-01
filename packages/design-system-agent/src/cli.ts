#!/usr/bin/env node

/**
 * HPE Design System Agent CLI
 *
 * Command-line interface for the design system agent.
 * Usage: hpeds-ai [options]
 */

import { initializeAgent, version } from './index.js';

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  // Show version
  if (args.includes('--version') || args.includes('-v')) {
    console.log(`hpeds-ai v${version}`);
    process.exit(0);
  }

  // Show help
  if (args.includes('--help') || args.includes('-h') || args.length === 0) {
    console.log(`
HPE Design System Agent v${version}

Usage: hpeds-ai [options] [command]

Commands:
  audit [path]      Audit a project for design system compliance
  fix [path]        Fix design system compliance issues
  generate [path]   Generate code from design system patterns
  config            Show current configuration

Options:
  --version, -v     Show version
  --help, -h        Show this help message
  --config [file]   Path to .hpedsrc config file

Examples:
  hpeds-ai audit .
  hpeds-ai fix src/
  hpeds-ai generate --config ./.hpedsrc
    `);
    process.exit(0);
  }

  // Placeholder for command routing
  const command = args[0];
  const path = args[1] || '.';

  console.log(`[STUB] Running command: ${command} on ${path}`);
  console.log(
    '[STUB] Full implementation pending (Workstream 1: Orchestrator)',
  );

  try {
    initializeAgent({ command, path });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
