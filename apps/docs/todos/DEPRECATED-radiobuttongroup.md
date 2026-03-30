# DEPRECATED: RadioButtonGroup

This file logs original content from `apps/docs/src/pages/components/radiobuttongroup.mdx` that was
removed or restructured during the refactor. Use this as a reference to confirm no
unique information was lost.

---

## Removed sections and content mapping

### `## Guidance > ### Best practices` (removed as a section)

The original MDX had a flat `### Best practices` bulleted list. This content was redistributed as follows:

| Original bullet | Destination in new structure |
| --- | --- |
| "Keep labels concise and simple. Avoid lengthy descriptions, however err on clarity over brevity." | `contentGuidelines` in YAML → `## Content Guidelines` in MDX |
| "If there are more than five options, or if the default value is expected most of the time, consider using Select instead." | `usage.whenToAvoid` in YAML → `## Dos and Don'ts` (don't: use for 6+ items) |
| "Use when the user needs to see all related options." | `usage.whenToUse` in YAML → `## Use cases` (use case: choosing between 2–5 options) |
| "Radio buttons should always be listed vertically with one choice per line." | `dosAndDonts` in YAML → `## Dos and Don'ts` (do: list options vertically) |
| "Never add sub-categories to a RadioButtonGroup." | `usage.whenToAvoid` in YAML; not rendered separately — no paired do/don't pattern surfaced |

### `## Guidance > ### When to use` (removed as a section)

The original MDX had a single prose paragraph under `### When to use`. This content was redistributed as follows:

| Original content | Destination in new structure |
| --- | --- |
| "RadioButtonGroup is used to lay out a discreet list of mutually related options that are easily visible." | Incorporated into the component `description` field in YAML |
| "RadioButtonGroup requires an input choice, so it is important to be clear with what is being asked of the user on the label." | `contentGuidelines` → `## Content Guidelines` |
| "When users should be able to select more than one option, use CheckBoxGroup instead." | `usage.whenToAvoid` in YAML; `relatedComponents` → not directly rendered as prose (captured in `## Dos and Don'ts` as a whenToAvoid item) |

### `## Variants` prose intro paragraph (restructured)

Original: "RadioButtonGroup is primarily used to select a single item from a list of two or more options."

This sentence was retained verbatim as the introductory line of the `## Variants` section in the new MDX.

### `## Variants > ### Validation` description (restructured)

Original: "Validation styling indicates that a selection was not made. In many cases, a clear label for the group and an error message of 'required' may be sufficient. Bonus points go to messages explaining why a required selection is beneficial to the user."

Redistributed to: `## Behaviors and States > ### Application States > #### Validation` in the new MDX, with light editorial revision to align with imperative tone guidelines.

### `## Variants > ### Disabled` description (restructured)

Original: "Indicates that the RadioButtonGroup input exists but cannot be interacted with until a precondition is met."

Redistributed to: `## Behaviors and States > ### Application States > #### Disabled` in the new MDX. The additional implementation note about setting `disabled` on both the FormField and the RadioButtonGroup was extracted from the example file comments and added to the prose.

### `## Accessibility > ### WCAG compliance` (unchanged)

The original `<AccessibilitySection title='radiobuttongroup' />` component usage was preserved verbatim in the new MDX.

---

## Content with no clear destination (not migrated)

- The note "Never add sub-categories to a RadioButtonGroup" has no natural do/don't counterpart. It is captured in `usage.whenToAvoid` in the YAML but was not rendered in the new MDX as a standalone Dos and Don'ts pair. Evaluate whether a visual example could make this rule concrete enough to merit a `<BestPracticeGroup>` entry.
