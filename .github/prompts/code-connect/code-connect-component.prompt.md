---
name: code-connect-component
description: Generate or update one Figma Code Connect mapping for a single Grommet component and Figma node, then validate with sync.
agent: agent
tools: [vscode, execute, read, edit, search, 'figma/*', 'figma-desktop/*']
argument-hint: figmaUrl, componentName, fileName, propertyInventory
---

# Prompt: Code Connect Component

## Mission

Launch the repository-owned Code Connect component workflow from the Copilot-discoverable prompt surface.

## Inputs

- Figma URL: `${input:figmaUrl:https://www.figma.com/design/<fileKey>/<fileName>?node-id=<nodeId>}`
- Target component name: `${input:componentName:Tag}`
- Destination file name: `${input:fileName:Tag.figma.jsx}`
- Variant/property inventory: `${input:propertyInventory:Name(TEXT), Value(TEXT), Size(VARIANT), is Clickable(VARIANT), is Removable(VARIANT)}`
- Current file context: `${file}`
- Selected code context: `${selection}`

## Authoritative Workflow

Read and follow `knowledge/core/prompts/code-connect-component.prompt.md` as the source of truth for this workflow.

Also read the required Code Connect instruction files named by that prompt before making edits.

Use the inputs from this prompt invocation when executing the authoritative workflow. If this file conflicts with the knowledge prompt, follow the knowledge prompt and report the conflict.

## Local Guardrails

- Keep Code Connect source changes under `knowledge/code-connect/src/`.
- Validate and publish with `pnpm --filter @hpe-design/code-connect figma:sync` from the repository root unless the authoritative workflow says otherwise.
- Do not expand this file into a second full workflow. Keep durable Code Connect procedure changes in `knowledge/core/prompts/code-connect-component.prompt.md`.
