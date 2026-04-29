---
name: example-synthesis
description: Produces practical code examples from component or pattern definitions.
inputs:
  - YAML definition
  - Example placement contract
  - Framework and import conventions
outputs:
  - Example source files
  - Mapping list of examples to documentation sections
version: 1.0.0
---

## Purpose

Create implementation-ready examples that demonstrate intended usage patterns.

## Inputs

- Component or pattern definition data
- Target framework conventions
- Destination files and export wiring rules

## Outputs

- Compilable example code files
- Registration updates or mapping metadata

## Procedure

1. Identify use cases and states from definition fields.
2. Generate example skeletons with valid imports and minimal boilerplate.
3. Populate examples with realistic values aligned to design intent.
4. Ensure examples compile and match section-level documentation references.
5. Emit mapping metadata for deterministic insertion into docs.

## Failure Handling

- If required props are unknown, block with missing-prop diagnostics.
- If imports cannot be resolved, return unresolved symbol errors.
- If generated example duplicates an existing identifier, rename deterministically.

## Reuse Constraints

- Must remain framework-aware but framework-agnostic in core rules.
- Should avoid app-specific file paths unless provided by the caller.
- Requires stable naming conventions for examples and exports.
