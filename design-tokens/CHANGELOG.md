# hpe-design-tokens

## 1.1.0

### Minor Changes

- 06d0ab2: - Modified status backgrounds to use opaque values in order to avoid muddiness when placed on `color-background-back`.
- 6fb75fd: - Added `icon.onStrong` for use on "strong" and "xstrong" backgrounds.

### Patch Changes

- 6feae82: - Added keyword of "status" to status color token descriptions to aid searchability in Figma.
- e0a9bab: - Added copyright comment to production files.

## 1.0.1

### Patch Changes

- cc52c53: - Fixed swapped descriptions for `color.background.warning` and `color.border.warning`.
- ff72acd: - Fixed `hpe.button.default.medium.fontSize` from `base.dimension.475` (19px, 1.1875rem) to `element.medium.fontSize` (18px, 1.125rem).
  - Fixed `hpe.checkbox.control.selected.hover.borderColor` from `color.border.strong` to `color.transparent`.
  - Fixed `hpe.checkbox.control.indeterminate.rest.borderColor` from `color.border.selected` to `color.transparent`.
  - Fixed `hpe.checkbox.control.indeterminate.hover.borderColor` from `color.border.strong` to `color.transparent`.

## 1.0.0

### Major Changes

- 1c39846: - Updated design token values to reflect new theme.

## 0.9.0

### Minor Changes

- b87e080: - Rename `3xl`, `4xl`, `5xl` text and anchor sizes to `3xlarge`, `4xlarge`, and `5xlarge` for consistency with other t-shirt size naming.
- 6df1814:
  - Fixed background-screenOverlay.
  - Added `color.text.anchor`, `color.text.anchor.hover`.
  - Fixed `anchor.disabled` tokens to be structured as `anchor.disabled.rest`
  - Fixed `dataCell.primary.disabled` tokens to be structured as `dataCell.primary.disabled.rest`
- 66ca9da:
  - Renamed exports from "base" to "primitives" (e.g., "base.css" --> "primitives.css").
  - Removed "default" from CJS/ESM component token exports (e.g., "components.default.cjs" --> "components.js"). No effect on import.
  - Removed light/dark, medium/small modes from ESM/CommonJS exports. Because these now return CSS variable refs, we don't need separate mode exports. (e.g., "color.light.js" --> "color.js").
- cb9764f: - Move `fontWeight` tokens for checkbox, switch, and radiobutton label under each state.
- 38aad17: - Fixed `icon.info` and `background.info` to correct values.
- fc7ba24:
  - Renamed `color.background.primary.default` --> `color.background.primary.strong`
  - Renamed `color.background.selected.strong.enabled` --> `color.background.selected.primary.strong`
  - Renamed `color.background.selected.strong.hover` --> `color.background.selected.primary.strong.hover`
  - Renamed `color.background.selected.weak.enabled` --> `color.background.selected.primary.weak`
  - Renamed `color.background.selected.weak.hover` --> `color.background.selected.primary.weak.hover`
  - Renamed `color.text.onPrimary` --> `color.text.onPrimaryStrong`
  - Renamed `color.text.heading.default` --> `color.text.heading`
  - Renamed `color.text.onSelectedStrong` --> `color.text.onSelectedPrimaryStrong`
  - Renamed `color.text.onSelected` --> `color.text.onSelectedPrimary`
  - Renamed `color.text.onStrong.default` --> `color.text.onStrong`
  - Renamed `color.text.onCritical.default` --> `color.text.onCritical`
  - Renamed `color.text.onWarning.default` --> `color.text.onWarning`
  - Renamed `color.text.onOk.default` --> `color.text.onOk`
  - Renamed `color.text.onInfo.default` --> `color.text.onInfo`
  - Renamed `color.text.onUnknown.default` --> `color.text.onUnknown`
  - Renamed `color.icon.onPrimary` --> `color.icon.onPrimaryStrong`
  - Renamed `color.icon.onSelectedStrong` --> `color.icon.onSelectedPrimaryStrong`
  - Renamed `color.icon.onSelected` --> `color.icon.onSelectedPrimary`
