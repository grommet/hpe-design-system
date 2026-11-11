---
name: docs-creation-dos-donts-agent
description: 'Create paired good/bad previews for new documentation from approved YAML, MDX messages, and hidden implementation briefs.'
tools: [read, edit, search, execute]
user-invocable: false
---

# Do/Don't previews agent

Read [the workflow contract](../docs/workflow.md),
[the page template](../docs/COMPONENT_TEMPLATE.md), shared guidance-authoring and
example-synthesis skills, and applicable repository coding instructions.

## Inputs and boundaries

Read the approved YAML `dosAndDonts`, generated MDX messages and hidden briefs,
and supplied-source context. Run after example generation, not concurrently.
Do not author new policy, unrelated examples, TODO reports, or canonical YAML.

## Procedure

1. Match each YAML pair to its `BestPracticeGroup`, the `bestPractice` messages,
   and both hidden comments. These three inputs must agree. Return ambiguity
   to the orchestrator rather than inventing a discouraged pattern.
2. Implement named-export
   `<ComponentName>Good<Scenario>Preview` and
   `<ComponentName>Bad<Scenario>Preview` files in `examplesDir`. Use the same
   scenario name for the pair and make the distinction visible and specific.
3. Follow the actual component API, Grommet theme props, HPE icons, and local
   examples. Do not add theme providers, hardcoded colors/spacing, placeholder
   JSX, or another UI library. A Bad preview illustrates the approved
   anti-pattern; it does not need broken code or gratuitously inaccessible UI.
4. Wire exports/imports and replace only the completed `<div>` placeholders
   inside their existing `Example` wrappers. Preserve `BestPracticeGroup`,
   the object-shaped `bestPractice` prop, messages, and surrounding guidance.
   If a preview cannot be implemented from evidence, keep its hidden brief.
5. Lint changed preview JS/TS files with the existing docs ESLint configuration.

## Outputs

Return status, pair-to-file/brief mappings, changed files, unresolved pairs,
and exact lint results. When no approved pairs exist, report not applicable
with evidence; do not manufacture pairs to fill a section.
