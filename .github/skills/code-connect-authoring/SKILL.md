---
name: code-connect-authoring
description: 'Authoring workflow for HPE Design System Code Connect mappings. Use when asked to create or update a `.figma.jsx` file, translate Figma properties into `figma.connect(...)`, choose between `props`, `variant`, or static composition patterns, or mirror a Grommet component API in `packages/code-connect/src/`.'
---

# Code Connect Authoring

Use this skill when writing or updating a Code Connect mapping file for this repository.

## When to Use This Skill

- User asks to create a new `.figma.jsx` file
- User asks to update an existing mapping after a component API change
- User needs help translating Figma properties into Code Connect helpers
- User wants to know which mapping pattern matches a component best

## Step-by-Step Workflows

### Author a Mapping

1. Start from the intake inputs: target component, exact Figma node URL, and target file path.
2. Reuse the nearest existing mapping pattern before introducing a new structure.
3. Map relevant Figma properties with the appropriate helpers such as `figma.string`, `figma.boolean`, `figma.enum`, `figma.instance`, or `figma.nestedProps`.
4. Use `variant` splits when one Figma state changes JSX structure rather than only prop values.
5. Use a static `example`-only mapping when the component is better represented as a fixed composition in this repo.
6. Keep the `example` function parser-friendly and aligned with the real component API.

## Gotchas

- **Do not use inline conditionals or `.map()` in `example`**. The Code Connect parser in this workflow is stricter than normal React.
- **Do not declare props you fail to render**. If a prop is declared in `props`, it must be consumed in `example`.
- **Do not assume one icon package for every mapping**. Match the nearest comparable file and keep imports consistent with the touched slice.
- **Do not merge unrelated components into one file**. Multiple `figma.connect` calls are fine only when they describe variants of the same component.

## References

- See the bundled [authoring patterns](./references/authoring-patterns.md) for repo-specific mapping shapes.
- See the shared [skills index](../README.md) for the other Code Connect workflows.
- [../../instructions/code-connect/component-guidelines.instructions.md](../../instructions/code-connect/component-guidelines.instructions.md)
- [../../instructions/code-connect/figma-mcp.instructions.md](../../instructions/code-connect/figma-mcp.instructions.md)
- [../../../packages/code-connect/src/Button.figma.jsx](../../../packages/code-connect/src/Button.figma.jsx)
- [../../../packages/code-connect/src/Menu.figma.jsx](../../../packages/code-connect/src/Menu.figma.jsx)
- [../../../packages/code-connect/src/Card.figma.jsx](../../../packages/code-connect/src/Card.figma.jsx)