- 6c11700:
  - Removed `color.text.xweak`, `color.icon.xweak`, `color.text.brand`, `color.icon.brand`
  - Renamed `enabled` in component tokens to `rest`
  - Removed `checkbox.control.selected.disabled` (use `checkbox.control.disabled.rest`)
  - Removed `radiobutton.control.selected.disabled` (use `radiobutton.control.disabled.rest`)
  - Removed `dataCell.primary.disabled` (use `dataCell.disabld.rest`)
  - Updated Anchor token structure from `anchor.[size].default` to `anchor.default.[size]` in alignment with button token structure.
  - Updated component state tokens for all but formField tokens to align with new state combinations.
- 083dab9:
  - Added `anchor.default.xsmall` tokens.
  - Added `color.decorative.neutral`, `color.decorative.neutral.hover`
- f9c30cc:
  - Updated `borderWidth` scale values (and removed unused value of xlarge).
  - Added `iconColor` for select.option states.
  - Removed incorrect `dataCell.pinned.rest.backgroundColor` in favor of existing `dataCell.pinned.rest.background`.
- 78fb822: Updated `formField.input.group.container.enabled.background`, `formField.input.group.container.hover.background` to `color.transparent`
- 6700928: - Fixed container token values in "small" mode to remain the same as "default" mode, in alignment with current behavior.
- 2b30ef4:
  - Added new export `hpe-design-tokens/grommet`.
  - Changed ESM/CommonJS exports to resolve to CSS variables rather than raw values.
  - Changed structure of "color" exports to flatten color name after the category (e.g., `hpe.color.background.selected.weak` --> `hpe.color.background['selected-weak']`).
- a334ab2: - Removed "!" namespaced decorative colors (e.g., `hpe.color.decorative.green!`).
- 1affdd5: - Updated t-shirt scales and values for `spacing` and `container` tokens.
- 11926ea:
  - Added `iconColor` tokens to formField label.
  - Fixed `switch.medium.label.lineHeight`
  - Fixed `formField.input.group.container.error.rest.borderColor`
  - Fixed `formField.input.group.container.disabled.rest.background`
  - Fixed `formField.help.disabled.rest.textColor`
  - Fixed `base.color.grey.1000` which is used by light mode for `color.text.strong`
- 38aad17: - Added `drop.boxShadow`.
- e3bf8e6: - Fix `shadow.small` dimension and `shadow.large` dark mode color.
- 38aad17: - Removed component-specific focus tokens in favor of relying on global focusIndicator tokens.
- c376a85:
  - Removed `fontStack.code`
  - Removed `display.medium`
  - Removed `text.6xl`, `anchor.6xl`
- 52674f0:
  - Added `formField.input.group.container.error.rest` tokens
  - Removed `formField.input.group.item.status.critical` tokens
  - Removed formField text "error" tokens for complex states, now only support `error.rest`, `error.hover`, `error.focus`.
  - Renamed formField "enabled" tokens to "rest"
  - Renamed formField "status.critical" tokens to "error.rest"
  - Renamed formField "disabled" tokens to "disabled.rest"
  - Renamed formField "readOnly" tokens to "readOnly.rest"
  - Renamed `base.static` tokens to `static`.
- c3982ea: - Renamed default dimension mode from "medium" to "default".
- dc6b0f3:
  - Renamed `size.icon[t-shirt size]` to `icon[t-shirt size].size` (e.g., `size.icon.xsmall` --> `icon.xsmall.size`)
  - Renamed `size.container[t-shirt size]` to `container[t-shirt size]` (e.g., `size.container.medium` --> `container.medium`)
  - Renamed all default component tokens to include "default" namespace (e.g., `checkbox.control.rest.background` --> `checkbox.default.control.rest.background`)

## 0.8.0

### Minor Changes

- c682b78: Added selected/hover state for buttons.
- c682b78: Added `color.text.primary`.
- c682b78: Added `base.color.green.800`.
- c682b78: Added `base.color.grey.550`.
- c682b78: Renamed `color.text.onSelectedWeak` to `color.text.onSelected`.

## 0.7.0

### Minor Changes

- e601f2a: Renamed `size.content` to `size.container`, `base.static.content` to `base.static.container`
- 1117f91: Updated dark and light mode of `color.background.primary.hover`, updated dark mode of `color.decorative.brand`
- 133aa8f: Removed paragraph tokens, moved `paragraph.[size].maxWidth` tokens `text.[size].maxWidth`

## 0.6.0

### Minor Changes

- 4acbe0e: Fixed CSS output for dimension.medium.css by removing incorrect media query
