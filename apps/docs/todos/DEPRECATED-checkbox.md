# DEPRECATED: CheckBox

Content review against `checkbox.mdx.bak` on April 16, 2026.

## Removed sections

| Original section | Reason removed | Where content landed |
|---|---|---|
| `## Guidance` | Section heading not part of the new template structure | Content redistributed — see below |
| `### Usage` (under Guidance) | Free-form guidance prose replaced by structured Use Cases and Dos and Don'ts | `whenToAvoid` in YAML; Dos and Don'ts section in new MDX |
| `### CheckBox outside of FormField` (under Guidance) | Restructured as a Variant | `### Outside a FormField` variant in new MDX |
| `### Toggle` (under Guidance) | Toggle guidance redistributed | `### Switching a feature on or off with a toggle` use case + `### Toggle` variant |

## Redistributed prose

### Original "Usage" prose — key points preserved

- "CheckBox should not be used if a user should only be allowed to select one option" → captured in `whenToAvoid` in YAML and in the third Dos and Don'ts pair in the new MDX.
- Three states (Unchecked, Checked, Indeterminate) → captured in `## Behaviors and States → Application states`.

### Original "CheckBox outside of FormField" numbered list

The four scenarios listed in the original (UI control, redundant label, opt-in/disclaimer, list selection) were redistributed as follows:
1. "Serving as a UI control showing or hiding page content" → `### Controlling page content visibility` use case
2. "Redundant label scenarios" → preserved in the `### Outside a FormField` variant description
3. "Allowing opt-in or acknowledgement" → `### Opting into an agreement or acknowledgement` use case
4. "Selecting within a list, table row, or drop down" → captured in `### Selecting one or more options from a list` use case

### Original Toggle guidance

- "Toggle is preferred to quickly switch between two possible states" → `### Switching a feature on or off with a toggle` use case + Toggle variant description
- `reverse` prop guidance for toggle groups → preserved in `### Toggle` variant body
- "No form submission required" distinction → captured in `whenToAvoid` bullet 3 and Dos and Don'ts pair 2

## Content not migrated

- The original `### WCAG compliance` header was removed — `<AccessibilitySection />` renders this automatically from structured data. No content was lost.
