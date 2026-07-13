---
name: code-connect-intake
description: 'Intake workflow for HPE Design System Code Connect work. Use when asked to start a new Code Connect mapping, confirm a Figma node URL, identify the target Grommet component, choose the correct `.figma.jsx` file location, or gather the minimum inputs before editing `packages/code-connect/src/`.'
---

# Code Connect Intake

Use this skill to gather the minimum correct inputs before creating or updating a Code Connect mapping in this repository.

## When to Use This Skill

- User wants a new Code Connect mapping created from a Figma component
- User provides a Figma link and asks what file or component it should map to
- User wants to update an existing mapping but the target component or file is unclear
- User asks where a new mapping should live under `packages/code-connect/src/`

## Step-by-Step Workflows

### Intake Checklist

1. Identify the target code component and confirm its real JSX API in source before proposing mapping behavior.
2. Confirm the exact Figma component URL includes `node-id` and points to a `COMPONENT` or `COMPONENT_SET` node.
3. Check for the closest existing mapping pattern in `packages/code-connect/src/`, including component-family subfolders such as `packages/code-connect/src/inputs/`.
4. Choose the target file path using the repo convention `<ComponentName>.figma.jsx`.
5. Decide whether the component should be property-driven, variant-split, or a static composition example.

## Gotchas

- **Do not start from a page or frame URL**. Code Connect needs the exact component node URL.
- **Do not assume every mapping lives at the top of `src/`**. This repo already uses subfolders such as `src/inputs/`.
- **Do not invent props from Figma alone**. Figma properties must be reconciled with the real Grommet or wrapper component API.
- **Do not require a `props` block for every file**. Some mappings in this repo are static composition examples.

## References

- See the bundled [intake checklist](./references/intake-checklist.md) for the minimum pre-edit inputs.
- See the shared [skills index](../README.md) for the other Code Connect workflows.
- [../../instructions/code-connect/guidelines.instructions.md](../../instructions/code-connect/guidelines.instructions.md)
- [../../instructions/code-connect/file-structure.instructions.md](../../instructions/code-connect/file-structure.instructions.md)
- [../../instructions/code-connect/component-guidelines.instructions.md](../../instructions/code-connect/component-guidelines.instructions.md)
