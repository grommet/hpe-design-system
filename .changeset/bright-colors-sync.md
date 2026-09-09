---
'hpe-design-tokens': minor
---

Adds a new accent color palette and a new `color.foreground.info` color to the semantic colors, fixes the unselected CheckBox/RadioButton control border contrast, and aligns form-input hover styling.

- Added accent colors (`color.background.accent.{blue,purple,cyan}.{weak,strong}`, `color.border.accent.{blue,purple,cyan}.strong`) for use as functional, sparingly-applied brand accents. Hues carry no fixed semantic meaning. Background accent colors have been contrast-validated when paired with `color.{text,icon}.{default,strong,weak}` light and dark modes.

- Added `color.foreground.info` color for representing an informational status in foreground graphics such as `Meter` and progress bars. Completes the foreground status set (`color.foreground.critical`, `color.foreground.warning`, `color.foreground.ok`, `color.foreground.unknown`, `color.foreground.info`).

- Fixed the `checkbox.default.control.rest.borderColor` and `checkbox.default.control.rest.borderColor` to use `color.border.strong`, meeting the WCAG 2.1/2.2 SC 1.4.11 non-text contrast requirement (3:1).

- Aligned form input hover styling: 
  - FormField borders darken on hover. `formField.default.input.container.hover.borderColor` references `color.border.strong`.
  - RadioButton control background darkens on hover matching CheckBox control. `radioButton.default.control.hover.background` references `color.background.hover`.

- Darkened the dark mode modal scrim (`color.background.screenOverlay`) so the overlay behind modals is clearly perceivable, indicating the underlying page is non-interactive. Light mode is unchanged.

If you were using the `color.decorative` palette for functional UI element backgrounds,  replacement with `color.background.accent` tokens is recommended to meet WCAG contrast requirements.