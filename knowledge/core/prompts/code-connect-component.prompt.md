---
name: code-connect-component
description: Generate or update one Code Connect v2 template for a Grommet component and Figma node, then validate and publish it.
agent: agent
tools: [vscode, execute, read, edit, search, 'figma/*', 'figma-desktop/*']
argument-hint: figmaUrl, componentName, fileName, propertyInventory
---

# Prompt: Code Connect Component

## Mission

Create or update exactly one Code Connect v2 template for one Grommet component and one Figma node, then validate and publish it with the repository sync command.

## Scope & Preconditions

- Target stack is fixed: React + Grommet + `@figma/code-connect` CLI.
- Work only in `knowledge/code-connect/src/`.
- If required inputs are missing, request them before editing.
- If the Figma URL does not include `node-id`, stop and request a node-specific URL.

## Inputs

- Figma URL: `${input:figmaUrl:https://www.figma.com/design/<fileKey>/<fileName>?node-id=<nodeId>}`
- Target component name: `${input:componentName:Tag}`
- Destination file name: `${input:fileName:Tag.figma.ts}`
- Variant/property inventory: `${input:propertyInventory:Name(TEXT), Value(TEXT), Size(VARIANT), is Clickable(VARIANT), is Removable(VARIANT)}`
- Current file context: `${file}`
- Selected code context: `${selection}`

## Required References

Read and follow these instruction files before making edits:

- `knowledge/core/instructions/code-connect/guidelines.instructions.md`
- `knowledge/core/instructions/code-connect/file-structure.instructions.md`
- `knowledge/core/instructions/code-connect/component-guidelines.instructions.md`
- `knowledge/core/instructions/code-connect/figma-mcp.instructions.md`

## Workflow

1. Resolve the target file path as `knowledge/code-connect/src/${input:fileName}` and use the `.figma.ts` extension.
2. Check existing v2 templates for naming and mapping patterns.
3. Use the Figma Code Connect context tool on the exact component or component-set URL and confirm its properties.
4. Inspect the specified Grommet component API and map only supported props.
5. Implement a parserless v2 template using the `figma` runtime, the required URL/source/component directives, and a default-exported `figma.code` example.
6. Read relevant property values from `figma.selectedInstance` and render each mapped value into the example.
7. Run local validation from the repository root:

```bash
pnpm --filter @hpe-design/code-connect typecheck
pnpm --filter @hpe-design/code-connect exec figma connect parse --exit-on-unreadable-files
```

8. Preview representative states when Figma credentials are available, then publish with:

```bash
pnpm --filter @hpe-design/code-connect figma:sync
```

9. Report local validation separately from publication and include published component links when sync provides them.

## Authoring Rules

- One component template per file.
- Match file and component naming (for example, `Tag.figma.ts` for `Tag`).
- Map each relevant Figma property unless intentionally omitted with rationale.
- Use the appropriate `figma.selectedInstance` accessor for each property type.
- Keep mapped prop values API-correct for the chosen Grommet component.
- Render every value read from the selected instance, and use `figma.helpers.react.renderProp` for mapped values.
- Do not create legacy `.figma.jsx` or `figma.connect(...)` mappings.

## Output Expectations

Complete code changes in the workspace and provide:

1. File(s) created or updated.
2. Mapping summary (component, Figma node, mapped props).
3. Typecheck and parse outcomes, plus sync result and publish links when available.
4. Any intentional omissions or unresolved mapping constraints.

## Quality Checks

Before finishing:

1. Confirm file location and naming match Code Connect conventions.
2. Confirm the v2 directives, `figma.selectedInstance` property reads, and `figma.code` example are correct.
3. Confirm each read property is rendered and each emitted prop exists in the component API.
4. Confirm typecheck and CLI parse succeed before sync; report whether publication completed.

## Avoid

- Using page-level Figma URLs without `node-id`.
- Generating Tailwind or non-Grommet component output.
- Mixing multiple unrelated component mappings in one file.
- Stopping after file edits without running sync.
