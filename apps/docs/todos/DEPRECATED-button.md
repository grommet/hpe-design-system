# DEPRECATED — Button

Review completed. The following content from `button.mdx` could not be directly mapped to any field
in the `ComponentDefinition` schema. Each entry notes the original section, the reason it didn't
map, and a recommendation for where it could live.

---

## 1. External resource URLs on the hero Example component

**Source excerpt:**
```jsx
<Example
  componentName="Button"
  code="https://raw.githubusercontent.com/..."
  designer="https://designer.grommet.io/button?..."
  docs="https://v2.grommet.io/button?theme=hpe#props"
  figma="https://www.figma.com/design/..."
  grommetSource="https://github.com/grommet/grommet/..."
>
```

**Why it didn't map:** The `ComponentDefinition` schema has no field for external resource links
(designer tool, Figma file, upstream grommet docs, grommet source). These are rendering-layer props
of the MDX `<Example>` layout component, not structured data.

**Potential value:** High — these links are important for contributors and developers. Recommend
adding a `resources` or `links` field to the schema, or preserving these in the MDX frontmatter
when `generate-mdx-agent` reconstructs the page.

---

## 2. Toggle buttons guidance section

**Source section:** `### Toggle buttons` and `#### Toggle buttons with icons`

**Why it didn't map:** Toggle button behavior (switching between two states such as checked/unchecked)
is a usage pattern rather than a distinct variant. The icon toggle a11y guidance was partially
captured in `contentGuidelines`, but the conceptual framing ("switching between two states" vs.
"triggering two actions like on or off") and the ordered list of implementation steps did not fit
any schema field cleanly.

**Potential value:** Medium — consider adding a `patterns` or `usagePatterns` field to
`ComponentDefinition` for behavioral recipes like toggle. Alternatively, this content could live in
a dedicated Toggle Button pattern page.

---

## 3. Primary buttons prose section (separate from Variants)

**Source section:** `## Primary buttons` (distinct from `## Variants → ### Primary button`)

**Why it didn't map:** The MDX has two separate sections discussing primary buttons: a high-level
"Primary buttons" section with rationale about user goals and business value, and a "Variants →
Primary button" section with technical guidance. The schema's `variants` field captures the
technical description; the broader rationale prose ("unlocking new value," "enabling a new
experience") was condensed into `usage.whenToUse` but the full text was not preserved.

**Potential value:** Low-medium — the extra prose is marketing-flavored rationale that overlaps with
`usage.whenToUse`. Recommend collapsing it fully into `usage.whenToUse` and `variants[primary].when`
during MDX reconstruction.

---

## 4. ButtonAlignmentTable interactive content

**Source section:** `### Button alignment` — `<ButtonAlignmentTable />`

**Why it didn't map:** `ButtonAlignmentTable` is an interactive React component that renders a
reference table mapping button alignment rules to layout contexts (drawers, modals, inline forms,
etc.). The tabular content is not in the MDX source itself — it lives inside the component file. The
YAML references it as an `examples` path entry, but the actual alignment rules are not captured as
structured data.

**Potential value:** High — the alignment rules are substantive design guidance. Recommend either
extracting the table content into a dedicated `alignment` field in the schema, or ensuring the
component file is reviewed when the MDX is regenerated.

---

## 5. ActionLabels example cross-component reference

**Source import:**
```js
import { ActionLabels } from '../../examples';
```
**Actual file location:** `apps/docs/src/examples/components/layer/ActionLabels.js`

**Why it didn't map:** The `ActionLabels` example is a Layer/Dialog component example being reused
in the Button docs to illustrate action label conventions (verb + noun format). It does not live in
`apps/docs/src/examples/components/button/` and therefore violates the schema convention that
`examples[].path` must start with `apps/docs/src/examples/components/`. It was omitted from the
YAML `examples` array.

**Potential value:** High — the example effectively illustrates the labeling best practice. Recommend
either duplicating or moving a version of `ActionLabels` into the button examples directory, or
creating a dedicated `ActionLabelsButtonExample.js` that does not carry Layer-specific imports.

---

## 6. Buttons vs. Anchors — nuanced HTML semantics guidance

**Source section:** `### Buttons vs. anchors` and `### A11y guidance` (accessibility section)

**Why it didn't map:** The detailed explanation of when `<button>` vs. `<a>` should be used
(including the screen-reader rationale "will I navigate somewhere or will something happen on the
page?") is captured in `usage.whenToAvoid` and `accessibility.keyboard`, but the full nuance and
the reference to the Anchor WCAG rules page (`/components/anchor#wcag-compliance`) was not preserved.

**Potential value:** Medium — the cross-reference to Anchor accessibility is useful. Recommend
preserving it in the MDX when `generate-mdx-agent` reconstructs the page by including a prose note
in the accessibility section.

---

## 7. Responsiveness — Button ordering guidance

**Source section:** `### Button ordering`

**Why it didn't map:** The rule "order by importance: Primary first, followed by Secondary, then
Default" combined with the alignment dependency (left vs. right alignment affects order) is spatial
layout guidance that doesn't fit `behaviors`, `dosAndDonts`, or `contentGuidelines` cleanly. The
left/right alignment examples (`ButtonLeftAlignExample`, `ButtonRightAlignExample`) are referenced
in `examples`, but the ordering rule itself was not captured.

**Potential value:** Medium — this is actionable design guidance. Recommend capturing it in a
`layout` or `ordering` sub-field, or folding it into a `dosAndDonts` entry during MDX
reconstruction.
