---
name: schema-to-doc-generation
description: Generates human-readable docs from schema-defined YAML sources.
inputs:
  - YAML definition path
  - Documentation template
  - Capability output destination
outputs:
  - Generated documentation file
  - Validation notes for unresolved placeholders
version: 1.0.0
---

## Purpose

Transform machine-readable definitions into consistent documentation pages.

## Inputs

- Validated YAML component or pattern definition
- Template contract for required sections
- Output path and naming conventions

## Outputs

- Generated markdown or MDX page
- Structured placeholder list for content that requires follow-up

## Procedure

1. Load and validate YAML against schema.
2. Resolve section ordering from template rules.
3. Render documentation sections from YAML fields using deterministic formatting.
4. Insert placeholders only when content is missing or explicitly deferred.
5. Run formatting and structural checks before writing the output.

## Failure Handling

- If schema validation fails, stop generation and return blocking errors.
- If template sections are incompatible, report section-level mismatch and halt.
- If output path conflicts, fail with explicit file path diagnostics.

## Reuse Constraints

- Expects schema-stable inputs.
- Assumes template contract is versioned and available.
- Should not embed capability-specific copy or paths.
