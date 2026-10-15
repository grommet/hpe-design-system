---
name: code-connect-authoring
description: 'Repo-specific workflow for HPE Design System Code Connect mappings. Use when asked to intake, create, or update an HPE `.figma.jsx` mapping with `figma.connect(...)`, map Figma properties to a Grommet component, or choose between props, variants, and static composition.'
version: 1.0.1
---

# Code Connect Authoring

Use this skill to intake, create, or update Code Connect mapping files for this repository.

## Repository Format

This repository uses parser-based `.figma.jsx` mappings with `figma.connect()`. Keep HPE mapping examples and workflows in this format.

## When to Use This Skill

- User asks to create a new `.figma.jsx` file
- User asks to update an existing mapping after a component API change
- User provides a Figma URL and needs to confirm the target HPE component or file path
- User needs to choose an existing mapping pattern before authoring
- User needs help translating Figma properties into Code Connect helpers
- User wants to know which mapping pattern matches a component best

## Step-by-Step Workflows

### Intake

1. Identify the target code component and source file; inspect its real JSX API before deciding mapping behavior.
2. Confirm the exact Figma component URL includes `node-id` and points to a `COMPONENT` or `COMPONENT_SET`, not a page or frame.
3. Find the closest existing mapping under `knowledge/code-connect/src/`, including family folders such as `inputs/`.
4. Choose the target path using the repo convention `<ComponentName>.figma.jsx`.
5. Decide whether the mapping should be property-driven, variant-split, or static composition. Record the target path and Figma properties that correspond to the component API.

### Author a Mapping

1. Reuse the nearest existing mapping pattern before introducing a new structure.
2. Map relevant Figma properties with the appropriate helpers such as `figma.string`, `figma.boolean`, `figma.enum`, `figma.instance`, or `figma.nestedProps`.
3. Use `variant` splits when one Figma state changes JSX structure rather than only prop values.
4. Use a static `example`-only mapping when the component is better represented as a fixed composition in this repo.
5. Keep the `example` function parser-friendly and aligned with the real component API.

## Gotchas

- **Do not use inline conditionals or `.map()` in `example`**. The Code Connect parser in this workflow is stricter than normal React.
- **Do not declare props you fail to render**. If a prop is declared in `props`, it must be consumed in `example`.
- **Do not assume one icon package for every mapping**. Match the nearest comparable file and keep imports consistent with the touched slice.
- **Do not merge unrelated components into one file**. Multiple `figma.connect` calls are fine only when they describe variants of the same component.
- **Do not start from a page or frame URL**. HPE Code Connect mappings require the exact Figma component node.
- **Do not assume mappings live at the top of `src/`**. Follow existing component-family subfolders.
- **Do not invent props from Figma alone**. Reconcile Figma properties with the real Grommet or wrapper component API.
- **Do not require a `props` block for every mapping**. Static composition examples are valid in this repo.

## References

- See the bundled [authoring patterns](./references/authoring-patterns.md) for repo-specific mapping shapes.
- See the shared [skills index](../README.md) for the other Code Connect workflows.
- [../../instructions/code-connect/component-guidelines.instructions.md](../../instructions/code-connect/component-guidelines.instructions.md)
- [../../instructions/code-connect/figma-mcp.instructions.md](../../instructions/code-connect/figma-mcp.instructions.md)
- [../../../code-connect/src/Button.figma.jsx](../../../code-connect/src/Button.figma.jsx)
- [../../../code-connect/src/Menu.figma.jsx](../../../code-connect/src/Menu.figma.jsx)
- [../../../code-connect/src/Card.figma.jsx](../../../code-connect/src/Card.figma.jsx)
