# alignment-audit

Status: active

## Purpose

Audit a consumer app, design-system usage, or component implementation against the HPE Design System standards, repo guidance, and the design-system knowledge base.

## Workflow

This capability follows the evaluate-plan-remediate continuous improvement loop:

1. Evaluate the target scope for quality, token compliance, layout integrity, and DS usage.
2. Produce a remediation plan that separates blocking fixes from dataset or guideline improvements.
3. Execute the approved changes and verify the result with repo checks.

## Entry Point

- `@alignment-audit-orchestrator <scope>`

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
