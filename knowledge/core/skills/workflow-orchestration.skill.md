---
name: workflow-orchestration
description: Detects workflow stage and composes step execution with guardrails.
inputs:
  - Capability manifest
  - Filesystem state
  - Stage dependency rules
outputs:
  - Next action decision
  - Ordered execution plan for pending stages
version: 1.0.0
---

## Purpose

Coordinate multi-step capability workflows with safe stage transitions.

## Inputs

- Stage model and dependency graph
- Current file and artifact state
- Approval gate policy

## Outputs

- Determined current stage
- Ordered list of next actions or delegated agents

## Procedure

1. Evaluate stage predicates against current filesystem state.
2. Resolve the active stage and blocked dependencies.
3. Build an execution plan honoring sequential and parallel constraints.
4. Enforce approval gates before mutating steps.
5. Delegate each step and re-evaluate state between transitions.

## Failure Handling

- If stage signals are ambiguous, halt and request manual stage selection.
- If dependencies are missing, fail with explicit prerequisite list.
- If delegated step fails, stop progression and surface recovery options.

## Reuse Constraints

- Requires deterministic stage predicates.
- Must remain idempotent across repeated invocations.
- Should separate orchestration from transformation logic.
