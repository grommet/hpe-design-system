# Knowledge

This directory is the AI-first knowledge system for the HPE Design System.

## Structure

- `core/`: reusable knowledge primitives shared across capabilities
- `capabilities/`: task-focused bundles with one orchestrator entrypoint each
- `schemas/`: machine validation contracts, including capability manifest schema
- `archive/`: deprecated or historical knowledge artifacts

## Capability Index

- `docs-refactor` (status: planned)
  - Entry point: `@docs-refactor-orchestrator <component-name>`
  - Manifest: `knowledge/capabilities/docs-refactor/manifest.yaml`

## Validation

Use the validator command to verify every capability manifest:

```sh
pnpm validate:capability-manifests
```
