# TODO: CheckBox

Reviewed against `checkbox.mdx.bak` on April 16, 2026.

## Missing visual assets

- Anatomy diagram image not yet created. The `## Anatomy` section contains a placeholder comment:
  `{/* TODO: Insert anatomy diagram image here */}`

## Missing or incomplete props documentation

- `indeterminate` prop is documented in the YAML and referenced in Behaviors but has no dedicated coded example in the Variants section. Consider adding a `CheckBoxIndeterminateExample.js` to show parent-child selection hierarchy.
- `reverse` prop documented in YAML but not demonstrated with a dedicated example.

## Dos and Don'ts

All three `<BestPracticeGroup>` blocks contain placeholder `{/* TODO: ... */}` comments. Coded preview examples need to be created for each pair:
- CheckBox inside FormField (do) vs CheckBox with no label (don't)
- Toggle for immediate effect (do) vs toggle inside a submit form (don't)
- RadioButtonGroup for single-select (do) vs CheckBox for single-select (don't)

## Behaviors not yet captured

- Indeterminate state is referenced in Behaviors but not shown in a variant example.
- The original MDX mentioned using `indeterminate` for a "Select All" parent-child pattern — this pattern warrants a dedicated example.
