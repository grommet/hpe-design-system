# Skills Index

This directory contains repository-scoped GitHub Copilot skills for the HPE Design System workspace.

## Code Connect Skills

Use these for Code Connect work in this repository, including mapping Grommet components to Figma components.

| Skill                              | Use it when                                                                       | Main output                               |
| ---------------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------- |
| `code-connect-authoring`           | You need to intake, create, or update an HPE repo mapping                         | `.figma.jsx` file using `figma.connect()` |
| `code-connect-drift-audit`         | You need to review an existing HPE mapping for stale props, imports, or structure | Findings and targeted fixes               |
| `code-connect-sync-troubleshooter` | `figma:sync` fails or Figma Dev Mode output does not match expectations           | Root-cause diagnosis and sync repair      |

## Figma Skills

Use these when working with Figma files, Plugin API actions, or Code Connect templates.

| Skill                   | Use it when                                                            |
| ----------------------- | ---------------------------------------------------------------------- |
| `figma-use`             | You need to inspect or modify a Figma file through the Plugin API      |
| `figma-generate-design` | You need to create or update an editable Figma screen or composed view |

## General Customization Skills

| Skill                | Use it when                                            |
| -------------------- | ------------------------------------------------------ |
| `instruction-writer` | You want to create or refine a `.instructions.md` file |
| `prompt-builder`     | You want to create or refine a `.prompt.md` file       |

## Notes

- Code Connect mappings in this repo live under `knowledge/code-connect/src/`.
- The preferred root sync command is `pnpm --filter @hpe-design/code-connect figma:sync`.
- Each skill folder may include a `references/` directory for on-demand workflow details and checklists.
