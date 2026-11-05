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
3. Classify the component by its design-system purpose, then inspect that family folder and nearest existing mapping patterns in `knowledge/code-connect/src/`.
4. Put the v2 `.figma.ts` template in the matching existing family folder when one applies; use the root only when the component does not belong to an established family. For example, Notification is a visualisation, so use `knowledge/code-connect/src/visualisations/Notification.figma.ts`.
5. Decide whether the template needs one property-driven snippet, TypeScript branches for structural variants, or static composition.

## Output Expectations

- A concrete target file path like `knowledge/code-connect/src/controls/Button.figma.ts`
- A short list of expected Figma properties to map
- A stable template ID, the emitted code component name, and its real source URL; these may differ from the Figma component name
- A clear note if the template should use static composition instead of property-driven output
