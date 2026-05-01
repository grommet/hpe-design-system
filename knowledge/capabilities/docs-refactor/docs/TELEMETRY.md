# docs-refactor Telemetry

This document describes telemetry events, metrics, and dashboard outputs for the `docs-refactor` capability.

## Goals

Telemetry helps answer:

- Which stage is a component run currently in?
- Which agents consume most runtime?
- How long does end-to-end refactor work take?
- How much time is delegated vs orchestrator-managed?

## Configuration Sources

- Manifest config: `knowledge/capabilities/docs-refactor/manifest.yaml`
- Event schema: `knowledge/capabilities/docs-refactor/.telemetry.schema.json`
- Raw log (JSONL): `knowledge/capabilities/docs-refactor/.telemetry.log`

## CLI Commands

Write an event:

```bash
pnpm telemetry:write \
  --component checkbox \
  --eventType agent-complete \
  --agent generate-mdx-agent \
  --stage generated \
  --status success \
  --durationMs 1800
```

Inspect status:

```bash
pnpm telemetry:status --component checkbox --view summary
pnpm telemetry:status --component checkbox --view timeline
pnpm telemetry:status --component checkbox --view chart
```

Generate dashboards:

```bash
pnpm telemetry:status \
  --component checkbox \
  --view all \
  --htmlOut knowledge/capabilities/docs-refactor/telemetry-dashboard.html \
  --svgOut knowledge/capabilities/docs-refactor/telemetry-dashboard.svg
```

## Event Model

Supported `eventType` values:

- `stage-transition`
- `agent-start`
- `agent-complete`
- `agent-error`
- `workflow-complete`
- `workflow-error`

Common fields:

- `ts` (ISO timestamp)
- `component` (kebab-case component name)
- `eventType`
- Optional: `stage`, `agent`, `status`, `durationMs`, `error`, `metadata`

## Workflow Metrics

On terminal workflow events (`workflow-complete`, `workflow-error`), telemetry adds rollups to:

- `metadata.workflowMetrics.workflowElapsedMs`
- `metadata.workflowMetrics.delegatedDurationMs`
- `metadata.workflowMetrics.orchestratorActiveMs`
- `metadata.workflowMetrics.orchestrationOverheadMs`

Definitions:

- `workflowElapsedMs`: wall-clock time from first event in current run to terminal event
- `delegatedDurationMs`: sum of `durationMs` for `agent-complete` events in current run
- `orchestratorActiveMs`: explicit orchestrator duration when provided; otherwise inferred from overhead
- `orchestrationOverheadMs`: `max(0, workflowElapsedMs - delegatedDurationMs)`

## Status Views

`telemetry:status --view summary` shows per-component rollups:

- Stage and status
- Event count
- Workflow elapsed
- Delegated duration
- Orchestrator duration
- Overhead

Other views:

- `timeline`: chronological event table
- `chart`: terminal ASCII duration chart by agent
- `html`: HTML dashboard with summary, timeline, and embedded SVG charts
- `all`: summary + timeline + chart + HTML export (and optional standalone SVG export)

## Dashboard Artifacts

Generated outputs:

- Default HTML dashboard output (when `--htmlOut` is not provided): `knowledge/capabilities/docs-refactor/.telemetry.dashboard.html`
- Custom HTML dashboard output: pass `--htmlOut`, for example `knowledge/capabilities/docs-refactor/telemetry-dashboard.html`
- Standalone SVG dashboard: only generated when `--svgOut` is provided, for example `knowledge/capabilities/docs-refactor/telemetry-dashboard.svg`

The HTML dashboard includes:

- Summary table with workflow metrics
- Agent duration SVG chart
- Stage transition SVG chart
- Timeline table

## Troubleshooting

No events in status output:

1. Confirm telemetry is enabled in `manifest.yaml`.
2. Confirm events are being written with `pnpm telemetry:write`.
3. Check `.telemetry.log` exists and contains valid JSONL rows.

Schema validation failures:

1. Validate fields against `.telemetry.schema.json`.
2. Ensure `durationMs` is a non-negative integer.
3. Ensure `component` uses kebab-case.

Unexpected metric values:

1. Verify events for a component form a complete run ending in `workflow-complete` or `workflow-error`.
2. Verify `durationMs` values are provided for relevant agent events.
