---
name: Code Connect Figma MCP
description: 'Extract component definitions from Figma and implement or update Code Connect mappings for the HPE Design System.'
applyTo: 'packages/code-connect/src/*.figma.jsx'
---

# Instructions: Code Connect Figma MCP

## Rules and Guidelines

These rules define how to translate Figma inputs into Code Connect mappings for this project and must be followed for every Figma-driven change.

When creating or updating a Code Connect file from Figma, follow this process:

1. Use the exact Figma component node URL, including the `node-id` query parameter.
2. Run `get_context_for_code_connect` first to fetch the component property inventory for the exact node.
3. Run `get_design_context` to confirm the intended component usage and variant behavior.
4. If the response is too large or truncated, run `get_metadata` to identify the required node and then re-fetch only that node.
5. Review an existing mapping in `packages/code-connect/src/` before creating a new file so naming and structure stay consistent.
6. Add or update a single `.figma.jsx` file for the component under `packages/code-connect/src/`.
7. Run `pnpm run figma:sync` from `packages/code-connect` and confirm it exits with code `0` before marking the work complete.

## Implementation Rules

- Treat Figma MCP output as component and property reference data, not as final implementation code.
- Author mappings as React Code Connect files using `figma.connect(...)` from `@figma/code-connect`.
- Import HPE Design System components from `grommet` and mirror their public JSX APIs in the `example` function.
- Map every relevant Figma property with the appropriate helper (`figma.string`, `figma.boolean`, `figma.enum`, `figma.instance`, `figma.nestedProps`).
- Keep example JSX parser-friendly for Code Connect. Prefer mapped props over inline conditional expressions when the parser cannot resolve them.
- Place each component mapping in its own file named `<ComponentName>.figma.jsx`.
- Do not use page-level or frame-level Figma URLs. Always connect to the exact component node.
- Do not leave changes unsynced. A mapping is not complete until `pnpm run figma:sync` succeeds.

## Related References

- [code-connect-guidelines.instructions.md](code-connect-guidelines.instructions.md): High-level workflow and required sync behavior for Code Connect mappings.
- [code-connect-component-guidelines.instructions.md](code-connect-component-guidelines.instructions.md): Property mapping helpers, `figma.connect` structure, and example render requirements.
- [code-connect-file-structure.instructions.md](code-connect-file-structure.instructions.md): File naming and placement rules for `packages/code-connect/src/`.
- [coding-guidelines.instructions.md](../coding-guidelines.instructions.md): React and Grommet authoring conventions used inside Code Connect examples.
