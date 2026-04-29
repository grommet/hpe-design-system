---
name: code-connect-component
description: Generate or update one Figma Code Connect mapping for a single Grommet component and Figma node, then validate with sync.
agent: agent
tools: [vscode, execute, read, edit, search, 'figma/*', 'figma-desktop/*']
argument-hint: figmaUrl, componentName, fileName, propertyInventory
---

# Prompt: Code Connect Component

## Mission

Create or update exactly one Figma Code Connect mapping file for one Grommet component and one Figma node, then validate and publish it with the repository sync command.

## Scope & Preconditions

- Target stack is fixed: React + Grommet + `@figma/code-connect` CLI.
- Work only in `packages/code-connect/src/`.
- If required inputs are missing, request them before editing.
- If the Figma URL does not include `node-id`, stop and request a node-specific URL.

## Inputs

- Figma URL: `${input:figmaUrl:https://www.figma.com/design/<fileKey>/<fileName>?node-id=<nodeId>}`
- Target component name: `${input:componentName:Tag}`
- Destination file name: `${input:fileName:Tag.figma.jsx}`
- Variant/property inventory: `${input:propertyInventory:Name(TEXT), Value(TEXT), Size(VARIANT), is Clickable(VARIANT), is Removable(VARIANT)}`
- Current file context: `${file}`
- Selected code context: `${selection}`

## Required References

Read and follow these instruction files before making edits:

- `.github/instructions/code-connect/code-connect-guidelines.instructions.md`
- `.github/instructions/code-connect/code-connect-file-structure.instructions.md`
- `.github/instructions/code-connect/code-connect-component-guidelines.instructions.md`

## Workflow

1. Resolve the target file path as `packages/code-connect/src/${input:fileName}`.
2. Check existing Code Connect files for naming and mapping patterns.
3. Use Figma tools to inspect the exact node and confirm all mappable properties.
4. Map only supported props for the specified Grommet component.
5. Implement one `figma.connect` call with:
   - default `figma` import from `@figma/code-connect`
   - named component import from `grommet`
   - exact Figma URL with `node-id`
   - `props` mapping block
   - `example` render function
6. Ensure `example` passes mapped props directly.
7. Run sync from `packages/code-connect`:

```bash
pnpm run figma:sync
```

8. If parser validation fails, fix mapping shape and rerun until successful.
9. Report final published component links from sync output.

## Authoring Rules

- One component mapping per file.
- Match file and component naming (for example, `Tag.figma.jsx` for `Tag`).
- Map each relevant Figma property unless intentionally omitted with rationale.
- Use exact Figma variant option strings on enum map keys.
- Keep mapped prop values API-correct for the chosen Grommet component.

## Example Function Constraints

- Use direct mapped values in JSX props.
- Do not use inline conditional expressions in JSX props referencing mapped variables.
- Do not use computed wrappers that the Code Connect parser cannot trace.

### Good

```jsx
props: {
  onRemove: figma.enum('is Removable', {
    true: () => {},
    false: undefined,
  }),
},
example: ({ value, onRemove }) => <Tag value={value} onRemove={onRemove} />,
```

### Bad

```jsx
example: ({ removable }) => (
  <Tag onRemove={removable ? () => {} : undefined} />
),
```

## Output Expectations

Complete code changes in the workspace and provide:

1. File(s) created or updated.
2. Mapping summary (component, Figma node, mapped props).
3. Sync result summary with publish links.
4. Any intentional omissions or unresolved mapping constraints.

## Quality Checks

Before finishing:

1. Confirm file location and naming match Code Connect conventions.
2. Confirm `figma.connect` has component reference, exact node URL, `props`, and `example`.
3. Confirm no parser-unsafe JSX prop expressions are used.
4. Confirm `pnpm run figma:sync` succeeds and includes the target component in publish output.

## Avoid

- Using page-level Figma URLs without `node-id`.
- Generating Tailwind or non-Grommet component output.
- Mixing multiple unrelated component mappings in one file.
- Stopping after file edits without running sync.
