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
3. **Map relevant properties:** Map every relevant Figma component property in the `props` block. If the component is represented as a static composition in this repo, an `example`-only mapping is acceptable.
4. **Sync after every change:** Prefer `pnpm --filter @hpe-design/code-connect figma:sync` from the repo root, or run `pnpm run figma:sync` from `packages/code-connect`.

## Finding the Correct Node ID

The `node-id` in the Figma URL must point to a `COMPONENT` or `COMPONENT_SET` node (purple ◆ or ◈ icon in the layers panel). To get the correct URL:

1. In Figma, navigate to the component in the layers panel.
2. Right-click the component and select **Copy link to selection**.
3. Use the `node-id` from that URL in your `figma.connect` call.

## Auto-Generating Boilerplate (Recommended)

Instead of writing the `props` block by hand, use the `figma connect create` command to generate a starter mapping from the Figma component URL. It reads all properties from Figma and pre-fills every mapping for you:

```bash
dotenv -e .env -- figma connect create "<figma-component-url>"
```

For example:

```bash
dotenv -e .env -- figma connect create "https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/HPE-Design-System-Components-V2?node-id=2133-694"
```

This generates a starter file in the current directory with every Figma property already mapped. Then:

1. Move the file to the appropriate location under `packages/code-connect/src/`
2. Rename it to match the repo convention if needed: `<ComponentName>.figma.jsx`
3. Review and adjust the Grommet prop names, imports, and `example` output to match the actual API
4. Run the sync command to publish

This is the **recommended starting point** for any new component — it ensures no Figma properties are missed.

To manually verify the node type and see its exact property names, run:

```bash
source .env && curl -s \
  -H "X-Figma-Token: $FIGMA_ACCESS_TOKEN" \
  "https://api.figma.com/v1/files/<fileKey>/nodes?ids=<nodeId>" | \
  python3 -c "import sys,json; d=json.load(sys.stdin); node=list(d['nodes'].values())[0]['document']; print('Type:', node['type']); print('Props:', json.dumps(node.get('componentPropertyDefinitions',{}), indent=2))"
```

This will print the node type and the exact property names to use in your `props` block.

## What to Avoid

1. **No page-level URLs:** Do not use a Figma page or frame URL — `node-id` must point to the exact component node.
2. **No hardcoded example values:** Do not pass hardcoded values in the `example` function for props that should be driven by Figma.
3. **No unsynced changes:** Do not consider a Code Connect file complete until the Code Connect sync command exits with code `0`.

---

## Related References

- [component-guidelines.instructions.md](component-guidelines.instructions.md): Required — covers `figma.connect` authoring rules, property mapping helpers, and the example render function.
- [file-structure.instructions.md](file-structure.instructions.md): Required — covers file naming conventions, directory placement, and sync process.
- [coding-guidelines.instructions.md](../standards/coding-guidelines.instructions.md): Covers the React/Grommet component conventions used inside the `example` render function.
