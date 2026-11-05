---
name: code-connect-authoring
description: 'Authoring workflow for HPE Design System Code Connect v2 templates. Use when asked to create or update a `.figma.ts` file, migrate a legacy `.figma.jsx` mapping, translate Figma properties into templates, or mirror a Grommet component API in `knowledge/code-connect/src/`.'
version: 2.0.0
---

# Code Connect Authoring

Use this skill when writing or updating a Code Connect mapping file for this repository.

## When to Use This Skill

- User asks to create a new `.figma.ts` template or migrate a legacy `.figma.jsx` file
- User asks to update an existing mapping after a component API change
- User needs help translating Figma properties into Code Connect helpers
- User wants to know which mapping pattern matches a component best

## Step-by-Step Workflows

### Author a Mapping

1. Start from the intake inputs: target component, exact Figma node URL, and target file path. Preserve the family-based placement chosen during intake; do not default to the root `src/` directory.
2. Reuse the nearest existing mapping pattern before introducing a new structure.
3. Use `import figma from 'figma'`, leading `url`, `source`, and `component` directives, and a default export containing `id`, `imports`, and `example: figma.code`.
4. Read relevant properties with `figma.selectedInstance.getString`, `getBoolean`, `getEnum`, or `getInstanceSwap`. Resolve configurable child instances dynamically.
5. Branch in TypeScript when Figma states change snippet structure; retain representative static compositions when appropriate.
6. Render mapped values with `figma.helpers.react.renderProp`, preserving omission and structured values. Follow the [authoring patterns](./references/authoring-patterns.md) for booleans, nested instances, and code-valued props.
7. Run package typecheck and CLI parse with `--exit-on-unreadable-files`. Preview relevant states with a valid token, then sync; distinguish local validation from successful publishing.

## Gotchas

- **Do not create `figma.connect` files**. Code Connect v2 requires parserless `.figma.ts` templates, not JSX mappings.
- **Do not read props you fail to render**. Each mapped value must be consumed in the snippet.
- **Do not concatenate template sections**. Interpolate nested snippets with `figma.code`.
- **Do not import application components into the template runtime**. Put Grommet imports and `@hpe-design/icons-grommet` icons in the exported snippet `imports` array.
- **Do not copy legacy boolean variant filters blindly**. Verify BOOLEAN versus string-valued VARIANT properties before selecting an accessor.
- **Do not merge unrelated components into one file**. Branches may describe variants of the same component.

## References

- See the bundled [authoring patterns](./references/authoring-patterns.md) for repo-specific mapping shapes.
- See the shared [skills index](../README.md) for the other Code Connect workflows.
- [../../instructions/code-connect/component-guidelines.instructions.md](../../instructions/code-connect/component-guidelines.instructions.md)
- [../../instructions/code-connect/figma-mcp.instructions.md](../../instructions/code-connect/figma-mcp.instructions.md)
- [Button template](../../../code-connect/src/controls/Button.figma.ts)
- [Menu template](../../../code-connect/src/controls/Menu.figma.ts)
- [Card template](../../../code-connect/src/layouts/Card.figma.ts)
