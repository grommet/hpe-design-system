# DEPRECATED: CheckBox

Review completed during extract-yaml-agent run (Stage 0 → 1) and updated by create-todos-agent (Stage 3 → 4).

## Content mapping table

| Original section | Original content (excerpt) | Status | New location (if restructured) |
|---|---|---|---|
| `## Guidance` (intro prose) | "CheckBox can be used to present an individual option or group of options…" | Restructured | `usage.whenToUse` in YAML; expanded as use case descriptions in `## Use Cases` |
| `### Usage` — state list | "Unchecked / Checked / Indeterminate" bulleted state descriptions | Restructured | `behaviors.applicationStates` in YAML; `## Behaviors and States → Application States` in MDX |
| `### Usage` — RadioButtonGroup counter-indication | "CheckBox should not be used if a user should only be allowed to select one option…" | Restructured | `usage.whenToAvoid` in YAML; `## Dos and Don'ts` pair (partially covered) |
| `### CheckBox outside of FormField` — 4-item numbered list | Standalone use cases for opt-in, UI control, table selection | Restructured | Merged into `## Use Cases` subheadings (Showing or hiding content, Opting in, Selecting items) |
| `### Toggle` — 3 bullet points | Toggle usage guidance, reverse prop note | Restructured | `## Variants → Toggle` description in new MDX |
| Variants intro paragraph | "CheckBox can be used individually, within a group, or as a toggle…" | Dropped | Introductory framing not needed in the new template; covered by use cases |
| `### Validation` (Variants subsection) | Validation variant with example | Restructured | Moved to `## Behaviors and States → Application States` (validation error state) |
| `### Disabled` (Variants subsection) | Disabled variant with example | Restructured | Moved to `## Behaviors and States → Application States` (disabled state) |
| Playground `<Example>` metadata links (see previous entries) | `docs`, `figma`, `designer`, `grommetSource` URL props | Preserved | Carried forward verbatim into the new MDX playground `<Example>` block |

## Notes

- The original MDX had no `## Dos and Don'ts` section and no anatomy section. Both were inferred and generated from scratch.
- The `## Guidance` section has been fully decomposed: its use-case content became `## Use Cases`, its counter-indications became `## Dos and Don'ts`, and its state descriptions became `## Behaviors and States`.
- No content appears to have been accidentally dropped. All substantive guidance from the original has been mapped to a section in the new MDX or to the YAML.

### 1. Example component metadata links

**Original content:**
```
docs="https://v2.grommet.io/checkbox?theme=hpe#props"
code="https://raw.githubusercontent.com/grommet/hpe-design-system/master/apps/docs/src/examples/components/checkbox/CheckBoxSimpleExample.js"
figma="https://www.figma.com/design/HDckqS2MWhINfC8EIQPMV1/..."
designer="https://designer.grommet.io/checkbox?id=..."
grommetSource="https://github.com/grommet/grommet/blob/master/src/js/components/CheckBox/CheckBox.js"
```

**Why it didn't map:** The `ComponentDefinition` schema has no fields for external resource URLs (Figma link, grommet designer link, grommet source link, external docs link). These are display-layer metadata used by the `<Example>` MDX component.

**Recommendation:** These URLs should be preserved in the generated MDX template's `<Example>` props or in a separate `links` field if the schema is extended. Review whether the template handles them automatically from a known convention.

### 2. Per-variant Example `code` URL and `height` props

**Original content:**
```
<Example
  docs="..."
  code="https://raw.githubusercontent.com/...CheckBoxToggleExample.js"
  height={{ min: 'xsmall' }}
>
```

**Why it didn't map:** The `examples` array in `ComponentDefinition` maps to a `path:` reference only; it doesn't carry variant-level `height` or `docs` URL overrides.

**Recommendation:** The `generate-mdx-agent` should reinstate these props when constructing `<Example>` blocks in the generated MDX. Confirm the template handles `height` for the toggle, validation, and disabled variants.
