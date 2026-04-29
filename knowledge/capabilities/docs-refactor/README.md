# Capability: docs-refactor

This capability refactors component documentation from legacy MDX into a YAML-driven docs workflow, establishing a machine-readable YAML source of truth and standardizing user-facing MDX pages.

## Primary Entrypoint

`@docs-refactor-orchestrator <component-name>`

## Architecture

The refactor pipeline transforms existing component MDX pages into standardized documentation:

1. **Extraction**: Convert legacy MDX into machine-readable YAML aligned to the component schema contract.
2. **Generation**: Transform YAML back into standardized MDX pages using documented templates.
3. **Enrichment**: Synthesize code examples and usage guidance based on component definition data.
4. **Quality**: Review copy for writing standards compliance, verify rendering, and create migration tracking.
5. **Delivery**: Package one component per PR with TODO/DEPRECATED tracking for human review.

See `execution.skill.md` for the detailed per-component workflow.

## Resources

- **Schema**: `knowledge/core/data/types.ts` — ComponentDefinition interface
- **Template**: `apps/docs/COMPONENT_TEMPLATE.md` — MDX page structure contract
- **Writing rules**: `knowledge/core/skills/writing-style.skill.md` — Tone and formatting standards
- **Plan**: `plan.md` — Component checklist and rollout tracking

## Agents

Nine specialized agents compose the pipeline:

1. `extract-yaml.agent.md` — Reverse-engineer legacy MDX to YAML
2. `generate-mdx.agent.md` — Synthesize standardized MDX from YAML
3. `generate-examples.agent.md` — Create code examples for use cases
4. `dos-donts.agent.md` — Author usage guidance pairs
5. `create-todos.agent.md` — Diff old vs. new and emit tracking
6. `review-copy.agent.md` — Audit writing quality and apply fixes
7. `verify-render.agent.md` — Run build and auto-repair known errors
8. `update-checklist.agent.md` — Mark component complete in plan
9. `docs-refactor-orchestrator.agent.md` — Master controller and stage detector

## Manifest

The machine-readable manifest is in `manifest.yaml`.
