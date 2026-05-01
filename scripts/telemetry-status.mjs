#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const ROOT = process.cwd();
const MANIFEST_PATH = path.resolve(
  ROOT,
  'knowledge/capabilities/docs-refactor/manifest.yaml',
);

function parseArgs(argv) {
  const parsed = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      let value = true;
      const nextArg = argv[i + 1];
      if (nextArg && !nextArg.startsWith('--')) {
        value = nextArg;
        i += 1;
      }
      parsed[key] = value;
    }
  }
  return parsed;
}

/* eslint-disable max-len */
function printHelp() {
  console.log(`
Docs refactor telemetry viewer

Usage:
  pnpm telemetry:status [options]

Options:
  --component <name>     Filter to one component
  --since <1h|30m|60s>   Time filter
  --view <mode>          summary | timeline | chart | html | all (default: summary)
  --htmlOut <path>       Output HTML path when view includes html
  --svgOut <path>        Output SVG path when used with html or all
  --help                 Show this help
`);
}
/* eslint-enable max-len */

  function parseSinceFilter(sinceArg) {
  if (!sinceArg) return null;
  const units = { h: 3600000, m: 60000, s: 1000 };
  const match = String(sinceArg).match(/^(\d+)([hms])$/);
  if (!match) {
    console.error('Invalid --since format. Use: 1h, 30m, 60s');
    process.exit(1);
  }
  return Date.now() - Number(match[1]) * units[match[2]];
}

function getLogPath() {
  const manifest = yaml.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const cfg = manifest?.spec?.['x-extensions']?.telemetry ?? {};
  return path.resolve(
    ROOT,
    cfg.logFile || 'knowledge/capabilities/docs-refactor/.telemetry.log',
  );
}

