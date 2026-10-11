# TODO — TextInput

Content gaps in `apps/docs/src/pages/components/textinput.mdx` that require human attention.

---

## Checklist

- [ ] **1. Anatomy diagram image**
  Add an actual anatomy diagram to replace the placeholder comment on line ~112:
  ```
  {/* TODO: Add anatomy diagram image */}
  ```
  The anatomy table already exists and is complete; only the visual diagram is missing.
  See `apps/docs/src/pages/components/menu.mdx` (`<MenuAnatomy />`) for the expected pattern.
  **File:** `apps/docs/src/pages/components/textinput.mdx`

- [ ] **2. Dedicated `TextInputReadOnlyCopyExample` example**
  Both the `### Read-only` and `### Read-only with copy` Variants sections, as well as the
  "Copying a read-only value to the clipboard" Use cases section, currently point to the same
  example file (`TextInputReadOnlyExample.js`) and render the same component (`<TextInputReadOnlyExample />`).
  A dedicated `TextInputReadOnlyCopyExample.js` is needed to demonstrate the `readOnlyCopy` prop
  and copy-to-clipboard interaction specifically.
  - Create: `apps/docs/src/examples/components/textinput/TextInputReadOnlyCopyExample.js`
  - Update: import and `<Example code=...>` blocks in the Use cases and Variants sections of
    `apps/docs/src/pages/components/textinput.mdx`

- [ ] **3. `onSelect` callback not demonstrated**
  The YAML (`knowledge/core/data/components/textinput.yaml`) documents an `onSelect` prop
  (fires when the user selects a suggestion from the drop), but no coded example exercises it.
  The existing `TextInputSuggestionsExample.js` should be updated, or a new example added,
  to show `onSelect` in action (e.g. display the selected value or trigger a side-effect).
  **File:** `apps/docs/src/examples/components/textinput/TextInputSuggestionsExample.js`

- [ ] **4. `icon` prop left-side placement not shown**
  The YAML documents the `icon` prop with a note that `reverse` positions it on the right
  (right-side is the only placement demonstrated in the "Labeled by icon" variant).
  No example shows the icon in its default left-side position.
  Consider adding a left-side icon use case or a note in the Variants section clarifying
  when to use each placement.
  **File:** `apps/docs/src/pages/components/textinput.mdx`

- [ ] **5. Content guidelines section absent**
  `apps/docs/src/pages/components/menu.mdx` has a `## Content guidelines` section with
  guidance on writing effective labels, descriptions, and naming conventions.
  The textinput MDX has no equivalent. Consider adding guidance on:
  - Writing good `FormField` label text (clear, concise, action-oriented)
  - Best practices for `placeholder` text wording (supplemental, not instructional)
  - Appropriate label text when using `aria-labelledby` with an icon
  **File:** `apps/docs/src/pages/components/textinput.mdx`

- [ ] **6. Additional `type` values not demonstrated**
  The YAML documents the `type` prop as accepting `"email"`, `"text"`, `"search"`, `"tel"`,
  and `"url"` in addition to `"password"`, but only `type="password"` has a dedicated example.
  At minimum, add a note or callout in the relevant Use cases or Variants section directing
  users to apply the correct `type` for built-in browser validation and mobile keyboard
  optimization (e.g. `type="email"` for email fields, `type="tel"` for phone fields).
  **File:** `apps/docs/src/pages/components/textinput.mdx`
