---
name: code-connect-sync-troubleshooter
description: 'Troubleshoot HPE Design System Code Connect v2 templates. Use when figma:sync fails, .figma.ts discovery or typechecking fails, snippets render incorrectly, or migration, dependencies, node URLs, or authentication block publishing.'
version: 2.0.0
---

# Code Connect Sync Troubleshooter

Use this skill to diagnose and fix Code Connect sync failures for this repository.

## When to Use This Skill

- `pnpm --filter @hpe-design/code-connect figma:sync` fails
- `pnpm run figma:sync` fails inside `knowledge/code-connect`
- A mapping looks correct but does not publish or render properly in Figma Dev Mode
- The failure source is unclear between token setup, node choice, or mapping structure

## Step-by-Step Workflows

### Troubleshoot Sync

1. Reproduce the failure with the package sync command and capture the exact error.
2. Read the underlying error above pnpm's failure summary. Check dependency/runtime errors first, then template discovery, leading directives, property names, and snippet rendering.
3. Confirm `.env` exists in `knowledge/code-connect/` and that token setup follows the package README.
4. Verify the target node is a `COMPONENT` or `COMPONENT_SET` rather than a frame or page selection.
5. If the file shape is correct, narrow the problem to the touched file and compare it with the nearest working mapping.

### Separate Local Validation from Figma Validation

1. Run `pnpm --filter @hpe-design/code-connect typecheck` to check template types.
2. Run `pnpm --filter @hpe-design/code-connect exec figma connect parse --exit-on-unreadable-files` to check discovery and bundling.
3. With a valid token, preview the touched template's representative property combinations using `figma connect preview` through the package's `dotenv` environment.
4. Run the package sync command and report its actual result. Local checks do not prove that Figma accepted or published a template.

## Troubleshooting

| Issue                                          | Solution                                                                                                                            |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Sync command not found or wrong script assumed | Use `pnpm --filter @hpe-design/code-connect figma:sync` from the repo root, or `pnpm run figma:sync` from `knowledge/code-connect`. |
| Validation fails on a Figma URL                | Replace page or frame URLs with the exact component node URL including `node-id`.                                                   |
| Mapping publishes but output is wrong          | Check that every mapped value is rendered in the snippet and structural branches cover the intended states.                         |
| CLI rejects legacy JSX mappings                | Migrate `figma.connect` files to v2 `.figma.ts` templates using the official migrator.                                              |
| No templates discovered                        | Check `figma.config.json` includes `src/**/*.figma.ts` and each template has a leading `// url=` directive.                         |
| Boolean-controlled content disappears          | Verify the Figma property type; use `getBoolean` for BOOLEAN properties, not comparisons with variant strings such as `'True'`.     |
| Authentication or publish errors               | Recheck `.env` in `knowledge/code-connect/` and the token scopes documented in the package README.                                  |

## Gotchas

- **Do not debug with an invented command**. This package exposes `figma:sync`, not a force-publish script.
- **Do not widen scope before reproducing the exact failure**. Fix the touched mapping first.
- **Do not assume token errors and mapping errors look different**. Check both the environment and the file shape.

## References

- See the bundled [failure modes reference](./references/failure-modes.md) for the first-pass diagnosis checklist.
- See the shared [skills index](../README.md) for the other Code Connect workflows.
- [../../instructions/code-connect/file-structure.instructions.md](../../instructions/code-connect/file-structure.instructions.md)
- [../../instructions/code-connect/figma-mcp.instructions.md](../../instructions/code-connect/figma-mcp.instructions.md)
- [../../../code-connect/README.md](../../../code-connect/README.md)
- [../../../code-connect/package.json](../../../code-connect/package.json)
