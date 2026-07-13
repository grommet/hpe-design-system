# Skills Index

This directory contains repository-scoped GitHub Copilot skills for the HPE Design System workspace.

## Code Connect Skills

Use these when working in `packages/code-connect/` or when mapping Figma components to Grommet code.

| Skill                              | Use it when                                                                                   | Main output                          |
| ---------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------ |
| `code-connect-intake`              | You need to confirm the target component, Figma node URL, and target file path before editing | A correct mapping starting point     |
| `code-connect-authoring`           | You need to create or update a `.figma.jsx` mapping                                           | A repo-aligned Code Connect file     |
| `code-connect-drift-audit`         | You need to review an existing mapping for stale props, imports, or structure                 | Findings and targeted fixes          |
| `code-connect-sync-troubleshooter` | `figma:sync` fails or Figma Dev Mode output does not match expectations                       | Root-cause diagnosis and sync repair |

## General Customization Skills

| Skill                | Use it when                                            |
| -------------------- | ------------------------------------------------------ |
| `instruction-writer` | You want to create or refine a `.instructions.md` file |
| `prompt-builder`     | You want to create or refine a `.prompt.md` file       |

## Notes

- Code Connect mappings in this repo live under `packages/code-connect/src/`.
- The preferred root sync command is `pnpm --filter @hpe-design/code-connect figma:sync`.
- Each skill folder may include a `references/` directory for on-demand workflow details and checklists.
