# Knowledge

This directory is the AI-first knowledge system for the HPE Design System.

## Structure

- `core/`: reusable knowledge primitives shared across capabilities
- `capabilities/`: task-focused bundles with one orchestrator entrypoint each
- `schemas/`: machine validation contracts, including capability manifest schema
- `archive/`: deprecated or historical knowledge artifacts

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

## Getting Started

### Quick Start: Refactoring a Component

The `docs-refactor` capability is currently active and ready to use. It orchestrates component documentation refactoring from legacy MDX to YAML-driven standardized format.

To refactor a component's documentation:

1. Open GitHub Copilot Chat in VS Code with agent mode enabled.
2. Run the orchestrator:
   ```
   @docs-refactor-orchestrator <component-name>
   ```
   Replace `<component-name>` with the target component (e.g., `button`, `checkbox`).

3. The orchestrator will:
   - Detect the current refactor stage for your component.
   - Present a status report showing files and blockers.
   - Guide you through the pipeline with approval gates.
   - Delegate to specialized agents (extract → generate → examples → todos → review → verify → checklist).

4. See [knowledge/capabilities/docs-refactor/plan.md](knowledge/capabilities/docs-refactor/plan.md) for the Full Component Checklist and [knowledge/capabilities/docs-refactor/execution.skill.md](knowledge/capabilities/docs-refactor/execution.skill.md) for step-by-step walkthrough.

### Adding a New Component

Component documentation should follow the refactor pipeline. Here's the workflow:

1. **Ensure the component exists in Grommet** and has existing MDX docs at `apps/docs/src/pages/components/[component-name].mdx`.

2. **Start the orchestrator:**
   ```
   @docs-refactor-orchestrator <component-name>
   ```

3. **Follow the guided pipeline:**
   - Extract existing MDX into YAML schema at `knowledge/core/data/components/[component-name].yaml`.
   - Generate standardized MDX from the YAML source.
   - Create/refine coded examples in `apps/docs/src/examples/components/[component-name]/`.
   - Create do/don't visual previews for best practices.
   - Generate TODO and DEPRECATED tracking files.
   - Review and polish copy.
   - Verify the component renders without errors in the docs build.
   - Mark the component complete in the plan checklist.

4. **Commit and open a PR** with the component name in the title, e.g., `docs: refactor [ComponentName] component`.

See [knowledge/capabilities/docs-refactor/README.md](knowledge/capabilities/docs-refactor/README.md) for architecture and agent descriptions.

## Understanding Capabilities

Each capability is a self-contained task-focused bundle:

- **`docs-refactor` (active):** Coordinates documentation standardization using 9 specialized agents and 10 reusable skills. Suitable for production use.

- **Planned capabilities:** These have schema-valid manifests and stub orchestrators, ready for implementation when prioritized:
  - `component-creation`: Workflow for implementing new components.
  - `pattern-creation`: Workflow for defining reusable UI patterns.
  - `design-tokens-publishing`: Workflow for publishing design tokens from source to packages.
  - `package-release`: Workflow for releasing design-system packages.
  - `alignment-audit`: Workflow for auditing component/documentation compliance.

## Core Resources

- **Data Definitions:** `knowledge/core/data/` contains the schema contract (`types.ts`) and reusable templates (`COMPONENT_EXAMPLE.yaml`) for component definitions.
- **Reusable Skills:** `knowledge/core/skills/` contains 10 documented methodologies (extraction, generation, synthesis, authoring, review, etc.) shared across capabilities.
- **Schema Contracts:** `knowledge/schemas/capability-manifest.schema.json` defines the structure for all capability manifests (version `knowledge.hpe.com/v1`).
- **Archive:** `knowledge/archive/` stores deprecated workflows, prompts, and historical instructions for reference only.

## Next Steps

- **Contribute to docs-refactor:** Pick a component from the Full Component Checklist and run the orchestrator.
- **Implement a planned capability:** Reference how docs-refactor agents work to design new workflows.
- **Improve reusable skills:** Extract common patterns from agents into standalone skills for cross-capability reuse.
- **Update this guide:** Add tips, patterns, or lessons learned as you work with the system.
