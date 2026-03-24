# DEPRECATED — CheckBox component refactor

Review date: 2026-03-19
Reviewer: Julia Mayer-Lauren
Branch: project-sanderson-refactor-checkbox-julia

This file records every section or piece of content from the original `checkbox.mdx` that was removed, restructured, or relocated during the refactor.

---

## Removed sections and their fate

| Original section | Disposition | Where content landed |
| --- | --- | --- |
| `## Guidance` | Dropped — catch-all wrapper heading with no template equivalent | Sub-content redistributed; see rows below |
| `### Usage` (intro paragraph) | Restructured | "When presented in a group..." → implicit in `description` + `relatedComponents`; three states list (unchecked/checked/indeterminate) → `behaviors.applicationStates` in YAML and Application States section in MDX |
| `### Usage` — RadioButtonGroup reference | Relocated | Moved to `usage.whenToAvoid` in YAML; surfaces as prose in Use cases intro note |
| `### CheckBox outside of FormField` | Relocated | Moved to `## Behaviors and States > General Behaviors > Using CheckBox outside of FormField` |
| `### Toggle` (under `## Guidance`) | Restructured | Toggle guidance prose split: behavioral description → `## Variants > Toggle`; `reverse` prop note preserved there |
| `## Variants` intro paragraph | Dropped | Generic framing ("CheckBox can be used individually, within a group, or as a toggle") — not instructional; key content absorbed into individual variant descriptions |
| `### Disabled` (under `## Variants`) | Relocated | Disabled is an application state, not a variant. Moved to `## Behaviors and States > Application States > Disabled` |

---

## Prose removed without a direct landing spot

### From `## Guidance > ### Usage`

> CheckBox can be used to present an individual option or group of options to the user. When presented in a group, the user can select a single or multiple options. Refer to CheckBoxGroup for examples.

**Reason dropped:** Generic framing of the component's purpose, largely covered by the description field in `components.js` and the YAML description. The CheckBoxGroup reference is preserved in `relatedComponents`.

### From `## Variants` intro

> CheckBox can be used individually, within a group, or as a toggle. A standalone or toggle checkbox indicates that a user is opting-in to the context of the checkbox. Within a group, one or multiple checkboxes can be selected.

**Reason dropped:** Introductory framing, not actionable guidance. The individual variant descriptions convey the same information more precisely.

---

## Structure changes summary

- **`## Guidance`** — Legacy catch-all heading dropped entirely. All three sub-sections redistributed to template sections.
- **`### Disabled` under Variants** — Disabled is an application state (set programmatically), not a variant (an explicit developer prop choice for a UI form). Moved to Application States.
- **Toggle guidance duplication** — The same toggle guidance appeared under both `## Guidance > ### Toggle` and `## Variants > ### Toggle`. Consolidated into `## Variants > Toggle` with full guidance retained.
