# Knowledge

This directory is the AI-first knowledge system for the HPE Design System.

## Structure

- `core/`: reusable knowledge primitives shared across capabilities
- `capabilities/`: task-focused bundles with one orchestrator entrypoint each
- `code-connect/`: Figma Code Connect package and component mapping source files
- `onboarding/`: orientation and working guides for AI workflow contributors
- `schemas/`: machine validation contracts, including capability manifest schema
- `archive/`: deprecated or historical knowledge artifacts

## Ownership Rules

- Author reusable, domain-specific AI workflow content in `knowledge/core/`.
  This includes HPE Design System agents, instructions, prompts, skills, and shared reference data.
- Author task-specific workflows in `knowledge/capabilities/<capability>/`.
  Each capability owns its orchestrator, subordinate agents, local documentation, and manifest.
- Keep Figma Code Connect mappings in `knowledge/code-connect/`.
  The source files live under `knowledge/code-connect/src/`, and the preferred sync command is `pnpm --filter @hpe-design/code-connect figma:sync` from the repository root.
- Use `.github/` for Copilot-discoverable entrypoints, repository governance, and meta-guidance.
  When `.github/` files mirror knowledge content, keep them thin and aligned with the authoritative `knowledge/` paths.
- Do not create a second manually divergent source of truth across `.github/` and `knowledge/`.
  If content needs to exist in both places for tool discovery, document the ownership and validate drift.

## Contributor Onboarding

New AI workflow contributors should begin with the
[HPE Design System AI Workflow Onboarding](onboarding/README.md), then follow the
[first-week checklist](onboarding/first-week.md) and the
[design-to-code playbook](onboarding/design-to-code-playbook.md).

## Core

- `agents/`:
- `data/`: structured data defining HPE Design System components and patterns
- `instructions/`:
- `prompts/`:
- `skills/`:

The [design-system-agent](../packages/design-system-agent/) package reads
`core/data` (and relevant `.github/instructions`) to answer natural-language
implementation queries. Run it with
`pnpm --filter @hpe-design-system/agent generate -- "<query>"`.

## Capability Index

- `docs-refactor` (status: active)
  - Entry point: `@docs-refactor-orchestrator <component-name>`
  - Manifest: `knowledge/capabilities/docs-refactor/manifest.yaml`
- `component-creation` (status: planned)
  - Entry point: `@component-creation-orchestrator <component-name>`
  - Manifest: `knowledge/capabilities/component-creation/manifest.yaml`
- `pattern-creation` (status: planned)
  - Entry point: `@pattern-creation-orchestrator <pattern-name>`
  - Manifest: `knowledge/capabilities/pattern-creation/manifest.yaml`
- `design-tokens-publishing` (status: planned)
  - Entry point: `@design-tokens-publishing-orchestrator <token-scope>`
  - Manifest: `knowledge/capabilities/design-tokens-publishing/manifest.yaml`
- `package-release` (status: planned)
  - Entry point: `@package-release-orchestrator <package-name>`
  - Manifest: `knowledge/capabilities/package-release/manifest.yaml`
- `alignment-audit` (status: active)
  - Entry point: `@alignment-audit-orchestrator <scope>`
  - Manifest: `knowledge/capabilities/alignment-audit/manifest.yaml`

## Validation

Use the validator commands to verify capability manifests and knowledge structure:

```sh
pnpm validate:capability-manifests
pnpm validate:knowledge-structure
```
