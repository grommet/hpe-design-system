# Telemetry

This capability supports workflow telemetry to help you understand pipeline performance, identify bottlenecks, and track component progress across the team.

## Overview

Telemetry is **automatically logged** by the `@docs-refactor-orchestrator` when you run a component refactor. Each event is appended to `.telemetry.log` as a structured JSON entry.

## Viewing Telemetry

### Quick summary

```bash
pnpm telemetry:status
```

Displays all components and their current pipeline stage, total time spent, and latest status:

```
📊 Docs Refactor Telemetry Summary

Component            Stage               Status      Events  Total Duration
─────────────────────────────────────────────────────────────────────────────
button               complete            ✓          42      4m 35s
checkbox             mdx-generated       ✓          18      2m 12s
menu                 not-started         ⊘           2      520ms
select               todos-created       ✓          28      3m 44s

Legend: ✓ success | ✗ failure | ⊘ skipped
```

### Filter by component

```bash
pnpm telemetry:status --component button
```

Shows all telemetry events for the button component.

### Filter by time

```bash
pnpm telemetry:status --since 1h
```

Shows events from the last hour. Supports: `1h`, `30m`, `60s`.

### Raw log

For manual analysis:

```bash
tail -f knowledge/capabilities/docs-refactor/.telemetry.log | jq '.component, .eventType, .status, .durationMs'
```

## Event Schema

Each telemetry event follows a strict schema (see `.telemetry.schema.json`). Events include:

- **`ts`** — ISO 8601 timestamp
- **`component`** — Component name (e.g., `button`)
- **`eventType`** — One of: `stage-transition`, `agent-start`, `agent-complete`, `agent-error`, `workflow-complete`, `workflow-error`
- **`stage`** — Current pipeline stage (e.g., `extracted`, `generated`, `todos-created`)
- **`agent`** — Agent name for agent-* events
- **`status`** — Outcome: `success`, `failure`, or `skipped`
- **`durationMs`** — Milliseconds elapsed for the operation
- **`error`** — Error message (for error events)
- **`metadata`** — Optional context-specific data

### Example event

```json
{
  "ts": "2026-04-29T16:05:00Z",
  "component": "button",
  "eventType": "stage-transition",
  "stage": "generated",
  "status": "success",
  "durationMs": 4230
}
```

## Instrumentation

### For orchestrator implementers

When the orchestrator runs, it should:

1. **Log stage transitions** at the start of each phase:
   ```json
   {"ts": "...", "component": "button", "eventType": "stage-transition", "from": "extracted", "to": "generated", "status": "success", "durationMs": 4230}
   ```

2. **Log agent invocations**:
   ```json
   {"ts": "...", "component": "button", "eventType": "agent-start", "agent": "generate-mdx-agent", "status": "success"}
   {"ts": "...", "component": "button", "eventType": "agent-complete", "agent": "generate-mdx-agent", "status": "success", "durationMs": 3800}
   ```

3. **Log errors** if agents fail:
   ```json
   {"ts": "...", "component": "button", "eventType": "agent-error", "agent": "create-todos-agent", "status": "failure", "error": "TODO file already exists"}
   ```

4. **Log workflow completion**:
   ```json
   {"ts": "...", "component": "button", "eventType": "workflow-complete", "status": "success", "durationMs": 18500}
   ```

### For agent implementers

Agents can optionally emit completion events by writing a JSON line to `.telemetry.log` before exiting. This is **optional** — the orchestrator will emit wrapper events regardless.

## Analyzing Patterns

Common analyses you can run:

### Find slow agents

```bash
jq 'select(.eventType == "agent-complete") | {agent, durationMs}' knowledge/capabilities/docs-refactor/.telemetry.log | sort -k2 -rn | head -5
```

### Find failed components

```bash
jq 'select(.status == "failure") | .component' knowledge/capabilities/docs-refactor/.telemetry.log | sort | uniq -c
```

### Average time per stage

```bash
jq 'select(.eventType == "stage-transition") | .durationMs' knowledge/capabilities/docs-refactor/.telemetry.log | awk '{sum+=$0; count++} END {print "Average:", sum/count "ms"}'
```

## Configuration

Telemetry is configured in the capability manifest (`manifest.yaml`):

```yaml
x-telemetry:
  enabled: true
  logFile: knowledge/capabilities/docs-refactor/.telemetry.log
  schema: knowledge/capabilities/docs-refactor/.telemetry.schema.json
  events:
    - stage-transition
    - agent-start
    - agent-complete
    - agent-error
    - workflow-complete
    - workflow-error
```

To disable telemetry, set `enabled: false` in the manifest.

## Privacy & Storage

- Telemetry logs are **local** to your repository and not sent anywhere.
- Logs are **appendable** — they grow over time. Periodically clean old logs if needed:
  ```bash
  rm knowledge/capabilities/docs-refactor/.telemetry.log
  ```
- Logs are **human-readable JSON**, suitable for grep/awk analysis or import into analytics tools.
