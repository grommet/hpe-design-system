---
name: progress-tracking
description: Applies consistent progress updates to plans, checklists, and status metadata.
inputs:
  - Progress target file
  - Completed stage or task identifiers
  - Update policy
outputs:
  - Updated progress artifacts
  - Change summary for auditability
version: 1.0.0
---

## Purpose

Keep initiative state accurate and auditable across long-running capabilities.

## Inputs

- Checklist or plan document path
- Completed or blocked task identifiers
- Update conventions and status vocabulary

## Outputs

- Updated checklist or status fields
- Short delta summary of changes applied

## Procedure

1. Load current progress artifact and locate target task keys.
2. Apply status transitions according to policy constraints.
3. Add contextual notes only when required by policy.
4. Preserve ordering and formatting for clean diffs.
5. Emit a concise change summary for PR and review context.

## Failure Handling

- If target task keys are missing, fail with a list of unresolved identifiers.
- If transition is invalid, reject update and return allowed transitions.
- If concurrent edits are detected, re-read and reapply safely.

## Reuse Constraints

- Requires a stable status model.
- Should not infer completion from partial signals.
- Must preserve human readability of progress artifacts.
