#!/usr/bin/env node

/**
 * Telemetry Status Tool
 * Reads and displays telemetry from docs-refactor workflow.
 *
 * Usage:
 *   pnpm telemetry:status                    # Show all components
 *   pnpm telemetry:status --component button # Show button telemetry
 *   pnpm telemetry:status --since 1h         # Show events from last hour
 */

import fs from 'fs';
import path from 'path';

const TELEMETRY_LOG = path.resolve(
  process.cwd(),
  'knowledge/capabilities/docs-refactor/.telemetry.log'
);

const args = process.argv.slice(2);
const componentFilter = args.includes('--component')
  ? args[args.indexOf('--component') + 1]
  : null;
const sinceArg = args.includes('--since')
  ? args[args.indexOf('--since') + 1]
  : null;

function parseSinceFilter(sinceArg) {
  if (!sinceArg) return null;

  const units = { h: 3600000, m: 60000, s: 1000 };
  const match = sinceArg.match(/^(\d+)([hms])$/);
  if (!match) {
    console.error('Invalid --since format. Use: 1h, 30m, 60s');
    process.exit(1);
  }

  const [, amount, unit] = match;
  const ms = parseInt(amount) * units[unit];
  return Date.now() - ms;
}

function readTelemetry() {
  if (!fs.existsSync(TELEMETRY_LOG)) {
    return [];
  }

  const lines = fs
    .readFileSync(TELEMETRY_LOG, 'utf-8')
    .split('\n')
    .filter((line) => line.trim());

  return lines.map((line) => {
    try {
      return JSON.parse(line);
    } catch {
      return null;
    }
  }).filter(Boolean);
}

function formatStatus(status) {
  const symbols = { success: '✓', failure: '✗', skipped: '⊘' };
  const colors = {
    success: '\x1b[32m',
    failure: '\x1b[31m',
    skipped: '\x1b[33m',
    reset: '\x1b[0m',
  };
  return `${colors[status]}${symbols[status]}\x1b[0m`;
}

function formatDuration(ms) {
  if (!ms) return '—';
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function displaySummary(events) {
  const sinceCutoff = parseSinceFilter(sinceArg);
  const filtered = events.filter((e) => {
    if (sinceCutoff && new Date(e.ts).getTime() < sinceCutoff) return false;
    if (componentFilter && e.component !== componentFilter) return false;
    return true;
  });

  if (filtered.length === 0) {
    console.log('No telemetry events found.');
    return;
  }

  // Group by component
  const byComponent = {};
  filtered.forEach((event) => {
    if (!byComponent[event.component]) {
      byComponent[event.component] = [];
    }
    byComponent[event.component].push(event);
  });

  // Display summary table
  console.log('\n📊 Docs Refactor Telemetry Summary\n');
  console.log(
    'Component'.padEnd(20),
    'Stage'.padEnd(15),
    'Status'.padEnd(10),
    'Events'.padEnd(8),
    'Total Duration'
  );
  console.log('─'.repeat(70));

  Object.entries(byComponent)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([component, events]) => {
      const latestEvent = events[events.length - 1];
      const stageTransitions = events.filter(
        (e) => e.eventType === 'stage-transition'
      );
      const lastStage = stageTransitions.length
        ? stageTransitions[stageTransitions.length - 1].stage
        : '—';
      const totalDuration = events.reduce((sum, e) => sum + (e.durationMs || 0), 0);

      const statusSymbol = latestEvent.status ? formatStatus(latestEvent.status) : '—';

      console.log(
        component.padEnd(20),
        (lastStage || '—').padEnd(15),
        statusSymbol.padEnd(15),
        String(events.length).padEnd(8),
        formatDuration(totalDuration)
      );
    });

  console.log('\nLegend: ✓ success | ✗ failure | ⊘ skipped\n');
}

const events = readTelemetry();
displaySummary(events);
