---
name: Code Connect Guidelines
description: 'Guidelines for authoring Code Connect v2 templates for HPE Design System components'
applyTo: '**/*.figma.{js,jsx,ts,tsx}'
---

# Code Connect Guidelines

This package uses Code Connect v2 parserless `.figma.ts` templates. Do not add
legacy `.figma.jsx` files or `figma.connect(...)` mappings.

1. Create one template per Grommet component inside its existing component-family
   folder under `knowledge/code-connect/src/`.
2. Use the exact Figma component URL in a leading `// url=` directive. The URL must
   include `node-id` and point to a `COMPONENT` or `COMPONENT_SET`, not a frame.
3. Verify Figma property definitions with the Code Connect context tool and confirm
   the real Grommet API before authoring.
4. Import the runtime from `figma` and default-export a stable `id`, snippet
   `imports`, and `example: figma.code` tagged template. Read properties through
   `figma.selectedInstance`.
5. Map all relevant Figma properties. Static representative content is acceptable
   only when no useful Figma-driven mapping exists.
6. Run the package typecheck, parse, and sync commands. Keep credentials only in
   the gitignored `.env`.

## Migrating Legacy Mappings

Use the official migrator for existing parser-based files:

```bash
pnpm --filter @hpe-design/code-connect exec figma connect migrate --delete --exit-on-unreadable-files
```

Review generated variant branches, source URLs, imports, and structured values.
Preserve legacy `__props` metadata only when a parent template consumes it.
Do not treat successful migration or local parsing as proof of publication.

## Related References

- [component-guidelines.instructions.md](component-guidelines.instructions.md): Template API and rendering rules.
- [file-structure.instructions.md](file-structure.instructions.md): Naming, family folders, and sync.
- [figma-mcp.instructions.md](figma-mcp.instructions.md): Figma context workflow.
