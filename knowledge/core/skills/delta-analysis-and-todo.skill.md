---
name: delta-analysis-and-todo
description: Compares legacy and generated artifacts to produce TODO and deprecation tracking outputs.
inputs:
  - Legacy artifact path
  - Generated artifact path
  - Classification rules
outputs:
  - TODO items with severity and scope
  - Deprecated items list
version: 1.0.0
---

## Purpose

Create a deterministic migration delta so content gaps are visible and actionable.

## Inputs

- Previous version artifact
- Generated replacement artifact
- Gap classification policy

## Outputs

- Structured TODO list with ownership-ready items
- Deprecated list describing intentionally dropped content

## Procedure

1. Parse both artifacts into comparable section-level structures.
2. Compute missing, changed, and removed content groups.
3. Classify each difference by severity and action type.
4. Emit TODO items for unresolved gaps and DEPRECATED entries for dropped material.
5. Ensure outputs are deterministic and stable across reruns.

## Failure Handling

- If artifacts cannot be parsed, fail with file and section diagnostics.
- If diff is too noisy, require section-level normalization before classifying.
- If severity cannot be determined, assign neutral severity and flag for review.

## Reuse Constraints

- Requires stable input formats or a normalization layer.
- Should not mutate source artifacts.
- Must keep output format consistent for automation.
