# DEPRECATED — Button component

Legacy content from `button.mdx` that was removed during the refactor because it does not fit the new rigid template structure, duplicates content already present, or violates the writing guidelines in `.github/instructions/writing-documentation.instruction.md`.

Review before closing the PR to confirm no valuable information was lost.

---

## 1. `## Primary buttons` standalone section

**Original location:** Top-level `## Primary buttons` in `button.mdx.bak`

**Reason removed:** Marketing/promotional prose that duplicates guidance already covered in `## Variants > Primary button`. Does not match the imperative, list-first writing style.

**Original content:**

> Primary buttons highlight actions on a page delivering the most benefit to users. They are helpful in enabling users' goals, unlocking new value by enabling a new experience, capability, or creation of something which hadn't previously existed.
>
> Primary buttons have increased visual weight through placement and contrast, drawing users' attention by distinguishing the button from surrounding content.
>
> ### When to use a primary action button
>
> Primary action buttons are used within enterprise applications. They are meant to assist and are designed to maximize a user's experience by highlighting the most common or important action on a page and allowing the user to accomplish a goal or task.
>
> Actions supported by primary action buttons are numerous and may be constructive or destructive in nature. Example actions include: create, schedule, deploy, add, save, and depending on context could even be cancel or delete.

**Resolution:** Core guidance was condensed into the `### Primary button` Variants subsection. If the distinction between constructive and destructive primary actions needs elaboration, add a single-sentence note under the primary variant — do not restore the full section.

---

## 2. `## Responsiveness` standalone section

**Original location:** Top-level `## Responsiveness` in `button.mdx.bak`

**Reason removed:** The new template does not include a standalone Responsiveness section. The relevant rules were moved to `## Content guidelines > Responsiveness`.

**Original section heading hierarchy:**
- `## Responsiveness`
  - `### Best practices`
  - `### Single buttons`
  - `### Button groups`

**Resolution:** All three sets of rules are preserved under `## Content guidelines > Responsiveness` in the new MDX. No content was lost.

---

## 3. `## Guidance` top-level section wrapper

**Original location:** Top-level `## Guidance` in `button.mdx.bak`, containing: About Button, Button labeling, Button alignment, Button ordering, Buttons vs. anchors, Cancel buttons, Toggle buttons.

**Reason removed:** "Guidance" is not a section name in the new template. All sub-content was redistributed:

| Original subsection | New location |
| --- | --- |
| About Button | `## Use cases` |
| Button labeling | `## Content guidelines > Button labels` |
| Add / New / Create table | `## Content guidelines > Add, New, and Create` |
| Button alignment | `## Content guidelines > Button alignment` |
| Button ordering | `## Content guidelines > Button ordering` |
| Buttons vs. anchors | `## Content guidelines > Buttons vs. anchors` |
| Cancel buttons | `## Content guidelines > Cancel buttons` |
| Toggle buttons | `## Content guidelines > Toggle button labels` + `## Variants > toggle` in YAML |

---

## 4. `### A11y guidance` framing paragraph

**Original location:** `## Accessibility > ### A11y guidance` in `button.mdx.bak`

**Reason removed:** The intro framing ("The following guidance should be considered for each instance of the component and is the responsibility of the implementer. WCAG criteria provided directly by the Grommet component are summarized under WCAG compliance.") is boilerplate that will be identical across all component pages and adds no component-specific value.

**Resolution:** The substantive content (when to use `<a>` vs. `<button>`, screen reader distinction) was preserved directly under `## Accessibility` in the new MDX without the framing wrapper.
