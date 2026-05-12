---
name: source-extraction
description: Extracts structured YAML definitions from unstructured source documentation.
inputs:
  - Source document path
  - Target schema reference
  - Existing examples for normalization
outputs:
  - Schema-compliant YAML draft
  - List of ambiguities that need human review
version: 1.0.0
---

## Purpose

Turn legacy narrative documentation into normalized, machine-readable data.

## Inputs

- Source markdown or MDX content
- Schema contract and examples
- Component or pattern identifier

## Outputs

- YAML draft aligned to the target schema
- Gap list for unresolved or conflicting source content

## Procedure

1. Parse the source and segment it into semantic sections (usage, props, accessibility, examples).
2. Map each section to schema fields using deterministic field mapping rules.
3. Normalize language and values (booleans, arrays, naming, enum-like values).
4. Preserve uncertain content as explicit TODO markers instead of guessing.
5. Validate structure against the schema before emitting the YAML draft.

## Failure Handling

- If a required schema field is missing in source content, emit a TODO marker and add it to gaps.
- If source statements conflict, keep both in gaps and do not collapse them into one value.
- If schema validation fails, return errors and stop downstream generation.

## Reuse Constraints

- Requires a stable schema contract.
- Should not invent domain semantics that are absent from source material.
- Must remain deterministic for the same input content.
