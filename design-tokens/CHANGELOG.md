# hpe-design-tokens

## 2.1.0

- Fixed an accessibility issue with the focus indicator in dark mode.

**Color (light)**
- Added `color.focus.support` with value `base.color.white.100`

**Color (dark)**
- Added `color.focus.support` with value `base.color.grey.1000`
- Changed `color.focus` from `base.color.grey.1000` to `base.color.white.100`

**Global**
- Changed `focusIndicator.boxShadow` from `base.color.white.100` to `color.focus.support`

## 2.0.0

### Major Changes

- 1c60852: **Primitives**

  - Updated `base.fontFamily.primary` from `MetricHPEXS` to `HPE Graphik`.
  - Added new color tokens:
    - Added `base.color.purple.100` with value `#b7a2fc`
    - Added `base.color.purple.200` with value `#9b84fc`
    - Added `base.color.purple.400` with value `#7764fc`
    - Added `base.color.purple.700` with value `#5d45d6`
    - Added `base.color.purple.900` with value `#3c3aa1`
    - Added `base.color.fuschia.100` with value `#fc9ddc`
    - Added `base.color.fuschia.200` with value `#db72b8`
    - Added `base.color.fuschia.300` with value `#cc54a4`
    - Added `base.color.fuschia.700` with value `#ad4089`
    - Added `base.color.fuschia.900` with value `#7f245c`
    - Added `base.color.orange.50` with value `#fff3dd`
    - Added `base.color.orange.500` with value `#ec8c25`
    - Added `base.color.orange.1000` with value `#3c361e`
    - Added `base.color.plum.100` with value `#c98ad4`
    - Added `base.color.plum.200` with value `#a455b3`
    - Added `base.color.plum.600` with value `#873492`
    - Added `base.color.plum.700` with value `#6c2b7c`
    - Added `base.color.plum.900` with value `#5e1f68`
    - Added `base.color.coral.100` with value `#fc988b`
    - Added `base.color.coral.200` with value `#e5786a`
    - Added `base.color.coral.300` with value `#d25f4b`
    - Added `base.color.coral.400` with value `#c64f3a`
    - Added `base.color.coral.500` with value `#b4422a`
    - Added `base.color.gold.100` with value `#f9cc61`
    - Added `base.color.gold.200` with value `#ecbe4f`
    - Added `base.color.gold.300` with value `#deb146`
    - Added `base.color.gold.400` with value `#c89e3a`
    - Added `base.color.gold.500` with value `#b38a29`
    - Added `base.color.gold.550` with value `#b0840d`
    - Added `base.color.cyan.100` with value `#99f0f9`
    - Added `base.color.cyan.200` with value `#62e5f6`
    - Added `base.color.cyan.300` with value `#00dbe4`
    - Added `base.color.cyan.400` with value `#00a4b3`
    - Added `base.color.cyan.500` with value `#04909d`
    - Added `base.color.green.450` with value `#66ebcf`
    - Added `base.color.green.550` with value `#05cc93`
    - Added `base.color.grey.200` with value `#e6e8e9`
    - Added `base.color.grey.650` with value `#606a70`
    - Added `base.color.grey.1000` with value `#292d3a`
    - Added `base.color.grey.1300` with value `#1d1f27`
    - Added `base.color.blue.50` with value `#e3f1ff`
    - Added `base.color.blue.200` with value `#65aef9`
    - Added `base.color.blue.300` with value `#3994f7`
    - Added `base.color.blue.500` with value `#0070f8`
    - Added `base.color.blue.700` with value `#0055da`
    - Added `base.color.blue.900` with value `#003cae`
    - Added `base.color.blue.1100` with value `#2b3547`
    - Added `base.color.red.50` with value `#ffecec`
    - Added `base.color.red.400` with value `#ff7b7b`
    - Added `base.color.red.1000` with value `#552120`
  - Updated existing color tokens:
    - Updated `base.color.green.400` from `#17eba0` to `#00e0af`
    - Updated `base.color.green.450` from `#00ebb5` to `#66ebcf`
    - Updated `base.color.green.500` from `#1ed8ae` to `#00e0af`
    - Updated `base.color.green.700` from `#008567` to `#068667`
    - Updated `base.color.green.900` from `#074b3b` to `#074738`
    - Updated `base.color.green.1000` from `#093a2f` to `#093d32`
    - Updated `base.color.grey.400` from `#cccccc` to `#d4d8db`
    - Updated `base.color.grey.500` from `#bbbbbb` to `#b1b9be`
    - Updated `base.color.grey.600` from `#8c8c8c` to `#7d8a92`
    - Updated `base.color.grey.700` from `#757575` to `#535c66`
    - Updated `base.color.grey.800` from `#555555` to `#3e4550`
    - Updated `base.color.grey.1000` from `#2e2e2e` to `#292d3a`
    - Updated `base.color.grey.1200` from `#222222` to `#22252e`
    - Updated `base.color.grey.1300` from `#1c1c1c` to `#1d1f27`
    - Removed `base.color.grey.1100`
  - Deprecated colors:
    - All deprecated colors moved to `deprecated.base.color` namespace.
    - Deprecated `base.color.brand`.
    - Deprecated `base.fontFamily.MetricHPEXS`.

  **Dimension**

  - Updated `icon.xsmall.size` from `base.dimension.350` to `base.dimension.300`.
  - Updated `icon.small.size` from `base.dimension.400` to `base.dimension.350`.
  - Updated `icon.medium.size` from `base.dimension.450` to `base.dimension.400`.
  - Updated `icon.large.size` from `base.dimension.550` to `base.dimension.450`.
  - Updated `icon.xlarge.size` from `base.dimension.600` to `base.dimension.500`.
  - Updated `icon.xxlarge.size` from `base.dimension.900` to `base.dimension.800`.
  - Updated `text.xsmall.fontSize` from `base.fontSize.90` to `base.fontSize.80`.
  - Updated `text.small.fontSize` from `base.fontSize.100` to `base.fontSize.90`.
  - Updated `text.medium.fontSize` from `base.fontSize.200` to `base.fontSize.100`.
  - Updated `text.large.fontSize` from `base.fontSize.400` to `base.fontSize.200`.
  - Updated `text.xlarge.fontSize` from `base.fontSize.500` to `base.fontSize.300`.
  - Updated `text.xxlarge.fontSize` from `base.fontSize.600` to `32`.
  - Updated `text.3xlarge.fontSize` from `base.fontSize.700` to `base.fontSize.600`.
  - Updated `text.4xlarge.fontSize` from `base.fontSize.800` to `base.fontSize.700`.
  - Updated `text.5xlarge.fontSize` from `base.fontSize.900` to `64`.
  - Updated `heading.xlarge.fontWeight` from `fontWeight.regular` to `fontWeight.medium`.
  - Updated `heading.xlarge.fontSize` from `36` to `32`.
  - Updated `heading.large.fontWeight` from `fontWeight.regular` to `fontWeight.medium`.
  - Updated `heading.large.fontSize` from `28` to `base.fontSize.500`.
  - Updated `heading.medium.fontSize` from `24` to `base.fontSize.400`.
  - Updated `heading.medium.fontWeight` from `fontWeight.regular` to `fontWeight.medium`.
  - Updated `heading.small.fontSize` from `20` to `base.fontSize.200`.
  - Updated `heading.small.fontWeight` from `fontWeight.regular` to `fontWeight.medium`.
  - Updated `heading.xsmall.fontSize` from `18` to `base.fontSize.100`.
  - Updated `heading.xxsmall.fontSize` from `16` to `base.fontSize.90`.
  - Updated `heading.xxsmall.fontWeight` from `fontWeight.semibold` to `fontWeight.medium`.
  - Updated `text.xsmall.maxWidth` from `30em` to `38em`.
  - Updated `text.small.maxWidth` from `30em` to `38em`.
  - Updated `text.medium.maxWidth` from `30em` to `38em`.
  - Updated `text.large.maxWidth` from `30em` to `38em`.
  - Updated `text.xlarge.maxWidth` from `30em` to `38em`.
  - Updated `text.xxlarge.maxWidth` from `30em` to `38em`.
  - Updated `text.3xlarge.maxWidth` from `30em` to `38em`.
  - Updated `text.4xlarge.maxWidth` from `30em` to `38em`.
  - Updated `text.5xlarge.maxWidth` from `30em` to `38em`.

  **Color (light)**

  - Added `color.background.neutral.xstrong.hover`.
  - Added `color.decorative.cyan`.
  - Updated `color.background.disabled` from `base.color.black.opacity4` to `#d4d8d8`.
  - Updated `color.background.warning` from `#fff3dd` to `base.color.orange.50`.
  - Updated `color.background.ok` from `#e3fdf4` to `base.color.green.100`.
  - Updated `color.background.info` from `#e0f8ff` to `base.color.blue.50`.
  - Updated `color.background.critical` from `#ffecec` to `base.color.red.50`.
  - Updated `color.border.strong` from `base.color.black.opacity72` to `base.color.grey.800`.
  - Updated `color.border.default` from `base.color.black.opacity36` `base.color.grey.500`.
  - Updated `color.border.weak` from `base.color.black.opacity12` `base.color.grey.400`.
  - Updated `color.border.disabled` from `base.color.black.opacity12` to `base.color.grey.400`.
  - Updated `color.text.weak` from `#676767` `base.color.grey.650`.
  - Updated `color.text.disabled` from `base.color.black.opacity24` to `#a0a2a8`.
  - Updated `color.icon.default` from `base.color.grey.800` to `color.text.default`.
  - Updated `color.icon.strong` from `base.color.grey.1000` to `color.text.strong`.
  - Updated `color.icon.disabled` from `base.color.black.opacity24` to `color.text.disabled`.
  - Updated `color.icon.info` from `base.color.blue.900` to `color.color.blue.700`.
  - Updated `color.icon.unknown` from `base.color.grey.700` to `color.color.grey.650`.
  - Updated `color.decorative.green` from `base.color.green.400` to `color.color.green.550`.
  - Updated `color.decorative.purple` from `base.color.purple.500` to `color.color.purple.300`.
  - Updated `color.decorative.blue` from `base.color.blue.400` to `color.color.blue.500`.
  - Updated `color.decorative.neutral` from `base.color.grey.700` to `color.color.grey.650`.
  - Updated `color.datavis.categorical-10` from `base.color.datavis.purple2` to `base.color.blue.500`.
  - Updated `color.datavis.categorical-20` from `base.color.datavis.gold1` to `base.color.green.650`.
    Updated `color.datavis.categorical-30` from `base.color.datavis.pink1` to `base.color.purple.400`.
  - Updated `color.datavis.categorical-40` from `base.color.datavis.blue1` to `base.color.blue.900`.
  - Updated `color.datavis.categorical-50` from `#a78972` to `base.color.fuschia.300`.
  - Updated `color.datavis.categorical-60` from `base.color.datavis.purple1` to `base.color.cyan.500`.
  - Updated `color.datavis.categorical-70` from `base.color.datavis.darkblue.2` to `base.color.plum.700`.
  - Updated `color.datavis.categorical-80` from `base.color.datavis.grape1` to `base.color.coral.300`.
  - Deprecated `color.decorative.teal`, use `color.decorative.cyan` instead.
  - Deprecated `color.decorative.red`.
  - Deprecated `color.decorative.orange`.
  - Deprecated `color.decorative.yellow`.

  **Color (dark)**

  - Added `color.background.neutral.xstrong.hover`.
  - Added `color.decorative.cyan`.
  - Added `color.background.neutral.xstrong`.
  - Updated `color.background.front` from `base.color.grey.1200` to `base.color.grey.1000`.
  - Updated `color.background.floating` from `base.color.grey.1200` to `base.color.grey.1000`.
  - Updated `color.background.contrast` from `base.color.white.opacity12` to `base.color.white.opacity6`.
  - Updated `color.background.contrast.hover` from `base.color.white.opacity20` to `base.color.white.opacity10`.
  - Updated `color.background.disabled` from `base.color.black.opacity4` to `#d4d8d8`.
  - Updated `color.background.warning` from `#3c361e` to `base.color.orange.1000`.
  - Updated `color.background.ok` from `#1b5245` to `base.color.green.1000`.
  - Updated `color.background.info` from `#1e363d` to `base.color.blue.1100`.
  - Updated `color.background.critical` from `#552120` to `base.color.red.1000`.
  - Updated `color.background.primary.strong` from `#007c60` to `base.color.green.600`.
  - Updated `color.background.primary.strong.hover` from `#00513f` to `base.color.green.550`.
  - Updated `color.background.primary.xstrong` from `base.color.green.1000` to `base.color.green.450`.
  - Updated `color.text.default` from `base.color.white.100` `base.color.grey.50`.
  - Updated `color.text.weak` from `#ffffff9c` `base.color.grey.500`.
  - Updated `color.text.onPrimaryStrong` from `base.color.white.100` to `base.color.grey.1000`.
  - Updated `color.text.primary` from `base.color.green.500` to `base.color.green.550`.
  - Updated `color.text.primary.hover` from `base.color.green.450` to `base.color.green.500`.
  - Updated `color.text.critical` from `color.foreground.critical` to `base.color.red.400`.
  - Updated `color.text.onSelectedPrimaryStrong` from `base.color.white.100` to `color.text.onStrong`.
  - Updated `color.text.onStrong` from `base.color.grey.1200` to `base.color.grey.1000`.
  - Updated `color.icon.default` from `base.color.white.100` to `color.text.default`.
  - Updated `color.icon.strong` from `base.color.white.100` to `color.text.strong`.
  - Updated `color.icon.disabled` from `base.color.black.opacity24` to `color.text.disabled`.
  - Updated `color.icon.info` from `base.color.blue.400` to `base.color.blue.200`.
  - Updated `color.icon.ok` from `base.color.green.500` to `base.color.green.550`.
  - Updated `color.icon.warning` from `base.color.orange.600` to `base.color.orange.500`.
  - Updated `color.icon.primary` from `base.color.green.500` to `base.color.green.550`.
  - Updated `color.icon.onPrimaryStrong` from `base.color.white.100` to `base.color.grey.1000`.
  - Updated `color.icon.onSelectedStrong` from `base.color.white.100` to `color.icon.onStrong`.
  - Updated `color.icon.onStrong` from `base.color.grey.1200` to `base.color.grey.1000`.
  - Updated `color.decorative.green` from `base.color.green.700` to `base.color.green.700`.
  - Updated `color.decorative.purple` from `base.color.purple.900` to `base.color.purple.400`.
  - Updated `color.decorative.blue` from `base.color.blue.700` to `base.color.blue.500`.
  - Updated `color.decorative.neutral` from `base.color.grey.700` to `base.color.grey.650`.
  - Updated `color.datavis.categorical-10` from `#7372CF` to `base.color.blue.200`.
  - Updated `color.datavis.categorical-20` from `base.color.datavis.gold2` to `base.color.grenn.400`.
    Updated `color.datavis.categorical-30` from `base.color.datavis.pink2` to `base.color.purple.200`.
  - Updated `color.datavis.categorical-40` from `base.color.datavis.lightblue1` to `base.color.blue.500`.
  - Updated `color.datavis.categorical-50` from `#A68A74` to `base.color.fuschia.300`.
  - Updated `color.datavis.categorical-60` from `#B889FF` to `base.color.cyan.300`.
  - Updated `color.datavis.categorical-70` from `#4D8DA8` to `base.color.plum.100`.
  - Updated `color.datavis.categorical-80` from `base.color.datavis.purple3` to `base.color.coral.200`.
  - Deprecated `color.decorative.teal`, use `color.decorative.cyan` instead.
  - Deprecated `color.decorative.red`.
  - Deprecated `color.decorative.orange`.
  - Deprecated `color.decorative.yellow`.

  **Components**

  - `button.primary.rest.background` updated from `color.background.primary.strong` to `color.background.neutral.xstrong`.
  - `button.primary.rest.textColor` updated from `color.text.onPrimaryStrong` to `color.text.onStrong`.
  - `button.primary.rest.iconColor` updated from `color.icon.onPrimaryStrong` to `color.icon.onStrong`.
  - `button.primary.rest.fontWeight` updated from `fontWeight.semibold` to `fontWeight.medium`.
    - Referenced by `button.primary.hover.fontWeight`, `button.primary.disabled.rest.fontWeight`, `button.primary.selected.rest.fontWeight`, `button.primary.selected.hover.fontWeight`
  - `button.primary.hover.background` updated from `color.background.primary.strong.hover` to `color.background.neutral.strong`.
  - `button.primary.hover.textColor` updated from `color.text.onPrimaryStrong` to `color.text.onStrong`.
  - `button.primary.hover.iconColor` updated from `color.icon.onPrimaryStrong` to `color.icon.onStrong`.
  - `button.primary.selected.rest.background` updated from `color.background.primary.strong` to `color.background.neutral.xstrong`.
  - `button.primary.selected.rest.textColor` updated from `color.text.onPrimaryStrong` to `color.text.onStrong`.
  - `button.primary.selected.rest.iconColor` updated from `color.icon.onPrimaryStrong` to `color.icon.onStrong`.
  - `button.primary.selected.hover.background` updated from `color.background.primary.strong.hover` to `color.background.neutral.strong`.
  - `button.primary.selected.hover.textColor` updated from `color.text.onPrimaryStrong` to `color.text.onStrong`.
  - `button.primary.selected.hover.iconColor` updated from `color.icon.onPrimaryStrong` to `color.icon.onStrong`.
  - `button.secondary.rest.textColor` updated from `color.text.primary` to `color.text.strong`.
    - Referenced by `button.secondary.hover.textColor`
  - `button.secondary.rest.iconColor` updated from `color.icon.primary` to `color.icon.strong`.
    - Referenced by `button.secondary.hover.iconColor`.

