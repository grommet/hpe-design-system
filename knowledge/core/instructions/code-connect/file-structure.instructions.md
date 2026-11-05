---
name: Code Connect File Structure
description: 'File naming conventions, location rules, and sync process for Figma Code Connect files.'
applyTo: '**/*.figma.{js,jsx,ts,tsx}'
---

# Instructions: Code Connect File Structure

## Rules and Guidelines

Choose the correct file name, location, and sync process when creating or updating Code Connect files.

## File Naming

1. **Pattern:** Name files using `<ComponentName>.figma.ts` (e.g., `Button.figma.ts`).
2. **Casing:** Use PascalCase matching the Grommet component name exactly.
3. **Extension:** Use `.figma.ts` for Code Connect v2 parserless templates. Do not create legacy `.figma.jsx` or `.figma.tsx` mappings.

## File Location

1. **Directory:** Place all Code Connect files under `knowledge/code-connect/src/`.
2. **Component-family folders:** Classify the component by its design-system purpose and reuse the matching existing family folder. Do not choose a folder based only on the component's name, source package, or API. Existing families include:
   - `knowledge/code-connect/src/controls/` for interactive controls such as buttons, tabs, menus, and anchors.
   - `knowledge/code-connect/src/inputs/` for form inputs.
   - `knowledge/code-connect/src/layouts/` for layout components such as cards.
   - `knowledge/code-connect/src/visualisations/` for components that communicate status or information visually, such as Avatar, Skeleton, Spinner, Tip, and Notification.
     Use the root `src/` only when no existing family fits.
3. **One file per component:** Each Grommet component gets its own `.figma.ts` file. Branch inside the template when variants change the snippet structure.

```text
knowledge/code-connect/src/
  controls/
    Button.figma.ts
  layouts/
    Card.figma.ts
  inputs/
    CheckBox.figma.ts
    DateInput.figma.ts
  visualisations/
    Notification.figma.ts
```

The package `figma.config.json` must include `src/**/*.figma.ts` and label snippets
as `React`. Template TypeScript types come from `@figma/code-connect/figma-types`
in the package `tsconfig.json`.

## Syncing to Figma

After creating or updating a Code Connect file, prefer the root-scoped sync command:

```bash
pnpm --filter @hpe-design/code-connect figma:sync
```

Equivalent from `knowledge/code-connect/`:

```bash
pnpm run figma:sync
```

### First-time Setup

Before syncing for the first time, create a `.env` file in `knowledge/code-connect/` with your Figma Personal Access Token:

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

1. **No misplaced files:** Do not place `.figma.ts` templates outside of `knowledge/code-connect/src/`.
2. **No mixed files:** Do not put unrelated component templates in one file.
3. **No unsynced changes:** Do not merge Code Connect file changes without running the Code Connect sync command and confirming success.

---

## Related References

- [component-guidelines.instructions.md](component-guidelines.instructions.md): Covers v2 template structure, property mapping, and snippet rendering.
- [guidelines.instructions.md](guidelines.instructions.md): High-level overview of the Code Connect workflow.
