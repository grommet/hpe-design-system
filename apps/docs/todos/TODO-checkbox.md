# TODO: CheckBox

## Missing coded examples

None identified. All four use case examples are implemented.

> Status:No action required <br />Name:Julia ML <br />Date: 13 Aug 2026 <br />Notes: 

## Missing do/don't previews

None identified. All three do/don't pairs are implemented.

> Status:No action required <br />Name:Julia ML <br />Date: 13 Aug 2026 <br />Notes: AI forgot to mention `MenuKindExample` and `MenuDividerExample`

## Missing props documentation

The following props are present in the Grommet CheckBox source or referenced in the original MDX but are absent from `knowledge/core/data/components/checkbox.yaml`:

- `a11yTitle` — string; custom accessibility title (alternative to `label` for screen readers; referenced in Grommet docs)
- `checked` — present in YAML but `defaultChecked` (uncontrolled form) is not documented
- `fill` — boolean; whether the CheckBox fills its container (used in some FormField layouts in the codebase)
- `messages` — object `{ on?, off? }`; accessible screen reader messages for toggle state (Grommet v2 API)

> Status:Open <br />Name: <br />Date:  <br />Notes: 

## Missing behaviors or states

- **Unchecked state** — the original MDX explicitly listed Unchecked, Checked, and Indeterminate as the three states. The new MDX covers checked and indeterminate but does not explicitly document the rest/unchecked state as a behavior item.
> Status:Open <br />Name: <br />Date:  <br />Notes:
- **Checked state** — only covered implicitly through examples; no explicit prose description for the checked application state.
> Status:Open <br />Name: <br />Date:  <br />Notes:

## Missing visual assets

- Anatomy diagram image — `{/* TODO: Add anatomy diagram image */}` placeholder remains in the MDX. A diagram showing the checkbox control, checkmark indicator, and label regions is needed. The toggle state may warrant a second diagram or an annotated variant.
> Status:Completed <br />Name:Sulaymon <br />Date:  <br />Notes:

## Other gaps

- The original MDX noted that `CheckBoxSolelyExample` demonstrates usage **outside** of a FormField. The new MDX uses it as the "Opting in to an agreement" use case example but does not explicitly call out the difference in context (with vs. without FormField wrapper). Consider adding a note or a second panel to the example.
> Status:Open <br />Name:Sulaymon <br />Date:  <br />Notes:

- The indeterminate state example (`CheckBoxSelectingItemsListExample`) introduces the `indeterminate` prop but this prop is not documented in the YAML `props` array.
> Status:Open <br />Name:Sulaymon <br />Date:  <br />Notes:

## Inferred fields — verify before merging

The following fields were inferred from general component knowledge rather than extracted directly from the source MDX. Please verify each against the Figma file and grommet source before this PR is merged.

### `anatomy`

The source MDX contained no anatomy section. The anatomy was inferred based on the known structural parts of CheckBox (control, checkmark indicator, label). Verify:
- Label correctness: does the Figma spec define these regions with different names or boundaries?
- Whether the toggle state introduces any additional anatomy parts not listed (e.g., a thumb/track distinction).

> Status:No action needed <br />Name:Julia ML <br />Date:13 Aug 2026  <br />Notes:

### `dosAndDonts`

The source MDX had no explicit do/don't section with the standard paired format. The do/don't pairs were inferred from the accessibility guidance and usage notes in the MDX. Verify:
- That the `FormField label duplication` rule aligns with the current HPE Design System pattern.
- That the `toggle vs checkbox` distinction is still accurate for the current design spec.

> Status:Open <br />Name:Julia ML <br />Date:13 Aug 2026  <br />Notes:
