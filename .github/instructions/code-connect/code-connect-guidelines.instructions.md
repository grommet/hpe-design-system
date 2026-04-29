---
name: Code Connect Guidelines
description: 'Guidelines for authoring Figma Code Connect files for HPE Design System components'
applyTo: '**/*.figma.{js,jsx,ts,tsx}'
---

# Instructions: Code Connect Guidelines

## Rules and Guidelines

When wiring HPE Design System (Grommet) components to Figma using Code Connect, follow these core principles:

## Overview

1. **One file per component:** Each Grommet component that has a Figma counterpart gets its own `.figma.jsx` Code Connect file.
2. **Exact node URLs:** Always use the exact Figma component node URL — not a page or frame URL.
3. **Map all properties:** Every Figma component property (variants, booleans, strings) must be mapped in the `props` block.
4. **Sync after every change:** Run `pnpm run figma:sync` from `packages/code-connect` after creating or updating any Code Connect file.

## What to Avoid

1. **No page-level URLs:** Do not use a Figma page or frame URL — `node-id` must point to the exact component node.
2. **No hardcoded example values:** Do not pass hardcoded values in the `example` function for props that should be driven by Figma.
3. **No unsync'd changes:** Do not consider a Code Connect file complete until `pnpm run figma:sync` exits with code `0`.

---

## Related References

- [code-connect-component-guidelines.instructions.md](code-connect-component-guidelines.instructions.md): Required — covers `figma.connect` authoring rules, property mapping helpers, and the example render function.
- [code-connect-file-structure.instructions.md](code-connect-file-structure.instructions.md): Required — covers file naming conventions, directory placement, and sync process.
- [coding-guidelines.instructions.md](../coding-guidelines.instructions.md): Covers the React/Grommet component conventions used inside the `example` render function.
