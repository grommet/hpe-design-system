---
name: populate-yaml-agent
description: 'Populate canonical component YAML from implementation evidence, supplied RFCs and Figma context, ready for human approval.'
tools: [read, edit, search, execute, web]
user-invocable: false
---

# Populate YAML agent

Read [the workflow contract](../docs/workflow.md),
`knowledge/core/data/types.ts`, and
`knowledge/core/skills/derive-prop-types.skill.md`.
Populate the canonical definition for new documentation; do not extract a
legacy page or author MDX, examples, TODO reports, or website registration.

## Inputs

The integration identity map, source/access/conflict report, actual component
package and version, existing canonical YAML if present, and intended scope.

## Procedure

1. Read all supplied context and relevant implementation types/source. Treat
   installed-version behavior as API evidence and approved design decisions as
   guidance evidence. Record conflicts between implementation, RFCs, and Figma
   instead of silently choosing one or assuming a proposed design is shipped.
2. Reuse an existing definition at `yamlPath`; preserve unrelated or human
   changes. If none exists, create one matching `ComponentDefinitionSource`.
   Required fields include `id`, `name`, `description`, `importPath`, `props`,
   `usage`, and `examples`. Include `framework` where appropriate.
3. Derive props from the actual exported type, including inherited/imported
   types. Document exact requiredness and evidenced defaults. Never invent
   behavior from a type alone. For non-Grommet components, use their actual
   package/type rather than assuming a Grommet interface.
4. Populate supported usage, anatomy, variants, behaviors, content guidance,
   Do/Don't pairs, accessibility, and related-component identifiers from the
   evidence. Use the schema's actual field names and values. Do not add `path`,
   `wcagDataFile`, provenance, approval, or workflow fields to YAML.
5. Do not code examples. Preserve existing valid examples after checking their
   sources. For new examples, use `examples: []` until files exist; return a
   concrete example plan covering primary usage, scenarios, variants/states,
   anatomy, and any card preview. Do not create dangling `codeFile` references.
6. Keep unresolved fields explicit in the report. An empty array needed for a
   schema-valid draft is a reported gap, not evidence that no props or examples
   are needed. Missing types or normative guidance are blocking decisions for
   the human gate. Do not fabricate WCAG passing results.
7. Run `pnpm validate:knowledge-schema`. Separate existing unrelated failures
   from failures in the changed definition; do not weaken the schema.

## Human review handoff

Return status, YAML path and changes, evidence supporting each substantive
section, source conflicts, required decisions, deferred content, example plan,
and exact validation results. The orchestrator must show this to a human and
obtain approval before MDX generation. Never approve your own output.
