# Knowledge

This directory is the AI-first knowledge system for the HPE Design System.

## Structure

- `core/`: reusable knowledge primitives shared across capabilities
- `capabilities/`: task-focused bundles with one orchestrator entrypoint each
- `code-connect/`: Figma Code Connect package and component mapping source files
- `onboarding/`: orientation and working guides for AI workflow contributors
- `schemas/`: machine validation contracts, including capability manifest schema
- `archive/`: deprecated or historical knowledge artifacts

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
- `alignment-audit` (status: planned)
  - Entry point: `@alignment-audit-orchestrator <scope>`
  - Manifest: `knowledge/capabilities/alignment-audit/manifest.yaml`

## Validation

Use the validator command to verify every capability manifest:

```sh
pnpm validate:capability-manifests
```
