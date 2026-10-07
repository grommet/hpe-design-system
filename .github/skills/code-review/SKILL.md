---
name: code-review
description: 'Review pull requests in the HPE Design System monorepo for correctness, regressions, accessibility, design-token misuse, deprecated Grommet patterns, missing tests, and missing Changesets. Use for PR reviews, code reviews, review comments, merge-readiness checks, and requests to grill a proposed change.'
---

# HPE Design System Code Review

Perform a skeptical, evidence-based review of the proposed change. Review the actual diff and the surrounding implementation, tests, package scripts, instruction files, and relevant workflows before reaching a conclusion.

## Review posture

- Review behavior and risk, not formatting preferences.
- Treat the PR description as a hypothesis; verify it against the code and repository conventions.
- Prefer existing repository patterns over invented abstractions.
- Do not expand the PR to unrelated cleanup or speculative future cases.
- Report findings first, ordered by severity: blocking, high, medium, low.
- Every finding must identify the file and line, explain the user or maintenance impact, and give a concrete remediation.
- Do not report a concern without tracing the affected code path or showing a realistic trigger.
- If no actionable findings remain, say so clearly and name the meaningful validation gaps.

## Review workflow

1. Read the PR title, description, linked issue, and changed-file list.
2. Read the complete diff, then inspect the owning implementation, neighboring tests, and relevant package scripts.
3. Trace changed data and control flow through callers, state ownership, rendering, token consumption, and generated outputs.
4. Compare the change with nearby repository patterns and applicable files under `knowledge/core/instructions/` and `.github/instructions/`.
5. Run the narrowest relevant validation first. Expand validation when the change affects shared primitives, package contracts, tokens, or cross-workspace behavior.
6. Grill the change using the checks below.
7. Report only actionable findings, then summarize validation performed and remaining risk.

## Grill checklist

### Correctness and regression risk

- Does the implementation satisfy the linked issue and the PR description for success, failure, empty, loading, and boundary states?
- Are state ownership, effects, event handlers, async cleanup, and error paths correct?
- Could the change alter behavior for existing consumers, themes, package exports, or supported versions?
- Are shared primitives or utilities used by more callers than the PR tests cover?
- Are generated files being edited instead of their source inputs?
- Are snapshots regenerated only when behavior justifies the change, and is the diff understood?

### Design tokens

- Are values placed in the correct primitive, semantic, or component layer?
- Are semantic references used instead of hardcoded colors, spacing, typography, or dimensions?
- Do light and dark token variants remain coherent where applicable?
- Are token names, `$type`, `$value`, and `$description` consistent with nearby files?
- Does the change require a token build, parity/contract validation, or a Changeset?
- Are versioned token folders being changed intentionally rather than retroactively?
- Are `dist/` outputs regenerated from source and excluded from hand edits?

### Grommet and HPE Design System usage

- Are Grommet components and props used where the repository requires them instead of equivalent custom HTML or ad hoc CSS?
- Are new icons imported from `@hpe-design/icons-grommet` rather than `grommet-icons`?
- Does theming extend the existing HPE theme and use theme tokens rather than hardcoded values?
- Are deprecated or migration-sensitive Grommet APIs, imports, props, or patterns introduced?
- Does the change respect the workspace boundary: UI conventions for apps/components, token/build conventions for packages, and Code Connect rules where applicable?

### Accessibility and interaction

- Do interactive controls have an accessible name, including icon-only controls?
- Are keyboard operation, focus order, focus visibility, disabled/loading states, and pointer alternatives preserved?
- Are semantic roles, labels, descriptions, live-region behavior, and error messaging correct?
- Does the implementation avoid relying on color alone and preserve sufficient contrast through existing tokens?
- Are dynamic content changes announced or exposed appropriately?
- Do responsive layouts remain usable without clipping, overlap, or loss of information?

### Tests and validation

- Do tests exercise real user-visible behavior rather than implementation details or mock-only assertions?
- Are changed branches, edge cases, accessibility behavior, and regression scenarios covered?
- Is the selected test command scoped to the affected package and sufficient for the blast radius?
- For shared UI changes, is Storybook or another manual verification path identified?
- For token changes, are build, contract, parity, and changeset checks covered as applicable?
- Are new tests justified by the bug or contract they protect?

### Repository policy and release readiness

- Does the change require a Changeset for a publishable package or token contract/value change?
- Are package builds run when `hpe-design-tokens` or `@shared/hooks` output changes?
- Are knowledge structure and capability manifest checks run when `knowledge/**` changes?
- Do docs changes follow the registration, examples, and MDX structure?
- Are PR title, branch, issue-linking, and repository template requirements satisfied?
- Are license-header and generated-output rules respected?

## Finding standard

A finding is actionable only when it includes:

- **Severity**: blocking, high, medium, or low.
- **Location**: a precise file and line in the changed code when possible.
- **Problem**: what is wrong and the concrete trigger.
- **Impact**: who or what breaks, regresses, or becomes unsafe to maintain.
- **Fix**: the smallest change that resolves the problem.

Do not use findings for personal style preferences, hypothetical concerns without a plausible trigger, or issues already explicitly handled by the diff. Separate broader follow-up ideas from review findings.

## Validation commands

Use the smallest relevant commands from the repository. Common checks include:

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm --filter hpe-design-tokens build
pnpm --filter "@shared/hooks" build
pnpm --filter hpe-design-tokens test
pnpm --filter "@shared/hooks" exec vitest run
pnpm validate:knowledge-structure
pnpm validate:capability-manifests
pnpm validate:design-tokens-changeset
```

The root package does not define a `test` script. Run package-level tests or the recursive workspace test command only when appropriate for the changed scope.

## Review output

Use this order:

1. Findings, highest severity first.
2. Open questions or assumptions.
3. Validation performed and remaining test gaps.
4. Brief change summary.

When drafting a review comment for manual posting, keep it concise and ready to paste. Never post comments, approve, request changes, or modify the PR unless the user explicitly asks and the tool action is authorized.
