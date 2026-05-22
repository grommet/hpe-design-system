# DEPRECATED — Select

Reviewed on: 2026-05-22
Reviewed by: extract-yaml-agent + create-todos-agent (automated)

## Content mapping table

| Original section | Original content (excerpt) | Status | New location |
|---|---|---|---|
| `## Guidance` (intro prose) | "Select is a flexible input element able to serve a wide variety of use cases…" | Restructured | Replaced by `description` in YAML / `components.tsx` and expanded into `## Use cases` prose |
| `## Guidance > When to use Select` (bulleted qualifying questions) | "Is there a need to conserve screen space? Select may be appropriate…" | Restructured | Rewritten as task-oriented `whenToUse` items in YAML; surfaced as `## Use cases` section headings in MDX |
| `## Guidance > Selecting multiple options` | "If multiple selections are permitted and there are more than 5 options, use SelectMultiple…" | Restructured | Captured as a `whenToAvoid` item in YAML; cross-component link preserved in `relatedComponents` |
| `## Variants > Select with search` | description + `<SelectSearchExample />` | Retained | Now in `## Variants > With search` and also in `## Use cases > Filtering a long list of options` |
| `## Variants > Validation` | description + `<SelectValidationExample />` | Restructured | Moved to `## Behaviors and States > Application states` per template rules |
| `## Variants > Disabled` | description + `<SelectDisabledExample />` | Restructured | Moved to `## Behaviors and States > Application states` per template rules |
| `## Accessibility` (intro prose) | "Using Select as a form field is preferred for user experience…" | Retained | Preserved verbatim in `## Accessibility` section of new MDX |
| `## Accessibility` (FormField code snippet) | `<FormField label="Select option" htmlFor="select__input">…` | Retained | Preserved as a fenced code block in `## Accessibility` section |
| `## Accessibility > WCAG compliance` | `<AccessibilitySection title="select" />` | Retained | `<AccessibilitySection title="select" />` at end of `## Accessibility` section |

## Notes

- The "Variants" section in the original MDX grouped Select with search, Validation, and Disabled together as named configurations. Per the refactor template, only stable structural variants belong in `## Variants` — Validation and Disabled are application states, not variants, and have been moved accordingly.
- The original `## Guidance` section's qualifying-question format has been replaced by the task-oriented Use Cases section. The original questions had value for decision-making guidance; if desired, they could be added back as a callout block in the generated MDX (e.g., "Choosing the right input" guidance box). Flag this with the team.
- No content appears to have been accidentally lost. All substantive guidance is accounted for in the new MDX or the YAML.

---

## 1. Qualifying-question format in "When to use Select"

**Original content:**
The MDX presents use-case guidance as a series of qualifying questions with "Select may be appropriate" or alternative-component suggestions (e.g., "Are there less than five options? Consider a CheckBoxGroup or RadioButtonGroup…").

**Why it didn't map directly:**
The `usage.whenToUse` schema expects task-oriented user-goal statements, not conditional decision-tree questions.

**Disposition:**
The guidance was rewritten as task-oriented `whenToUse` and `whenToAvoid` items in the YAML. The original decision-tree framing has value as onboarding content for designers evaluating component alternatives.

**Potential home:** Could be preserved as a callout or guidance block in the generated MDX (e.g., a "Choosing the right input" section) rather than the YAML schema.

---

## 2. "Selecting multiple options" subsection

**Original content:**
> "If multiple selections are permitted and there are more than 5 options, use SelectMultiple. Otherwise, consider using CheckBoxGroup."

**Why it didn't map:**
This is cross-component guidance, not a property of Select itself. It does not fit `usage.whenToUse` (which is about Select's own appropriate use) and is too brief for a standalone section.

**Disposition:**
Captured as a `whenToAvoid` item. Cross-component link to SelectMultiple is preserved in `relatedComponents`.

**Potential home:** Mentioning in the MDX's "Guidance" prose, or in a "Related components" table.

---

## 3. Inline code snippet for `FormField` + `Select` association

**Original content:**
```jsx
<FormField label="Select option" htmlFor="select__input">
  <Select id="select" options={['Option 1', 'Option 2']} />
</FormField>
```

**Why it didn't map:**
Inline code snippets in the Accessibility section are not representable in the `ComponentDefinition` schema (which uses `path:` references to example files, not inline code in accessibility fields).

**Disposition:**
The pattern is captured in `accessibility.aria` as a condition description. The full code snippet should be included in the generated MDX's Accessibility section as a prose code block.

**Potential home:** Accessibility section of the generated `select.mdx`, inside a `<pre>` or code block.

---

## 4. Links to external resources

**Original content:**
The MDX `<Example>` blocks include `designer`, `docs`, `figma`, and `grommetSource` props pointing to external URLs (Grommet docs, Figma file, GitHub source).

**Why it didn't map:**
These are page-level metadata for the documentation site, not part of the `ComponentDefinition` schema.

**Disposition:**
These links will be preserved in the generated MDX `<Example>` components by `generate-mdx-agent` using the same URLs from the `.mdx.bak`.

**Potential home:** No action required — handled by `generate-mdx-agent`.
