---
name: Code Connect File Structure
description: 'File naming conventions, location rules, and sync process for Figma Code Connect files.'
applyTo: '**/*.figma.{js,jsx,ts,tsx}'
---

# Instructions: Code Connect File Structure

## Rules and Guidelines

Choose the correct file name, location, and sync process when creating or updating Code Connect files.

## File Naming

1. **Pattern:** Name files using `<ComponentName>.figma.jsx` (e.g., `Button.figma.jsx`).
2. **Casing:** Use PascalCase matching the Grommet component name exactly.
3. **Extension:** Use `.figma.jsx` for all React/Grommet Code Connect files.

## File Location

1. **Directory:** Place all Code Connect files under `packages/code-connect/src/`.
2. **Existing subfolders:** Reuse an existing subfolder when it matches the component family, such as `packages/code-connect/src/inputs/` for input components.
3. **One file per component:** Each Grommet component gets its own `.figma.jsx` file. Multiple `figma.connect` calls are acceptable in the same file when they describe variants of that same component.

```text
packages/code-connect/src/
  Button.figma.jsx
  Card.figma.jsx
  inputs/
    CheckBox.figma.jsx
    DateInput.figma.jsx
```

## Syncing to Figma

After creating or updating a Code Connect file, prefer the root-scoped sync command:

```bash
pnpm --filter @hpe-design/code-connect figma:sync
```

Equivalent from `packages/code-connect/`:

```bash
pnpm run figma:sync
```

### First-time Setup

Before syncing for the first time, create a `.env` file in `packages/code-connect/` with your Figma Personal Access Token:

```
FIGMA_ACCESS_TOKEN="your_token_here"
```

Generate the token in **Figma > Settings > Account > Personal access tokens** with these scopes:

- `file_content:read` (under Files)
- `file_code_connect:write` (under Development)

The `.env` file is covered by the root `.gitignore` and must never be committed.

1. **Always sync after changes:** Do not leave Code Connect files unsynced — changes are only reflected in Figma after a successful sync.
2. **Verify exit code:** Confirm the sync command exits with code `0` before considering the file complete.

## What to Avoid

1. **No misplaced files:** Do not place `.figma.jsx` files outside of `packages/code-connect/src/`.
2. **No mixed files:** Do not place multiple unrelated `figma.connect` calls in one file.
3. **No unsynced changes:** Do not merge Code Connect file changes without running the Code Connect sync command and confirming success.

---

## Related References

- [component-guidelines.instructions.md](component-guidelines.instructions.md): Covers `figma.connect` authoring rules, property mapping, and the example render function.
- [guidelines.instructions.md](guidelines.instructions.md): High-level overview of the Code Connect workflow.
