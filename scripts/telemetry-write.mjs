#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import yaml from 'yaml';
import Ajv2020 from 'ajv/dist/2020.js'; // eslint-disable-line import/extensions
import addFormats from 'ajv-formats';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(SCRIPT_DIR, '..');
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
      const nextArg = argv[i + 1];
      const hasValue = nextArg && !nextArg.startsWith('--');
      const value = hasValue ? nextArg : true;
      if (hasValue) {
        i += 1;
      }
      parsed[key] = value;
    }
  }
  return parsed;
}

function loadTelemetryConfig() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    throw new Error(`Manifest not found: ${MANIFEST_PATH}`);
  }

  const manifest = yaml.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  const cfg = manifest?.spec?.['x-extensions']?.telemetry ?? {};

  return {
    enabled: cfg.enabled !== false,
    logFile: path.resolve(
      ROOT,
      cfg.logFile || 'knowledge/capabilities/docs-refactor/.telemetry.log',
    ),
    schema: path.resolve(
      ROOT,
      cfg.schema ||
        'knowledge/capabilities/docs-refactor/.telemetry.schema.json',
    ),
  };
}

function buildEvent(args) {
  const event = {
    ts: new Date().toISOString(),
    component: args.component,
    eventType: args.eventType,
  };

  const optional = ['stage', 'agent', 'status', 'error'];
  optional.forEach((field) => {
    if (typeof args[field] === 'string' && args[field].length > 0) {
      event[field] = args[field];
    }
  });

  if (typeof args.durationMs === 'string' && args.durationMs.length > 0) {
    event.durationMs = Number(args.durationMs);
  }

  if (typeof args.metadata === 'string' && args.metadata.length > 0) {
    try {
      event.metadata = JSON.parse(args.metadata);
    } catch {
      throw new Error('Invalid --metadata JSON');
    }
  }

  return event;
}

function validateEvent(event, schemaPath) {
  if (!fs.existsSync(schemaPath)) {
    return;
  }

  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  const validate = ajv.compile(schema);

  if (!validate(event)) {
    const details = (validate.errors || [])
      .map((e) => `${e.instancePath || '/'} ${e.message}`)
      .join('; ');
    throw new Error(`Telemetry event failed schema validation: ${details}`);
  }
}

function parseLineAsJson(line) {
  try {
    return JSON.parse(line);
  } catch {
    return null;
  }
}

function readExistingEvents(logFile) {
  if (!fs.existsSync(logFile)) {
    return [];
  }

  return fs
    .readFileSync(logFile, 'utf8')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map(parseLineAsJson)
    .filter(Boolean);
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
  for (let i = ordered.length - 1; i >= 0; i -= 1) {
    if (isWorkflowTerminalEvent(ordered[i])) {
      startIndex = i + 1;
      break;
    }
  }

  return ordered.slice(startIndex);
}

function computeWorkflowMetrics(events) {
  if (events.length === 0) {
    return null;
  }

  const ordered = [...events].sort(
    (a, b) => toTimestampMs(a.ts) - toTimestampMs(b.ts),
  );
  const firstTs = toTimestampMs(ordered[0].ts);
  const lastTs = toTimestampMs(ordered[ordered.length - 1].ts);

  const workflowElapsedMs =
    firstTs === null || lastTs === null ? 0 : Math.max(0, lastTs - firstTs);

  const delegatedDurationMs = ordered
    .filter((event) => event.eventType === 'agent-complete')
    .reduce((sum, event) => sum + toDurationMs(event.durationMs), 0);

  const explicitOrchestratorMs = ordered
    .filter(
      (event) =>
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

function applyWorkflowMetrics(event, logFile) {
  if (!isWorkflowTerminalEvent(event)) {
    return event;
  }

  const existingEvents = readExistingEvents(logFile);
  const componentEvents = existingEvents.filter(
    (existing) => existing.component === event.component,
  );
  const runEvents = getCurrentRunEvents(componentEvents);
  const runWithTerminal = [...runEvents, event];
  const workflowMetrics = computeWorkflowMetrics(runWithTerminal);

  if (!workflowMetrics) {
    return event;
  }

  return {
    ...event,
    metadata: {
      ...(event.metadata || {}),
      workflowMetrics,
    },
  };
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const cfg = loadTelemetryConfig();

  if (!cfg.enabled) {
    console.log('Telemetry disabled in manifest config.');
    return;
  }

  if (!args.component || !args.eventType) {
    console.error(
      'Usage: pnpm telemetry:write --component <name> ' +
        '--eventType <type> [--stage <stage>] [--agent <agent>] ' +
        '[--status <success|failure|skipped>] [--durationMs <ms>] ' +
        '[--error <message>] [--metadata <json>]',
    );
    process.exit(1);
  }

  const event = buildEvent(args);
  const enrichedEvent = applyWorkflowMetrics(event, cfg.logFile);
  validateEvent(enrichedEvent, cfg.schema);

  fs.mkdirSync(path.dirname(cfg.logFile), { recursive: true });
  fs.appendFileSync(cfg.logFile, `${JSON.stringify(enrichedEvent)}\n`, 'utf8');

  const agentSuffix = enrichedEvent.agent ? ` (${enrichedEvent.agent})` : '';
  console.log(
    `Telemetry appended: ${enrichedEvent.component} ${
      enrichedEvent.eventType
    }${agentSuffix}`,
  );
}

main();