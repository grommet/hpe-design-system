# Capability: docs-refactor

This capability refactors component documentation from legacy MDX into a YAML-driven docs workflow, establishing a machine-readable YAML source of truth and standardizing user-facing MDX pages.

## Primary Entrypoint

`@docs-refactor-orchestrator <component-name>`

## Architecture

The refactor pipeline transforms existing component MDX pages into standardized documentation:

1. **Extraction**: Convert legacy MDX into machine-readable YAML aligned to the component schema contract.
2. **Generation**: Transform YAML back into standardized MDX pages using documented templates.
3. **Enrichment**: Synthesize code examples and usage guidance based on component definition data.
4. **Quality**: Review copy for writing standards compliance, verify rendering, and create migration tracking.
5. **Delivery**: Package one component per PR with TODO/DEPRECATED tracking for human review.

See `docs/execution.skill.md` for the detailed per-component workflow.

## Resources

- **Schema**: `knowledge/core/data/types.ts` — ComponentDefinition interface
- **Template**: `knowledge/capabilities/docs-refactor/docs/COMPONENT_TEMPLATE.md` — MDX page structure contract
- **Writing rules**: `knowledge/core/skills/writing-style.skill.md` — Tone and formatting standards
- **Plan**: `plan.md` — Component checklist and rollout tracking
- **Telemetry reference**: `docs/TELEMETRY.md` — Event model, metrics, dashboards, and troubleshooting

## Agents

Ten specialized agents compose the pipeline:

1. `agents/extract-yaml.agent.md` — Reverse-engineer legacy MDX to YAML
2. `agents/generate-mdx.agent.md` — Synthesize standardized MDX from YAML
3. `agents/generate-examples.agent.md` — Create code examples for use cases
4. `agents/dos-donts.agent.md` — Author usage guidance pairs
5. `agents/create-todos.agent.md` — Diff old vs. new and emit tracking
6. `agents/review-copy.agent.md` — Audit writing quality and apply fixes
7. `agents/verify-render.agent.md` — Run build and auto-repair known errors
8. `agents/update-checklist.agent.md` — Mark component complete in plan
9. `agents/qa.agent.md` — Evaluate agent outputs and return PASS/FAIL quality reports (read-only; runs after every worker agent)
10. `docs-refactor-orchestrator.agent.md` — Master controller and stage detector

The orchestrator remains at the capability root for discoverability; subordinate agents are grouped under `agents/`.

## Telemetry

Telemetry is enabled for this capability and records orchestrator and agent boundary events to:

- `knowledge/capabilities/docs-refactor/.telemetry.log`

Quick commands:

- `pnpm telemetry:write --component <name> --eventType <type> [flags]`
- `pnpm telemetry:status --component <name> --view summary`
- `pnpm telemetry:status --component <name> --view all --htmlOut knowledge/capabilities/docs-refactor/telemetry-dashboard.html --svgOut knowledge/capabilities/docs-refactor/telemetry-dashboard.svg`

Summary metrics include:

- `Workflow Elapsed`: wall-clock duration for a run
- `Delegated`: summed `agent-complete` durations
- `Orchestrator`: estimated/recorded orchestrator management time
- `Overhead`: `Workflow Elapsed - Delegated`

For full details, examples, and troubleshooting, see `docs/TELEMETRY.md`.

## Manifest

The machine-readable manifest is in `manifest.yaml`.
