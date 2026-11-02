# New component documentation template

This contract belongs to docs-creation. Read the current
[component schema](../../../core/data/types.ts) and
[writing guidance](../../../core/skills/writing-style.skill.md). Do not copy
legacy assumptions about YAML fields, resource links, or page wrappers.

## Page structure

The site supplies the page title and description from
`apps/docs/src/data/structures/components.tsx`. Keep its description aligned
with approved YAML; do not add a duplicate H1 or description to MDX.
Use the existing site's MDX/layout integration, not a new layout framework.

Use this order:

1. Primary interactive example, with verified resource links.
2. `## Use cases` (required).
3. `## Anatomy` (required).
4. `## Variants` when applicable.
5. `## Dos and Don'ts` when approved pairs exist.
6. `## Behaviors and states` when applicable.
7. `## Content guidelines` when applicable.
8. `## Accessibility` (required).

Keep required sections present in drafts and record missing evidence as hidden
briefs and coverage gaps. A required section with a TODO is not publish-ready.
Do not create empty optional sections or invent content to fill them.

## Example scaffolding

The MDX generator does not code examples, create example source files, or embed
raw YAML snippets as examples. It creates hidden multiline JSX comments for
the primary example, every use case, any needed variant/state example, and
anatomy. Reuse an existing implementation only in the example-generation stage
after verifying that it meets the brief.

Each brief contains all seven fields with concrete instructions, supported by
approved YAML and intake sources:

```mdx
<Example height={{ min: 'small' }}>
  <div>
    {/* TODO: Selecting notification channels

      GOAL
      Let a user choose the channels that receive service alerts.

      CONTEXT
      Inside a notification-preferences form with a Save button.

      DATA
      Email, SMS, and Push; Email initially selected.

      INTERACTION
      Toggling a channel updates the selection and its visible summary.

      STATE
      selected: string[]; initially ['Email'].

      LAYOUT
      A compact form inside the Example wrapper; use theme spacing.

      CONSTRAINTS
      Use the approved component's actual multi-selection API.
      Keep labels visible and expose selection to assistive technology.
    */}

  </div>
</Example>
```

This is an illustrative brief, not component guidance. Author scenario-specific
briefs rather than copying these values. Use `None required` with a reason when
state or interaction is genuinely unnecessary. Include a stable descriptive TODO
title so implementation agents and the coverage reviewer can track it.

Always give `Example` a real child element, including during scaffolding; a
bare comment can become an undefined child at runtime. Replace the `<div>`
placeholder with a named example component during example generation.
Never import a not-yet-created example. Do not supply fake `code` URLs.

## Primary example and resources

Use `Example` from the existing layouts. Set `componentName` to the actual API
name and include verified `docs`, `figma`, `grommetSource`, or other supported
resource props from integration. Omit unknown optional links and report them.
Do not guess a Figma node or a source path.

## Use cases

Use a gerund task heading, followed by three to five concise sentences describing
the user goal, host context, realistic data, and interaction/outcome. Elaborate
only supported guidance; do not invent facts to reach a sentence count.
Follow each use case with an example brief. Put counter-indications in
Do/Don't guidance or an appropriate explicit alternative, not in task prose.

## Anatomy

Create an anatomy diagram brief, then render the approved anatomy as a table:

```text
Label | Region | Purpose | Required | Notes
```

Map `availability` to readable Required/Optional text without losing conditions.
Use meaningful numbered labels and accessible diagram descriptions.
Do not invent component parts. Diagrams use actual UI where practical, meaningful
boundaries, monochrome annotations, and no decorative outer border.

## Variants

A variant is a stable named configuration, not hover, focus, loading, or another
transient state. Render the schema's `name`, `description`, and `when` guidance,
then add a brief when a separate example helps. Do not introduce unsupported
fields such as `kind` or `defaultView` into canonical YAML.

## Dos and Don'ts

Place paired `Example` elements directly inside `BestPracticeGroup`, without
extra per-pair subheadings. Use the actual `bestPractice` object API:

```mdx
<BestPracticeGroup>
  <Example
    bestPractice={{ type: 'do', message: 'Keep option labels visible.' }}
  >
    <div>
      {/* TODO: Good visible-label preview; include GOAL, CONTEXT,
      DATA, INTERACTION, STATE, LAYOUT, and CONSTRAINTS with concrete values. */}
    </div>
  </Example>
  <Example
    bestPractice={{
      type: 'dont',
      message: 'Avoid ambiguous unlabeled options.',
    }}
  >
    <div>
      {/* TODO: Bad ambiguous-label preview; include GOAL, CONTEXT,
      DATA, INTERACTION, STATE, LAYOUT, and CONSTRAINTS with concrete values. */}
    </div>
  </Example>
</BestPracticeGroup>
```

The comments above abbreviate the brief format for illustration. Generated MDX
must expand all seven fields for **each** child. Messages, YAML pairs, and briefs
must agree. Use `reason` for concise rationale where supplied. Never manufacture
an opposing pattern just to produce a pair.

## Behaviors, states, and content

Render only supported entries from `interactiveStates`, `applicationStates`,
`dataStates`, `realEstate`, and `animation`. Organize applicable content under
sentence-case subsections. Add briefs for demonstrations that are still needed.
Render `contentGuidelines` as concise bullets for labels, messages, and other
text inside the component.

## Accessibility

Cover evidenced semantics, labeling, focus, keyboard interaction, announcements,
and limitations. Render populated tables as appropriate:

- Keyboard: `Key | Action`.
- ARIA: `Attribute | Value | Condition`.
- Announcements: `Trigger | Message`.

Use `<AccessibilitySection title="..." />` only when integration identifies an
existing, applicable, verified component-specific file under
`apps/docs/src/data/wcag/`. The component dynamically loads that file.
Do not invent schema fields such as `accessibility.wcagDataFile`, copy another
component's passing results, or equate type correctness with WCAG compliance.

If evidence/data is missing, keep supported accessibility guidance and a hidden
assessment TODO; report the missing assessment in the standard TODO file.
Do not show an unverified compliance badge or claim.
