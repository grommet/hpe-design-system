# Foundations

Cross-cutting rules that apply across product UI rather than to a single component or pattern (spacing, layout, design tokens, etc.).

## Shape

Each file is a `FoundationDefinition` (see [types.ts](../types.ts)): an `id`, `name`, `description`, and a flat `rules` array. There is no applicability/guidance split — every rule is a direct `statement` + `rationale` pair, optionally with an `example` (reuses `ComponentExample`, no separate `RuleExample` type) and `relatedTo` cross-references to glossary terms, other rules, components, patterns, or external standards.

## Conventions

- Rule `id`s are stable, descriptive kebab-case slugs (e.g. `spacing-use-tokens-everywhere`), not numeric positional identifiers, so reordering rules never breaks references.
- Use `relatedTo` (not `relatedComponents`/`relatedPatterns`, which stay on components/patterns) for mixed-type cross-references.
- `pnpm validate:knowledge-structure` checks rule id uniqueness and that `relatedTo`/`confusedWith` references resolve to real ids.

## Consuming

Do not read these files whole. Use the CLI checklist / `--rule` commands or the
`foundation-rules` skill. Builders and validators use the checklist; fetch a
rule in full by id only when explaining or reporting a failure.
