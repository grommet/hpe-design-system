# FormField YAML review

## Sources

- [Extraction rules](../../../knowledge/capabilities/docs-refactor/agents/extract-yaml.agent.md)
- [Schema](../../../knowledge/core/data/types.ts)
- [Prop derivation rules](../../../knowledge/core/skills/derive-prop-types.skill.md)
- Installed Grommet 2.56.1: `components/FormField/index.d.ts`,
  `components/Box/index.d.ts`, and `utils/index.d.ts`, resolved from
  `apps/docs/node_modules/grommet`.
- [Official FormField API](https://v2.grommet.io/formfield)
- [API documentation source](https://github.com/grommet/grommet-site/blob/master/src/screens/FormField.js)
  (file blob SHA `280f531eb4ef1fe98db237c67e219a9ab65810e8`;
  accessed October 16, 2026).

## Inferred fields — verify before merging

Verify these permitted inferences against the Figma file and Grommet source:

- `usage.whenToUse`: entering labeled form values, correcting values with field
  messages, and validating named fields.
- `anatomy`: optional label, help, error, and informational text, plus an input
  area; confirm the regions and their required/optional classification.
- `dosAndDonts`: matching the label/input identifiers and supplying a name for
  validation; confirm these pairs as HPE guidance.

## Gaps and source conflicts

- `options` exists in the TypeScript interface but has no description in the
  official API documentation; its description is intentionally empty.
- `placeholder` exists in the TypeScript interface, but a declaration comment
  says it is not a FormField prop and describes an HTML attribute override.
  Keep the declared type and leave its description empty pending review.
- `component` is declared as `any`; preserve this type rather than narrowing it
  to the function/object forms shown in the API documentation.
- `name` is optional in TypeScript; it is required only when using `validate`,
  not an unconditionally required prop.
- `contentProps` retains the resolved named `BoxProps` object interface rather
  than duplicating the entire Box API. `MarginType` is expanded to its string
  and directional-object union; `PlaceHolderType` is expanded verbatim.
- No explicit prop defaults were established, so no `defaultValue` fields are
  authored.
- `usage.whenToAvoid`, variants, examples, interactive/data/layout/motion states,
  accessibility details, and related-component relationships lack sufficient
  source evidence and remain empty.
- No component-specific example directory exists. Do not manufacture example
  paths or embed JSX.
- The extraction agent and sample YAML use `examples[].path`, while the current
  schema requires `examples[].code` and permits `codeFile`, not `path`. An empty
  examples array avoids this conflict; resolve it before adding examples.
- The agent's registry path ends in `components.js`; the actual registry is
  `components.tsx`. Its description is synced to the API-derived YAML description.
- There is no legacy MDX to migrate. Keep the existing content-free route shell
  at `apps/docs/src/pages/components/formfield.mdx`; do not rename it to `.bak`
  or trigger downstream MDX/example generation.