function readTelemetry(logPath) {
  if (!fs.existsSync(logPath)) return [];
  return fs
    .readFileSync(logPath, 'utf8')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      try {
        return JSON.parse(line);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

function formatStatus(status) {
  const symbols = { success: '✓', failure: '✗', skipped: '⊘' };
  const colors = {
    success: '\x1b[32m',
    failure: '\x1b[31m',
    skipped: '\x1b[33m',
  };
  if (!status || !symbols[status]) return '—';
  return `${colors[status]}${symbols[status]}\x1b[0m`;
}

function formatDuration(ms) {
  if (ms === null || ms === undefined) return '—';
  if (!Number.isFinite(Number(ms))) return '—';
  if (Number(ms) === 0) return '0ms';
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}

function filterEvents(events, args) {
  const sinceCutoff = parseSinceFilter(args.since);
  return events.filter(e => {
    if (sinceCutoff && new Date(e.ts).getTime() < sinceCutoff) return false;
    if (args.component && e.component !== args.component) return false;
    return true;
  });
}

function groupByComponent(events) {
  const grouped = {};
  events.forEach(event => {
    grouped[event.component] = grouped[event.component] || [];
    grouped[event.component].push(event);
  });
  return grouped;
}

function isWorkflowTerminalEvent(event) {
  return (
    event &&
    (event.eventType === 'workflow-complete' ||
      event.eventType === 'workflow-error')
  );
}

function toTimestampMs(value) {
  const ts = new Date(value).getTime();
  return Number.isFinite(ts) ? ts : null;
}

function toDurationMs(value) {
  const duration = Number(value);
  if (!Number.isFinite(duration) || duration < 0) {
    return 0;
  }
  return duration;
}

function getCurrentRunEvents(componentEvents) {
  const ordered = [...componentEvents].sort(
    (a, b) => toTimestampMs(a.ts) - toTimestampMs(b.ts),
  );

  let startIndex = 0;
  for (let i = ordered.length - 2; i >= 0; i -= 1) {
    if (isWorkflowTerminalEvent(ordered[i])) {
      startIndex = i + 1;
      break;
    }
  }

  return ordered.slice(startIndex);
}

function computeWorkflowMetrics(events) {
  if (events.length === 0) {
    return {
      workflowElapsedMs: 0,
      delegatedDurationMs: 0,
      orchestratorActiveMs: 0,
      orchestrationOverheadMs: 0,
    };
  }

  const ordered = [...events].sort(
    (a, b) => toTimestampMs(a.ts) - toTimestampMs(b.ts),
  );
  const firstTs = toTimestampMs(ordered[0].ts);
  const lastTs = toTimestampMs(ordered[ordered.length - 1].ts);

  const workflowElapsedMs =
    firstTs === null || lastTs === null ? 0 : Math.max(0, lastTs - firstTs);

  const delegatedDurationMs = ordered
    .filter(event => event.eventType === 'agent-complete')
    .reduce((sum, event) => sum + toDurationMs(event.durationMs), 0);

  const explicitOrchestratorMs = ordered
    .filter(
      event =>
        event.eventType === 'stage-transition' ||
        event.eventType === 'workflow-complete' ||
        event.eventType === 'workflow-error',
    )
    .reduce((sum, event) => sum + toDurationMs(event.durationMs), 0);

  const orchestrationOverheadMs = Math.max(
    0,
    workflowElapsedMs - delegatedDurationMs,
  );
  const orchestratorActiveMs =
    explicitOrchestratorMs > 0
      ? explicitOrchestratorMs
      : orchestrationOverheadMs;

  return {
    workflowElapsedMs,
    delegatedDurationMs,
    orchestratorActiveMs,
    orchestrationOverheadMs,
  };
}

function getComponentSummary(componentEvents) {
  const latest = componentEvents[componentEvents.length - 1];
  const lastStageEvent = [...componentEvents]
    .reverse()
    .find(e => e.eventType === 'stage-transition');
  const stage = latest.stage || (lastStageEvent && lastStageEvent.stage) || '—';
  const duration = componentEvents.reduce(
    (sum, e) => sum + (Number.isFinite(e.durationMs) ? e.durationMs : 0),
    0,
  );
  const runEvents = getCurrentRunEvents(componentEvents);
  const computedMetrics = computeWorkflowMetrics(runEvents);
  const metadataMetrics = latest?.metadata?.workflowMetrics;
  const workflowMetrics = metadataMetrics
    ? {
        workflowElapsedMs: toDurationMs(metadataMetrics.workflowElapsedMs),
        delegatedDurationMs: toDurationMs(metadataMetrics.delegatedDurationMs),
        orchestratorActiveMs: toDurationMs(
          metadataMetrics.orchestratorActiveMs,
        ),
        orchestrationOverheadMs: toDurationMs(
          metadataMetrics.orchestrationOverheadMs,
        ),
      }
    : computedMetrics;

  return {
    latest,
    stage,
    duration,
    count: componentEvents.length,
    workflowMetrics,
  };
}

function displaySummary(filtered) {
  if (filtered.length === 0) {
    console.log('No telemetry events found.');
    return;
  }

  const byComponent = groupByComponent(filtered);

  console.log('\nDocs Refactor Telemetry Summary\n');
  console.log(
    'Component'.padEnd(20),
    'Stage'.padEnd(16),
    'Status'.padEnd(10),
    'Events'.padEnd(8),
    'Elapsed'.padEnd(10),
    'Delegated'.padEnd(10),
    'Orch'.padEnd(10),
    'Overhead',
  );
  console.log('-'.repeat(104));

  Object.entries(byComponent)
    .sort(([a], [b]) => a.localeCompare(b))
    .forEach(([component, componentEvents]) => {
      const summary = getComponentSummary(componentEvents);
      console.log(
        component.padEnd(20),
        summary.stage.padEnd(16),
        formatStatus(summary.latest.status).padEnd(15),
        String(summary.count).padEnd(8),
        formatDuration(summary.workflowMetrics.workflowElapsedMs).padEnd(10),
        formatDuration(summary.workflowMetrics.delegatedDurationMs).padEnd(10),
        formatDuration(summary.workflowMetrics.orchestratorActiveMs).padEnd(10),
        formatDuration(summary.workflowMetrics.orchestrationOverheadMs),
      );
    });

  console.log('\nLegend: ✓ success | ✗ failure | ⊘ skipped\n');
}

function displayTimeline(filtered) {
  if (filtered.length === 0) {
    console.log('No telemetry events found.');
    return;
  }

  const sorted = [...filtered].sort(
    (a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime(),
  );

  console.log('\nDocs Refactor Telemetry Timeline\n');
  console.log(
    'Timestamp'.padEnd(25),
    'Component'.padEnd(14),
    'Event'.padEnd(18),
    'Stage'.padEnd(18),
    'Agent'.padEnd(24),
    'Status'.padEnd(8),
    'Duration',
  );
  console.log('-'.repeat(124));

  sorted.forEach(e => {
    console.log(
      String(e.ts || '—').padEnd(25),
      String(e.component || '—').padEnd(14),
      String(e.eventType || '—').padEnd(18),
      String(e.stage || '—').padEnd(18),
      String(e.agent || '—').padEnd(24),
      String(e.status || '—').padEnd(8),
      formatDuration(e.durationMs),
    );
  });
  console.log('');
}

function displayAgentChart(filtered) {
  if (filtered.length === 0) {
    console.log('No telemetry events found.');
    return;
  }

  const completes = filtered.filter(
    e => e.eventType === 'agent-complete' && e.agent,
  );

  if (completes.length === 0) {
    console.log('No agent-complete events found for chart mode.');
    return;
  }

  const totals = {};
  completes.forEach(e => {
    totals[e.agent] = (totals[e.agent] || 0) + (Number(e.durationMs) || 0);
  });

  const rows = Object.entries(totals).sort((a, b) => b[1] - a[1]);
  const maxDuration = rows[0][1] || 1;
  const maxWidth = 32;

  console.log('\nDocs Refactor Agent Duration Chart\n');
  rows.forEach(([agent, duration]) => {
    const width = Math.max(1, Math.round((duration / maxDuration) * maxWidth));
    const bar = '#'.repeat(width);
    console.log(
      agent.padEnd(26),
      bar.padEnd(maxWidth),
      formatDuration(duration),
    );
  });
  console.log('');
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function getAgentDurationRows(events) {
  const totals = {};

  events
    .filter(event => event.eventType === 'agent-complete' && event.agent)
    .forEach(event => {
      totals[event.agent] =
        (totals[event.agent] || 0) + (Number(event.durationMs) || 0);
    });

  return Object.entries(totals).sort((a, b) => b[1] - a[1]);
}

function getStageTransitionRows(events) {
  const totals = {};

  events
    .filter(event => event.eventType === 'stage-transition' && event.stage)
    .forEach(event => {
      totals[event.stage] = (totals[event.stage] || 0) + 1;
    });

  return Object.entries(totals).sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  );
}

/* eslint-disable max-len */

function renderHorizontalBarSvg({
  rows,
  title,
  description,
  idPrefix,
  barColor,
  valueFormatter,
}) {
  if (rows.length === 0) {
    return '<p class="meta">No chartable telemetry events available.</p>';
  }

  const width = 900;
  const leftPad = 220;
  const rightPad = 88;
  const topPad = 28;
  const bottomPad = 28;
  const rowHeight = 36;
  const barHeight = 20;
  const chartWidth = width - leftPad - rightPad;
  const height = topPad + bottomPad + rows.length * rowHeight;
  const maxValue = rows[0][1] || 1;

  const bars = rows
    .map(([label, value], index) => {
      const y = topPad + index * rowHeight;
      const scaledWidth = Math.max(
        2,
        Math.round((value / maxValue) * chartWidth),
      );
      const labelY = y + 14;
      const valueX = leftPad + scaledWidth + 10;

      return [
        `<text x="${leftPad - 12}" y="${labelY}" text-anchor="end" fill="#344054" font-size="12">${escapeHtml(label)}</text>`,
        `<rect x="${leftPad}" y="${y}" width="${scaledWidth}" height="${barHeight}" rx="6" fill="${barColor}" />`,
        `<text x="${valueX}" y="${labelY}" fill="#475467" font-size="12">${escapeHtml(valueFormatter(value))}</text>`,
      ].join('');
    })
    .join('');

  return `<svg viewBox="0 0 ${width} ${height}" width="100%" height="${height}" role="img" aria-labelledby="${idPrefix}-title ${idPrefix}-desc">
    <title id="${idPrefix}-title">${escapeHtml(title)}</title>
    <desc id="${idPrefix}-desc">${escapeHtml(description)}</desc>
    <rect x="0" y="0" width="${width}" height="${height}" fill="#ffffff" />
    <line x1="${leftPad}" y1="12" x2="${leftPad}" y2="${height - bottomPad + 4}" stroke="#d0d5dd" stroke-width="1" />
    ${bars}
  </svg>`;
}

function renderAgentDurationSvg(rows) {
  return renderHorizontalBarSvg({
    rows,
    title: 'Agent duration chart',
    description: 'Horizontal bar chart of total telemetry duration by agent.',
    idPrefix: 'telemetry-agent-chart',
    barColor: '#00739d',
    valueFormatter: value => formatDuration(value),
  });
}

function renderStageTransitionSvg(rows) {
  return renderHorizontalBarSvg({
    rows,
    title: 'Stage transition count chart',
    description:
      'Horizontal bar chart of stage-transition event counts by stage.',
    idPrefix: 'telemetry-stage-chart',
    barColor: '#0b6e4f',
    valueFormatter: value => `${value} event${value === 1 ? '' : 's'}`,
  });
}

function writeSvgDashboard(filtered, svgOutArg) {
  if (!svgOutArg) {
    return;
  }

  if (filtered.length === 0) {
    console.log('No telemetry events found. Skipping SVG export.');
    return;
  }

  const outPath = path.resolve(ROOT, svgOutArg);
  const agentDurationRows = getAgentDurationRows(filtered);
  const stageTransitionRows = getStageTransitionRows(filtered);
  const agentSvg = renderAgentDurationSvg(agentDurationRows);
  const stageSvg = renderStageTransitionSvg(stageTransitionRows);
  const generatedAt = escapeHtml(new Date().toISOString());

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="980" viewBox="0 0 1000 980" role="img" aria-labelledby="telemetry-dashboard-title telemetry-dashboard-desc">
  <title id="telemetry-dashboard-title">Docs refactor telemetry charts</title>
  <desc id="telemetry-dashboard-desc">Standalone SVG dashboard with agent duration and stage transition charts.</desc>
  <rect width="1000" height="980" fill="#f6f7f9" />
  <text x="48" y="56" fill="#101828" font-size="28" font-family="Arial, Helvetica, sans-serif">Docs Refactor Telemetry Charts</text>
  <text x="48" y="86" fill="#667085" font-size="14" font-family="Arial, Helvetica, sans-serif">Generated ${generatedAt} | Events ${filtered.length}</text>
  <text x="48" y="132" fill="#101828" font-size="20" font-family="Arial, Helvetica, sans-serif">Agent Duration</text>
  <g transform="translate(48 148)">${agentSvg}</g>
  <text x="48" y="560" fill="#101828" font-size="20" font-family="Arial, Helvetica, sans-serif">Stage Transition Counts</text>
  <g transform="translate(48 576)">${stageSvg}</g>
</svg>`;

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, svg, 'utf8');
  console.log(`SVG dashboard written: ${outPath}`);
}

function writeHtmlDashboard(filtered, htmlOutArg) {
  if (filtered.length === 0) {
    console.log('No telemetry events found. Skipping HTML export.');
    return;
  }

  const outPath = path.resolve(
    ROOT,
    htmlOutArg ||
      'knowledge/capabilities/docs-refactor/.telemetry.dashboard.html',
  );

  const byComponent = groupByComponent(filtered);
  const agentDurationRows = getAgentDurationRows(filtered);
  const stageTransitionRows = getStageTransitionRows(filtered);
  const agentDurationSvg = renderAgentDurationSvg(agentDurationRows);
  const stageTransitionSvg = renderStageTransitionSvg(stageTransitionRows);
  const summaryRows = Object.entries(byComponent)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([component, events]) => {
      const summary = getComponentSummary(events);
      return `<tr><td>${escapeHtml(component)}</td><td>${escapeHtml(
        summary.stage,
      )}</td><td>${escapeHtml(
        summary.latest.status || '—',
      )}</td><td>${summary.count}</td><td>${escapeHtml(
        formatDuration(summary.workflowMetrics.workflowElapsedMs),
      )}</td><td>${escapeHtml(
        formatDuration(summary.workflowMetrics.delegatedDurationMs),
      )}</td><td>${escapeHtml(
        formatDuration(summary.workflowMetrics.orchestratorActiveMs),
      )}</td><td>${escapeHtml(
        formatDuration(summary.workflowMetrics.orchestrationOverheadMs),
      )}</td></tr>`;
    })
    .join('\n');

  const timelineRows = [...filtered]
    .sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime())
    .map(
      e =>
        `<tr><td>${escapeHtml(e.ts || '—')}</td><td>${escapeHtml(
          e.component || '—',
        )}</td><td>${escapeHtml(e.eventType || '—')}</td><td>${escapeHtml(
          e.stage || '—',
        )}</td><td>${escapeHtml(e.agent || '—')}</td><td>${escapeHtml(
          e.status || '—',
        )}</td><td>${escapeHtml(formatDuration(e.durationMs))}</td></tr>`,
    )
    .join('\n');

  const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Docs Refactor Telemetry Dashboard</title>
  <style>
    :root { --bg:#f6f7f9; --card:#fff; --text:#101828; --muted:#667085; --line:#e4e7ec; --ok:#067647; --bad:#b42318; }
    body { margin:0; padding:24px; background:var(--bg); color:var(--text); font:14px/1.5 ui-sans-serif, -apple-system, Segoe UI, Helvetica, Arial; }
    h1 { margin:0 0 16px; font-size:24px; }
    h2 { margin:20px 0 10px; font-size:18px; }
    .meta { color:var(--muted); margin-bottom:12px; }
    .card { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:14px; margin-bottom:16px; }
    table { width:100%; border-collapse:collapse; }
    th, td { text-align:left; border-bottom:1px solid var(--line); padding:8px; vertical-align:top; }
    th { color:var(--muted); font-weight:600; }
    .ok { color:var(--ok); font-weight:700; }
    .bad { color:var(--bad); font-weight:700; }
    .chart-frame { border:1px solid var(--line); border-radius:10px; overflow:hidden; background:#fcfcfd; }
  </style>
</head>
<body>
  <h1>Docs Refactor Telemetry Dashboard</h1>
  <div class="meta">Generated ${escapeHtml(new Date().toISOString())} | Events ${filtered.length}</div>
  <div class="card">
    <h2>Summary</h2>
    <table>
      <thead><tr><th>Component</th><th>Stage</th><th>Status</th><th>Events</th><th>Workflow Elapsed</th><th>Delegated</th><th>Orchestrator</th><th>Overhead</th></tr></thead>
      <tbody>${summaryRows}</tbody>
    </table>
  </div>
  <div class="card">
    <h2>Agent Duration SVG</h2>
    <div class="chart-frame">${agentDurationSvg}</div>
  </div>
  <div class="card">
    <h2>Stage Transition SVG</h2>
    <div class="chart-frame">${stageTransitionSvg}</div>
  </div>
  <div class="card">
    <h2>Timeline</h2>
    <table>
      <thead><tr><th>Timestamp</th><th>Component</th><th>Event</th><th>Stage</th><th>Agent</th><th>Status</th><th>Duration</th></tr></thead>
      <tbody>${timelineRows}</tbody>
    </table>
  </div>
</body>
</html>`;

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  console.log(`HTML dashboard written: ${outPath}`);
}

/* eslint-enable max-len */

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    return;
  }

  const logPath = getLogPath();
  const events = readTelemetry(logPath);
  const filtered = filterEvents(events, args);
  const view = String(args.view || 'summary').toLowerCase();

  if (view === 'summary') {
    displaySummary(filtered);
    return;
  }

  if (view === 'timeline') {
    displayTimeline(filtered);
    return;
  }

  if (view === 'chart') {
    displayAgentChart(filtered);
    return;
  }

  if (view === 'html') {
    writeHtmlDashboard(filtered, args.htmlOut);
    writeSvgDashboard(filtered, args.svgOut);
    return;
  }

  if (view === 'all') {
    displaySummary(filtered);
    displayTimeline(filtered);
    displayAgentChart(filtered);
    writeHtmlDashboard(filtered, args.htmlOut);
    writeSvgDashboard(filtered, args.svgOut);
    return;
  }

  console.error(
    'Invalid --view value. Use: summary | timeline | chart | html | all',
  );
  process.exit(1);
}

main();
