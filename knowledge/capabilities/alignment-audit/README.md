# alignment-audit

Status: active

## Purpose

Audit a consumer app, design-system usage, or component implementation against the HPE Design System standards, repo guidance, and the design-system knowledge base.

## Workflow

This capability follows the evaluate-plan-remediate continuous improvement loop, orchestrated across four sub-agents:

1. `evaluator` — audits the target scope for quality, token compliance, layout integrity, and DS usage; writes `<scope>/EVALUATION.md`.
2. `remediation-planner` — reads the latest evaluation and produces a sequenced implementation plan (read-only).
3. `remediation-executor` — applies Track A (app-local) fixes from the plan.
4. `design-system-maintainer` — applies Track B (design-system data/generator) fixes from the plan.

## Entry Point

- `@alignment-audit-orchestrator <scope>`

The orchestrator detects the current stage, gates on user approval before planning and before executing, then delegates to the sub-agents above in order.

## Typical Scope

- App alignment review for a consumer implementation
- Component usage and documentation audit
- Pattern compliance review against `knowledge/core/data`
- Design-system data quality and prompt-context validation

## Manifest

- `knowledge/capabilities/alignment-audit/manifest.yaml`

## Validation and Execution

Use the orchestrator to drive a full cycle and validate the final result with the project checks most relevant to the target:

- `pnpm validate:capability-manifests`
- `pnpm --filter @hpe-design-system/agent test`
- `pnpm lint`
- `pnpm build`
- or a scoped consumer app `tsc --noEmit` check if reviewing a specific product app
