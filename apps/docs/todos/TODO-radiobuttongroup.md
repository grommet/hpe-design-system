# TODO: RadioButtonGroup

This file catalogues gaps identified during the RadioButtonGroup documentation refactor.
Review each item and either resolve it directly or translate it into a tracked GitHub Issue.

---

## Missing coded examples

The following example slots exist in `radiobuttongroup.mdx` but have no corresponding example file yet. Each is marked with a `{/* TODO: ... */}` placeholder in the MDX.

- **Use case — Collecting a single preference**
  A dedicated example showing a settings-type form (e.g., notification frequency, theme selection) where a RadioButtonGroup collects a single preference.
  _Suggested file:_ `apps/docs/src/examples/components/radiobuttongroup/RadioButtonGroupPreferenceExample.js`

- **Use case — Choosing between two to five mutually exclusive values**
  A concise 2–3 option RadioButtonGroup demonstrating a binary or tri-state selection scenario.
  _Suggested file:_ `apps/docs/src/examples/components/radiobuttongroup/RadioButtonGroupBinaryExample.js`

- **Do — Vertical layout (Dos and Don'ts)**
  A static preview showing a RadioButtonGroup rendered with the default vertical column layout.
  _Suggested file:_ `apps/docs/src/examples/components/radiobuttongroup/RadioButtonGroupDoVerticalPreview.js`

- **Don't — Horizontal layout (Dos and Don'ts)**
  A static preview showing a RadioButtonGroup rendered with `direction="row"` as a discouraged pattern.
  _Suggested file:_ `apps/docs/src/examples/components/radiobuttongroup/RadioButtonGroupDontHorizontalPreview.js`

- **Do — Descriptive label (Dos and Don'ts)**
  A static preview of a RadioButtonGroup with a clear, descriptive FormField label.
  _Suggested file:_ `apps/docs/src/examples/components/radiobuttongroup/RadioButtonGroupDoLabelPreview.js`

- **Don't — Vague or absent label (Dos and Don'ts)**
  A static preview showing a RadioButtonGroup with a missing or vague label.
  _Suggested file:_ `apps/docs/src/examples/components/radiobuttongroup/RadioButtonGroupDontLabelPreview.js`

- **Do — Appropriate option count (Dos and Don'ts)**
  A static preview of a RadioButtonGroup with 3–4 options.
  _Suggested file:_ `apps/docs/src/examples/components/radiobuttongroup/RadioButtonGroupDoOptionCountPreview.js`

- **Don't — Too many options (Dos and Don'ts)**
  A static preview showing a RadioButtonGroup overloaded with 6+ options.
  _Suggested file:_ `apps/docs/src/examples/components/radiobuttongroup/RadioButtonGroupDontOptionCountPreview.js`

---

## Missing anatomy diagram

An anatomy diagram image for RadioButtonGroup has not been created yet.
The MDX includes a `{/* TODO: Insert anatomy diagram image here */}` placeholder.
_Action:_ Create or request a design asset and add it to `apps/docs/public/componentImages/`.

---

## Props not documented

The following props are available in Grommet's RadioButtonGroup but were not present in the original MDX and have limited or no YAML coverage. Evaluate whether each should be documented:

- `children` — Custom render function `(option, { checked, hover }) => React.ReactNode` for fully custom radio button rendering.
- `labelKey` / `valueKey` — Used when `options` is an array of objects to specify which keys are used for the label and value.

_Reference:_ https://v2.grommet.io/radiobuttongroup?theme=hpe#props

---

## Interactive states example

The `## Behaviors and States > ### Interactive States` section was intentionally omitted from the MDX because no dedicated example file exists that demonstrates rest, hover, focus, and active states in isolation. Consider creating one similar to `ButtonStatesExample.js` for consistency.
_Suggested file:_ `apps/docs/src/examples/components/radiobuttongroup/RadioButtonGroupStatesExample.js`
