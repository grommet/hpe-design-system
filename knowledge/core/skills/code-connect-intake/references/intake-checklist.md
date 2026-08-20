# Code Connect Intake Checklist

Use this checklist before creating or updating a Code Connect mapping in this repository.

## Required Inputs

- Target code component name
- Source package or component file to verify the live JSX API
- Exact Figma component URL including `node-id`
- Expected target path under `knowledge/code-connect/src/`

## Verification Steps

1. Confirm the Figma URL points to a `COMPONENT` or `COMPONENT_SET`, not a page or frame.
2. Inspect the live component API before deciding which props belong in the mapping.
3. Look for the nearest existing mapping pattern in `knowledge/code-connect/src/`.
4. Check whether the component belongs in an existing subfolder such as `knowledge/code-connect/src/inputs/`.
5. Decide whether the mapping should be property-driven, variant-split, or static composition.

## Output Expectations

- A concrete target file path like `knowledge/code-connect/src/Button.figma.jsx`
- A short list of expected Figma properties to map
- A clear note if the mapping should be static composition instead of a full `props` mapping
