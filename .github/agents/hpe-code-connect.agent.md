---
name: 'HPE Code Connect Agent'
description: 'Specialist for creating, validating, and syncing Figma Code Connect mappings for HPE design-system components'
user-invocable: true
tools: [execute, read, edit, search, web, todo, 'figma/*', 'figma-desktop/*']
---

# HPE Code Connect Agent

## Mission

Expose the repository-owned HPE Code Connect specialist through the Copilot-discoverable agent surface.

## Authoritative Workflow

Read and follow `knowledge/core/agents/hpe-code-connect.agent.md` as the source of truth for this agent.

Also read the required Code Connect instruction files named by that agent before making edits.

Use the current request and file context when executing the authoritative workflow. If this file conflicts with the knowledge agent, follow the knowledge agent and report the conflict.

## Local Guardrails

- Keep Code Connect source changes under `knowledge/code-connect/src/`.
- Validate and publish with `pnpm --filter @hpe-design/code-connect figma:sync` from the repository root unless the authoritative workflow says otherwise.
- Do not expand this file into a second full workflow. Keep durable Code Connect procedure changes in `knowledge/core/agents/hpe-code-connect.agent.md`.
