---
name: build-verify-and-repair
description: Runs verification loops with known-error repairs and bounded retries.
inputs:
  - Build command
  - Known-error repair catalog
  - Retry policy
outputs:
  - Verification result
  - Applied fixes and unresolved errors report
version: 1.0.0
---

## Purpose

Ensure generated outputs compile and render by applying safe, known repairs.

## Inputs

- Project-specific verification command
- Error-to-repair mapping catalog
- Maximum retry count

## Outputs

- Pass or fail result with diagnostics
- Audit of applied repairs

## Procedure

1. Execute build or verification command.
2. Parse errors and map them to known repair handlers.
3. Apply bounded repairs and rerun verification.
4. Repeat until success or retry limit is reached.
5. Emit unresolved errors with clear escalation guidance.

## Failure Handling

- If unknown errors occur, stop automatic repair and escalate with full logs.
- If retry limit is reached, fail closed with the final error set.
- If repair mutates unrelated files, revert that repair and mark unsafe.

## Reuse Constraints

- Requires a maintained known-error catalog.
- Must enforce bounded retries.
- Should avoid destructive or non-idempotent repair actions.
