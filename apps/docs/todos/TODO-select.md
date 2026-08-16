# TODO: Select

## Missing coded examples

None identified. All use case placeholders have been replaced with live `<Example>` blocks.

- `SelectExample.js` — Choosing a single value from a predefined list
- `SelectSearchExample.js` — Filtering a long list of options

## Missing do/don't previews

None identified. All `<BestPracticeGroup>` placeholder children have been replaced.

## Missing props documentation

The following props are referenced in the Grommet Select API but are absent from `knowledge/core/data/components/select.yaml`. Verify against https://v2.grommet.io/select?theme=hpe#props before merging:

- `children` — custom option render function: `(option, index, options, { active, disabled, selected }) => ReactNode`
- `clear` — whether to include a "clear" option at the top of the list
- `closeOnChange` — whether to close the dropdown after a selection (default: true)
- `disabledKey` — key on option objects to determine per-option disabled state
- `dropHeight` — max height of the dropdown: `'small' | 'medium' | 'large' | 'xlarge'`
- `dropProps` — additional props passed to the Drop container
- `dropTarget` — ref to use as the drop anchor instead of the trigger button
- `emptySearchMessage` — message shown when search returns no results
- `icon` — custom icon to replace the default chevron
- `labelKey` — key on option objects to use as the visible label (already listed — confirm type)
- `messages` — object to override screen reader messages (e.g., `{ multiple: 'multiple' }`)
- `multiple` — **deprecated** in favor of `SelectMultiple`; note in props with deprecation notice
- `open` — controlled open/closed state
- `replace` — whether to replace the selected value in the option list
- `selected` — array of selected indexes (for internal use; prefer `value`)
- `size` — `'small' | 'medium' | 'large' | 'xlarge'`

## Missing behaviors or states

The original `.mdx.bak` included a **Validation** variant (with `SelectValidationExample`) that is now documented under **Application States** in the Behaviors and States section. Confirm the placement is intentional and remove the variant from the original Variants section if it was included there.

The original `.mdx.bak` had three variants — **Select with search**, **Validation**, and **Disabled** — under `## Variants`. The new MDX has only two variants (Default, With search). Validation and Disabled are now under Behaviors and States. This restructuring is intentional per the template; verify with the team that no information was lost.

## Missing visual assets

- **Anatomy diagram image** — no image exists yet for Select. A `{/* TODO: Add anatomy diagram image */}` placeholder remains in `select.mdx` (line 79). Create a Figma-sourced anatomy diagram and reference it in an `<Example caption="..." plain>` block above the anatomy table (see `menu.mdx` for the pattern).

## Other gaps

- **`code` prop missing** on the two Variant `<Example>` blocks — add raw GitHub URLs once files are committed to the main branch.
- **Inferred anatomy** — verify anatomy parts against Figma file (link in `select.mdx` playground block) before merging.
- **Inferred dosAndDonts** — verify do/don't pairs against HPE UX standards before merging.

---

## Inferred fields — verify before merging

The following fields were **inferred** from knowledge of the component rather than extracted from the source MDX. Review each against the Figma file and grommet source before the PR is merged.

### `anatomy`

The anatomy section was not present in the original `select.mdx`. The following structural parts were inferred:

- **Control / Trigger button** (`region: 1`) — the clickable container that displays selected value or placeholder and opens the dropdown
- **Selected value or placeholder** (`region: 1a`) — the text area inside the trigger
- **Chevron indicator** (`region: 1b`) — the expand/collapse icon
- **Drop container** (`region: 2`) — the floating panel holding the option list
- **Option item** (`region: 3`) — each selectable row in the list
- **Search input** (`region: 4`, optional) — present only in the `with-search` variant

**Action:** Verify anatomy parts and labels against the Figma component (link in `select.mdx`) before merging.

### `dosAndDonts`

No explicit do/don't blocks were present in the original MDX. Four pairs were inferred from the guidance prose in the "When to use Select" section:

1. Use FormField + label vs. bare Select without label
2. Use RadioButtonGroup/CheckBoxGroup for < 5 options vs. overusing Select for short lists
3. Use Select with Search for long lists vs. unfiltered long dropdowns
4. Provide a meaningful placeholder vs. no placeholder or label

**Action:** Verify these pairs against HPE UX standards and the Figma file. Add or remove pairs as needed.

### `usage.whenToUse`

The original MDX presents use-case guidance as qualifying questions ("Is there a need to conserve screen space?") rather than task-oriented statements. The four `whenToUse` items in the YAML were rewritten as user-task descriptions.

**Action:** Confirm task framing aligns with the team's voice and the component's intended use cases.

### `props`

Props were inferred from the example files (`SelectExample.js`, `SelectSearchExample.js`, `SelectValidationExample.js`, `SelectDisabledExample.js`) and knowledge of Grommet's Select API. The original MDX links to the Grommet docs but does not enumerate props inline.

**Action:** Cross-reference props against https://v2.grommet.io/select?theme=hpe#props and add any missing props before merging.
