# DEPRECATED — TextInput

Content from `apps/docs/src/pages/components/textinput.mdx.bak` that was intentionally NOT
carried over to the new `textinput.mdx` because it is considered deprecated, replaced, or
superseded by a richer structured alternative.

---

## Deprecated items

### 1. `## Guidance` section

**Original content (removed entirely):**
> The TextInput component allows the user to input shorter forms of data and content. Passwords and tags can also be used with the TextInput component. Style can be variable, based upon the use case and customer need that will elicit user confidence in success.

**Reason removed:** Generic one-paragraph summary with no actionable guidance. The reference to
"tags" is no longer surfaced anywhere in the docs (tag entry is not a first-class promoted
pattern). The phrase "style can be variable, based upon the use case and customer need that will
elicit user confidence in success" added no actionable information. Replaced by the detailed,
use-case-driven structure of the new `## Use cases` section.

---

### 2. `## About TextInput` section

**Original content (removed entirely):**
> Text input fields perform text validation. Some use cases for TextInput include username fields, password fields, and search fields. In some cases, it may be beneficial to use an icon to reinforce the context. One example when an icon would be useful would be a search input.
>
> There are many ways to give the user hints about how to properly fill out a text input. In addition to the label, placeholder text can help guide the user. When you want to place syntax restrictions on the input, such as an email address or phone number, consider using [MaskedInput](/components/maskedinput).
>
> A TextInput display the following states: enabled, focused, focused with value, validation, and disabled.

**Reason removed:** Free-form introductory narrative. Its substance was redistributed:
- Per-use-case descriptions now appear under `## Use cases`.
- The MaskedInput callout was converted to a Dos and don'ts example.
- States are now enumerated precisely in the `## Behaviors and states` section.

---

### 3. Variants section intro paragraph

**Original content (removed entirely):**
> A TextInput's visual state informs the user of its ability to be interacted with or if any validation errors have occured.

**Reason removed:** Surface-level transition sentence with a typo ("occured"). Each variant in
the new MDX is now self-described with a dedicated `when` statement, making this opener redundant.

---

### 4. `## Accessibility` freeform prose paragraphs

**Original content (removed entirely):**
> In every case possible, TextInput should be used inside of a FormField to ensure that a label is appropriately paired with the input. This behavior is important to screen reader users who need to know to which context the TextInput is referring.
>
> If you need to use TextInput outside of the context of a FormField, it is important to make sure the TextInput is labeled in an alternate way to meet accessibility requirements. One approach is to use another visual indicator, such as the TextInput's icon, to serve as the label. See how this is done in the [Labeled by icon](#labeled-by-icon) example.
>
> Placeholder text does not serve as a sufficient means of meeting accessibility requirements for labels. To meet accessbility requirements, placeholder text should be used in conjunction with a label or aria-labelledby attribute.
>
> While Grommet's TextInput supports a `defaultSuggestion` prop, it is not recommended for use because it can lead to potential "context changes" on screen readers such as VoiceOver. This would fail [WCAG 3.2.1](https://www.w3.org/TR/WCAG22/#on-focus).
>
> Instead, order the suggestions such that the most relevant or likely are at the top.

**Reason removed:** Informal narrative prose replaced by the structured `## Accessibility`
section, which includes:
- A keyboard navigation table (`### Keyboard navigation`)
- An ARIA attributes table (`### ARIA`)
- A screen reader announcements table (`### Screen reader announcements`)
- A dedicated `### Notes` subsection for the `defaultSuggestion` warning
- A Dos and don'ts example pair for the `defaultSuggestion` anti-pattern

All substantive guidance was preserved; only the unstructured prose format was deprecated.

---

### 5. Combined `### Readonly` variant (single section for both readOnly and readOnlyCopy)

**Original content (removed):**
> ### Readonly
>
> Used to indicate that a TextInput cannot be edited. When an input is readonly, it will still receive tab focus and be submitted with form data.
>
> Apply `readOnlyCopy` to TextInput to display a copy button in the input.

**Reason removed:** `readOnly` and `readOnlyCopy` were collapsed into one "Readonly" section with
a single example. In the new MDX these are split into separate `### Read-only` and
`### Read-only with copy` variants, each with a distinct description and dedicated use case
entry. The combined format is deprecated in favor of the split structure that more clearly
distinguishes the two behaviors.
