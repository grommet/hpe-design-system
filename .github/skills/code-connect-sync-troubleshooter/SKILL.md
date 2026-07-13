---
name: code-connect-sync-troubleshooter
description: 'Troubleshooting workflow for HPE Design System Code Connect publish and validation failures. Use when `pnpm --filter @hpe-design/code-connect figma:sync` fails, when a mapping validates locally but does not publish as expected, or when token setup, node type, parser restrictions, or mapping shape might be blocking sync.'
---

# Code Connect Sync Troubleshooter

Use this skill to diagnose and fix Code Connect sync failures for this repository.

## When to Use This Skill

- `pnpm --filter @hpe-design/code-connect figma:sync` fails
- `pnpm run figma:sync` fails inside `packages/code-connect`
- A mapping looks correct but does not publish or render properly in Figma Dev Mode
- The failure source is unclear between token setup, node choice, or mapping structure

## Step-by-Step Workflows

### Troubleshoot Sync

1. Reproduce the failure with the package sync command and capture the exact error.
2. Check the touched mapping for the common structural issues first: wrong node URL, stale prop names, parser-hostile JSX, or missing prop consumption.
3. Confirm `.env` exists in `packages/code-connect/` and that token setup follows the package README.
4. Verify the target node is a `COMPONENT` or `COMPONENT_SET` rather than a frame or page selection.
5. If the file shape is correct, narrow the problem to the touched file and compare it with the nearest working mapping.

## Troubleshooting

| Issue                                          | Solution                                                                                                                           |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Sync command not found or wrong script assumed | Use `pnpm --filter @hpe-design/code-connect figma:sync` from the repo root, or `pnpm run figma:sync` from `packages/code-connect`. |
| Validation fails on a Figma URL                | Replace page or frame URLs with the exact component node URL including `node-id`.                                                  |
| Mapping publishes but output is wrong          | Check that every declared prop is rendered in `example` and that structural states use `variant` when needed.                      |
| Parser rejects JSX                             | Remove inline conditionals, dynamic iteration, and other non-static patterns from `example`.                                       |
| Authentication or publish errors               | Recheck `.env` in `packages/code-connect/` and the token scopes documented in the package README.                                  |

## Gotchas

- **Do not debug with an invented command**. This package exposes `figma:sync`, not a force-publish script.
- **Do not widen scope before reproducing the exact failure**. Fix the touched mapping first.
- **Do not assume token errors and mapping errors look different**. Check both the environment and the file shape.

## References

- See the bundled [failure modes reference](./references/failure-modes.md) for the first-pass diagnosis checklist.
- See the shared [skills index](../README.md) for the other Code Connect workflows.
- [../../instructions/code-connect/file-structure.instructions.md](../../instructions/code-connect/file-structure.instructions.md)
- [../../instructions/code-connect/figma-mcp.instructions.md](../../instructions/code-connect/figma-mcp.instructions.md)
- [../../../packages/code-connect/README.md](../../../packages/code-connect/README.md)
- [../../../packages/code-connect/package.json](../../../packages/code-connect/package.json)