## 1.4.1

### Patch Changes

- aaa738d: - Fixed `dataCell.default.medium.minHeight` to point to `base.dimension.1200` instead of `element.medium.minHeight`.
  - Fixed `headerCell.default.medium.minHeight` to point to `dataCell.default.medium.minHeight` instead of `element.medium.minHeight`.
  - Fixed `footerCell.default.medium.minHeight` to point to `dataCell.default.medium.minHeight` instead of `element.medium.minHeight`.

## 1.4.0

### Minor Changes

- 73eb9d1: - Added `color.icon.primary.hover`.

### Patch Changes

- 73eb9d1: - Fixed value of `checkbox.control.indeterminate.rest.iconColor` from `color.icon.onPrimaryStrong` to `color.icon.onSelectedPrimaryStrong`. No visual change for this theme version, but fixes reference to be more scalable to future theme changes.

## 1.3.0

### Minor Changes

- ead69c5: - Refined `dataVis.categorical` palette to remove use of green and avoid confusion with status-based charts.

### Patch Changes

- 833e765: - Fixed `color.foreground.primary`, `color.border.selected` to meet 4.5:1 contrast ratio on standard background colors.

## 1.2.0

### Minor Changes

- 1ce78aa: - Added ability to scope subsection of page to specific theme mode.
- a376d7a: - Updated `text.[size].maxWidth` from `25em` to `30em` to avoid prematurely wrapping; still adheres to WCAG AAA 80 character per line recommendation.

### Patch Changes

- bce1edc: - Updated `color.text.weak` to meet minimum 4.5:1 contrast ratio on supported standard background colors.

## 1.1.1

### Patch Changes

- 31ce600: - Fix contrast ratios for `hpe.color.icon.unknown` and `hpe.color.icon.info` on status backgrounds.

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
