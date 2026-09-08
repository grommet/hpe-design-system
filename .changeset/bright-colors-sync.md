---
'hpe-design-tokens': minor
---

Adds a new accent color palette and a new `foreground-info` color to the semantic colors, fixes the unselected CheckBox/RadioButton control border contrast, and aligns form-input hover styling.

- Added accent colors (`background-accent-{blue,purple,cyan}-{weak,strong}`, `border-accent-{blue,purple,cyan}-strong`) for use as functional, sparingly-applied brand accents. Available as grommet color keys. Hues carry no fixed semantic meaning and are contrast-validated in light and dark modes.

- Added `foreground-info` color for representing an informational status in foreground graphics such as `Meter` and progress bars. Completes the foreground status set (`foreground-critical`, `foreground-warning`, `foreground-ok`, `foreground-unknown`, `foreground-info`).

- Fixed the unselected CheckBox and RadioButton control border to use `border-strong` at rest, meeting the WCAG 2.1/2.2 SC 1.4.11 non-text contrast requirement (3:1). The previous border measured only 1.99:1 on white.

- Aligned form-input hover styling: RadioButton now uses a `background-hover` fill on hover to match CheckBox, and form-field container inputs (TextInput, Select, SelectMultiple, TextArea, DateInput, FileInput) darken their border to `border-strong` on hover.

- Darkened the dark-mode modal scrim (`screenOverlay`) so the overlay behind modals is clearly perceivable, indicating the underlying page is non-interactive. Light mode is unchanged.

If you were using the `decorative` palette for functional UI elements, consider migrating to the new accent color tokens.