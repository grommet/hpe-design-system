---
name: Code Connect Figma MCP
description: 'Extract component definitions from Figma and implement or update Code Connect mappings for the HPE Design System.'
applyTo: 'knowledge/code-connect/src/**/*.figma.ts'
---

# Instructions: Code Connect Figma MCP

## Rules and Guidelines

These rules define how to translate Figma inputs into Code Connect mappings for this project and must be followed for every Figma-driven change.

When creating or updating a Code Connect file from Figma, follow this process:

1. Use the exact Figma component node URL, including the `node-id` query parameter.
2. Run the Code Connect-specific Figma context tool first to fetch the component property inventory for the exact node.
3. Run the design-context tool to confirm the intended component usage and variant behavior.
4. If the response is too large or truncated, use metadata to identify the required node and then re-fetch only that node.
5. Review an existing mapping in `knowledge/code-connect/src/` before creating a new file so naming and structure stay consistent.
6. Add or update a single `.figma.ts` template in the component's matching family folder under `knowledge/code-connect/src/`.
7. Prefer `pnpm --filter @hpe-design/code-connect figma:sync` from the repo root, or run `pnpm run figma:sync` from `knowledge/code-connect`, and confirm it exits with code `0` before marking the work complete.

## Implementation Rules

- Treat Figma MCP output as component and property reference data, not as final implementation code.
- Author Code Connect v2 templates with `import figma from 'figma'`, leading `url`, `source`, and `component` directives, and a default export containing `id`, `imports`, and `example: figma.code`.
- Put `grommet` and supporting component imports in the exported `imports` array and mirror their public JSX APIs in the snippet.
- Read relevant Figma properties with `figma.selectedInstance.getString`, `getBoolean`, `getEnum`, `getInstanceSwap`, or descendant lookup methods.
- Static composition mappings are acceptable when the existing project pattern does not expose useful Figma-driven props for that component.
- Use TypeScript branches for structural variants and React rendering helpers for optional props. Do not concatenate structured snippet sections.
- Place each component template in its own file named `<ComponentName>.figma.ts`.
- Do not use page-level or frame-level Figma URLs. Always connect to the exact component node.
- Do not leave changes unsynced. A mapping is not complete until the Code Connect sync command succeeds.

## Related References

- [guidelines.instructions.md](guidelines.instructions.md): High-level workflow and required sync behavior for Code Connect mappings.
- [component-guidelines.instructions.md](component-guidelines.instructions.md): Template property accessors, export structure, and snippet rendering requirements.
- [file-structure.instructions.md](file-structure.instructions.md): File naming and placement rules for `knowledge/code-connect/src/`.
- [coding-guidelines.instructions.md](../standards/coding-guidelines.instructions.md): React and Grommet authoring conventions used inside Code Connect examples.
