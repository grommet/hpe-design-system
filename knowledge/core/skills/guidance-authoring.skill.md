---
name: guidance-authoring
description: Creates actionable do and do-not guidance with concise rationale.
inputs:
  - Usage and anti-pattern inputs
  - Voice and tone rules
  - Formatting constraints
outputs:
  - Guidance entries ready for docs inclusion
  - Rationale notes for each entry
version: 1.0.0
---

## Purpose

Produce clear guidance that improves implementation decisions and prevents misuse.

## Inputs

- Candidate recommended and discouraged behaviors
- Writing standards and style rules
- Component context and constraints

## Outputs

- Do and do-not guidance pairs
- Short rationale statements linked to each pair

## Procedure

1. Distill source content into actionable behavior statements.
2. Pair each recommended behavior with a corresponding anti-pattern when possible.
3. Write concise rationale focusing on outcomes and tradeoffs.
4. Normalize wording for imperative voice and consistent sentence style.
5. Validate that each statement is testable or observable.

## Failure Handling

- If rationale is vague, flag for human review rather than publishing weak guidance.
- If no anti-pattern exists, emit a single guidance item and mark pair as partial.
- If statements conflict with schema behavior, prioritize schema and flag mismatch.

## Reuse Constraints

- Should not include product-specific policy unless explicitly provided.
- Must stay short and operational, not narrative.
- Reuse depends on a shared writing standard.
